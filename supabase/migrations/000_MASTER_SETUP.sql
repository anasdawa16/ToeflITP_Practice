-- ================================================================
-- TOEFL MASTER ITP — COMPLETE SETUP (IDEMPOTENT)
-- ================================================================
-- Jalankan file ini SATU KALI di Supabase SQL Editor.
-- Aman dijalankan berulang — semua policy di-drop dulu sebelum dibuat.
-- ================================================================

-- ── EXTENSIONS ───────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- HAPUS SEMUA POLICY LAMA (agar tidak konflik)
-- ================================================================
DO $$
BEGIN
  -- profiles
  DROP POLICY IF EXISTS "profiles_select_own"     ON profiles;
  DROP POLICY IF EXISTS "profiles_insert_own"     ON profiles;
  DROP POLICY IF EXISTS "profiles_update_own"     ON profiles;
  -- test_sessions
  DROP POLICY IF EXISTS "sessions_select_own"     ON test_sessions;
  DROP POLICY IF EXISTS "sessions_insert_own"     ON test_sessions;
  DROP POLICY IF EXISTS "sessions_update_own"     ON test_sessions;
  -- user_answers
  DROP POLICY IF EXISTS "answers_select_own"      ON user_answers;
  DROP POLICY IF EXISTS "answers_insert_own"      ON user_answers;
  -- user_progress
  DROP POLICY IF EXISTS "progress_select_own"     ON user_progress;
  DROP POLICY IF EXISTS "progress_all_own"        ON user_progress;
  -- study_streaks
  DROP POLICY IF EXISTS "streaks_all_own"         ON study_streaks;
  -- bookmarks
  DROP POLICY IF EXISTS "bookmarks_all_own"       ON bookmarks;
  -- ai_conversations
  DROP POLICY IF EXISTS "ai_conv_all_own"         ON ai_conversations;
  -- leaderboard
  DROP POLICY IF EXISTS "leaderboard_select_all"  ON leaderboard_weekly;
  DROP POLICY IF EXISTS "leaderboard_write_own"   ON leaderboard_weekly;
  -- vocabulary / user_vocabulary
  DROP POLICY IF EXISTS "user_vocab_all_own"      ON user_vocabulary;
  DROP POLICY IF EXISTS "vocabulary_public_read"  ON vocabulary;
  DROP POLICY IF EXISTS "Public vocab read"        ON vocabulary;
  -- questions / passages
  DROP POLICY IF EXISTS "questions_public_read"   ON questions;
  DROP POLICY IF EXISTS "passages_public_read"    ON passages;
  -- audio
  DROP POLICY IF EXISTS "audio_public_read"       ON audio_conversations;
  -- achievements
  DROP POLICY IF EXISTS "Users own achievements"  ON achievements;
EXCEPTION WHEN OTHERS THEN NULL; -- ignore if tables don't exist yet
END $$;

-- ================================================================
-- TABEL-TABEL UTAMA
-- ================================================================

CREATE TABLE IF NOT EXISTS passages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT,
  content     TEXT NOT NULL,
  topic       TEXT CHECK (topic IN ('science','history','social_science','arts','business','technology')),
  word_count  INTEGER,
  difficulty  INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audio_conversations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_part     TEXT NOT NULL CHECK (section_part IN ('A','B','C')),
  title            TEXT,
  audio_url        TEXT NOT NULL,
  transcript       TEXT,
  duration_seconds INTEGER,
  is_active        BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS questions (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section                  INTEGER NOT NULL CHECK (section IN (1,2,3)),
  part                     TEXT,
  question_text            TEXT NOT NULL,
  option_a                 TEXT NOT NULL,
  option_b                 TEXT NOT NULL,
  option_c                 TEXT NOT NULL,
  option_d                 TEXT NOT NULL,
  correct_answer           CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation              TEXT NOT NULL,
  difficulty               INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  topic_tags               TEXT[],
  passage_id               UUID REFERENCES passages(id) ON DELETE SET NULL,
  audio_url                TEXT,
  conversation_group_id    UUID REFERENCES audio_conversations(id) ON DELETE SET NULL,
  question_order_in_group  INTEGER,
  is_active                BOOLEAN DEFAULT TRUE,
  created_at               TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
  id            UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username      TEXT UNIQUE,
  full_name     TEXT,
  email         TEXT NOT NULL,
  avatar_url    TEXT,
  target_score  INTEGER DEFAULT 550 CHECK (target_score BETWEEN 310 AND 677),
  test_date     DATE,
  study_streak  INTEGER DEFAULT 0,
  last_active   TIMESTAMPTZ DEFAULT NOW(),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  current_level TEXT DEFAULT 'beginner' CHECK (current_level IN ('beginner','intermediate','advanced')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_sessions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  test_type              TEXT NOT NULL CHECK (test_type IN ('full_mock','section_practice','timed_drill','quick_quiz')),
  status                 TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','abandoned')),
  current_section        INTEGER DEFAULT 1,
  current_question_index INTEGER DEFAULT 0,
  s1_time_remaining      INTEGER DEFAULT 2100,
  s2_time_remaining      INTEGER DEFAULT 1500,
  s3_time_remaining      INTEGER DEFAULT 3300,
  s1_raw_score           INTEGER DEFAULT 0,
  s2_raw_score           INTEGER DEFAULT 0,
  s3_raw_score           INTEGER DEFAULT 0,
  s1_scaled_score        INTEGER,
  s2_scaled_score        INTEGER,
  s3_scaled_score        INTEGER,
  total_scaled_score     INTEGER,
  s1_question_ids        UUID[],
  s2_question_ids        UUID[],
  s3_question_ids        UUID[],
  started_at             TIMESTAMPTZ DEFAULT NOW(),
  completed_at           TIMESTAMPTZ,
  total_duration_seconds INTEGER
);

CREATE TABLE IF NOT EXISTS user_answers (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id         UUID REFERENCES test_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id            UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id        UUID REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  selected_answer    CHAR(1) CHECK (selected_answer IN ('A','B','C','D')),
  is_correct         BOOLEAN,
  time_spent_seconds INTEGER,
  answered_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_progress (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date                     DATE DEFAULT CURRENT_DATE,
  questions_attempted      INTEGER DEFAULT 0,
  questions_correct        INTEGER DEFAULT 0,
  study_minutes            INTEGER DEFAULT 0,
  s1_attempted             INTEGER DEFAULT 0,
  s1_correct               INTEGER DEFAULT 0,
  s2_attempted             INTEGER DEFAULT 0,
  s2_correct               INTEGER DEFAULT 0,
  s3_attempted             INTEGER DEFAULT 0,
  s3_correct               INTEGER DEFAULT 0,
  listening_part_a_score   DECIMAL(5,2),
  listening_part_b_score   DECIMAL(5,2),
  listening_part_c_score   DECIMAL(5,2),
  structure_score          DECIMAL(5,2),
  written_expression_score DECIMAL(5,2),
  reading_vocabulary_score DECIMAL(5,2),
  reading_inference_score  DECIMAL(5,2),
  reading_main_idea_score  DECIMAL(5,2),
  UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS study_streaks (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  current_streak    INTEGER DEFAULT 0,
  longest_streak    INTEGER DEFAULT 0,
  last_study_date   DATE,
  streak_start_date DATE
);

CREATE TABLE IF NOT EXISTS ai_conversations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES questions(id) ON DELETE SET NULL,
  session_id  UUID REFERENCES test_sessions(id) ON DELETE SET NULL,
  messages    JSONB NOT NULL DEFAULT '[]',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  note        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

CREATE TABLE IF NOT EXISTS leaderboard_weekly (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  week_start           DATE NOT NULL,
  total_questions      INTEGER DEFAULT 0,
  accuracy_percent     DECIMAL(5,2) DEFAULT 0,
  mock_tests_completed INTEGER DEFAULT 0,
  best_mock_score      INTEGER DEFAULT 0,
  study_minutes        INTEGER DEFAULT 0,
  xp_points            INTEGER DEFAULT 0,
  UNIQUE(user_id, week_start)
);

CREATE TABLE IF NOT EXISTS vocabulary (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word             TEXT NOT NULL UNIQUE,
  definition       TEXT NOT NULL,
  example_sentence TEXT,
  part_of_speech   TEXT,
  difficulty       INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  category         TEXT CHECK (category IN ('academic','science','social_science','arts','business','general')),
  synonyms         TEXT[],
  collocations     TEXT[]
);

CREATE TABLE IF NOT EXISTS user_vocabulary (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  vocab_id         UUID REFERENCES vocabulary(id) ON DELETE CASCADE NOT NULL,
  status           TEXT DEFAULT 'new' CHECK (status IN ('new','learning','mastered')),
  review_count     INTEGER DEFAULT 0,
  next_review_date DATE,
  UNIQUE(user_id, vocab_id)
);

CREATE TABLE IF NOT EXISTS achievements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) NOT NULL,
  badge_id    TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- ================================================================
-- ENABLE ROW LEVEL SECURITY
-- ================================================================
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_answers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress     ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_streaks     ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks         ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_weekly ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_vocabulary   ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE passages          ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary        ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements      ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- POLICIES
-- ================================================================

-- PROFILES
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- TEST SESSIONS
CREATE POLICY "sessions_select_own" ON test_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sessions_insert_own" ON test_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sessions_update_own" ON test_sessions FOR UPDATE USING (auth.uid() = user_id);

-- USER ANSWERS
CREATE POLICY "answers_select_own" ON user_answers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "answers_insert_own" ON user_answers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- USER PROGRESS
CREATE POLICY "progress_select_own" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "progress_all_own"    ON user_progress FOR ALL   USING (auth.uid() = user_id);

-- STUDY STREAKS
CREATE POLICY "streaks_all_own" ON study_streaks FOR ALL USING (auth.uid() = user_id);

-- BOOKMARKS
CREATE POLICY "bookmarks_all_own" ON bookmarks FOR ALL USING (auth.uid() = user_id);

-- AI CONVERSATIONS
CREATE POLICY "ai_conv_all_own" ON ai_conversations FOR ALL USING (auth.uid() = user_id);

-- LEADERBOARD
CREATE POLICY "leaderboard_select_all" ON leaderboard_weekly FOR SELECT USING (TRUE);
CREATE POLICY "leaderboard_write_own"  ON leaderboard_weekly FOR ALL   USING (auth.uid() = user_id);

-- USER VOCABULARY
CREATE POLICY "user_vocab_all_own"    ON user_vocabulary FOR ALL    USING (auth.uid() = user_id);
CREATE POLICY "vocabulary_public_read" ON vocabulary     FOR SELECT USING (TRUE);

-- QUESTIONS / PASSAGES / AUDIO (public read)
CREATE POLICY "questions_public_read" ON questions          FOR SELECT USING (is_active = TRUE);
CREATE POLICY "passages_public_read"  ON passages           FOR SELECT USING (is_active = TRUE);
CREATE POLICY "audio_public_read"     ON audio_conversations FOR SELECT USING (is_active = TRUE);

-- ACHIEVEMENTS
CREATE POLICY "Users own achievements" ON achievements FOR ALL USING (auth.uid() = user_id);

-- ================================================================
-- FUNCTIONS & TRIGGERS
-- ================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email,
          NEW.raw_user_meta_data->>'full_name',
          NEW.raw_user_meta_data->>'avatar_url');
  INSERT INTO public.study_streaks (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.calculate_scaled_score(
  section_num INTEGER, raw_score INTEGER, total_questions INTEGER
) RETURNS INTEGER LANGUAGE plpgsql AS $$
DECLARE percentage DECIMAL; scaled INTEGER;
BEGIN
  IF total_questions = 0 THEN RETURN 31; END IF;
  percentage := raw_score::DECIMAL / total_questions;
  IF section_num IN (1, 2) THEN scaled := ROUND(31 + (percentage * 37));
  ELSE scaled := ROUND(31 + (percentage * 36)); END IF;
  RETURN GREATEST(31, LEAST(scaled, CASE WHEN section_num IN (1,2) THEN 68 ELSE 67 END));
END;
$$;

CREATE OR REPLACE FUNCTION public.update_study_streak(p_user_id UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_last_date DATE; v_current INTEGER; v_longest INTEGER;
  v_today DATE := CURRENT_DATE;
BEGIN
  SELECT last_study_date, current_streak, longest_streak
    INTO v_last_date, v_current, v_longest
    FROM study_streaks WHERE user_id = p_user_id;
  IF v_last_date IS NULL OR v_last_date < v_today - INTERVAL '1 day' THEN
    v_current := 1;
  ELSIF v_last_date = v_today - INTERVAL '1 day' THEN
    v_current := v_current + 1;
  END IF;
  v_longest := GREATEST(v_longest, v_current);
  UPDATE study_streaks SET
    current_streak = v_current, longest_streak = v_longest,
    last_study_date = v_today,
    streak_start_date = COALESCE(streak_start_date, v_today)
  WHERE user_id = p_user_id;
  UPDATE profiles SET study_streak = v_current WHERE id = p_user_id;
END;
$$;

-- ================================================================
-- INDEXES
-- ================================================================
CREATE INDEX IF NOT EXISTS idx_questions_section    ON questions(section, is_active);
CREATE INDEX IF NOT EXISTS idx_questions_part       ON questions(section, part, is_active);
CREATE INDEX IF NOT EXISTS idx_questions_passage    ON questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_questions_group      ON questions(conversation_group_id);
CREATE INDEX IF NOT EXISTS idx_user_answers_session ON user_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_user_answers_user    ON user_answers(user_id, is_correct);
CREATE INDEX IF NOT EXISTS idx_user_progress_user   ON user_progress(user_id, date);
CREATE INDEX IF NOT EXISTS idx_sessions_user        ON test_sessions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user       ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_week     ON leaderboard_weekly(week_start, xp_points DESC);
CREATE INDEX IF NOT EXISTS achievements_user_id_idx ON achievements(user_id);
CREATE INDEX IF NOT EXISTS user_vocabulary_user_idx ON user_vocabulary(user_id);
CREATE INDEX IF NOT EXISTS user_vocab_due_idx       ON user_vocabulary(user_id, next_review_date);

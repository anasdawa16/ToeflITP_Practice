-- ============================================
-- VOCABULARY TABLES
-- Run this in Supabase SQL Editor
-- ============================================

-- Base vocabulary word list
CREATE TABLE IF NOT EXISTS vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word TEXT NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  example_sentence TEXT,
  part_of_speech TEXT,
  difficulty SMALLINT DEFAULT 3 CHECK (difficulty BETWEEN 1 AND 5),
  category TEXT DEFAULT 'academic',
  synonyms TEXT[] DEFAULT '{}',
  collocations TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User-specific SRS state per word
CREATE TABLE IF NOT EXISTS user_vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  vocab_id UUID REFERENCES vocabulary(id) NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'learning', 'mastered')),
  review_count INTEGER DEFAULT 0,
  next_review_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, vocab_id)
);

-- RLS
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_vocabulary ENABLE ROW LEVEL SECURITY;

-- Everyone can read vocabulary words
DROP POLICY IF EXISTS "Public vocab read" ON vocabulary;
CREATE POLICY "Public vocab read"
  ON vocabulary FOR SELECT USING (true);

-- Users own their SRS state
DROP POLICY IF EXISTS "Users own user_vocabulary" ON user_vocabulary;
CREATE POLICY "Users own user_vocabulary"
  ON user_vocabulary FOR ALL
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS user_vocabulary_user_id_idx ON user_vocabulary(user_id);
CREATE INDEX IF NOT EXISTS user_vocabulary_due_idx ON user_vocabulary(user_id, next_review_date);

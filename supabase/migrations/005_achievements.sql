-- ============================================
-- ACHIEVEMENTS / BADGES
-- Idempotent: safe to run multiple times
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  badge_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Drop existing policy first to avoid "already exists" error
DROP POLICY IF EXISTS "Users own achievements" ON achievements;

CREATE POLICY "Users own achievements"
  ON achievements FOR ALL
  USING (auth.uid() = user_id);

-- Index for fast per-user lookup
CREATE INDEX IF NOT EXISTS achievements_user_id_idx ON achievements(user_id);

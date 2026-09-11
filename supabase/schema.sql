-- ==============================================================================
-- AWS Cloud Practitioner CLF-C02 Mock Exam Web App
-- Sathyabama Institute of Science and Technology, Chennai
-- Database Schema for Supabase / PostgreSQL
-- ==============================================================================

-- 1. Exams Table
CREATE TABLE IF NOT EXISTS exams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  exam_title TEXT NOT NULL,
  institution TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'live', -- 'upcoming', 'live', 'ended'
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  duration_minutes INTEGER NOT NULL DEFAULT 90,
  total_questions INTEGER NOT NULL DEFAULT 65,
  expected_participants INTEGER NOT NULL DEFAULT 100,
  leaderboard_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  results_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  answer_review_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Participants Table
CREATE TABLE IF NOT EXISTS participants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Attempts Table
CREATE TABLE IF NOT EXISTS attempts (
  id TEXT PRIMARY KEY,
  participant_id TEXT REFERENCES participants(id) ON DELETE CASCADE,
  participant_name TEXT NOT NULL,
  exam_id TEXT REFERENCES exams(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'in_progress', -- 'in_progress', 'submitted', 'auto_submitted'
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 65,
  percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  time_used_seconds INTEGER NOT NULL DEFAULT 0,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  domain_scores JSONB,
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Indices for high performance during live concurrent exam
CREATE INDEX IF NOT EXISTS idx_attempts_participant_name ON attempts(LOWER(participant_name));
CREATE INDEX IF NOT EXISTS idx_attempts_status ON attempts(status);
CREATE INDEX IF NOT EXISTS idx_attempts_leaderboard ON attempts(score DESC, time_used_seconds ASC);

-- 5. Disable Row Level Security (RLS) & Grant Permissions
-- This ensures serverless API routes on Vercel can seamlessly read & write
ALTER TABLE IF EXISTS exams DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS participants DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS attempts DISABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE exams TO anon, authenticated, service_role;
GRANT ALL ON TABLE participants TO anon, authenticated, service_role;
GRANT ALL ON TABLE attempts TO anon, authenticated, service_role;

-- 6. Seed Initial Default Exam Record
INSERT INTO exams (
  id,
  name,
  exam_title,
  institution,
  status,
  duration_minutes,
  total_questions,
  expected_participants,
  leaderboard_enabled,
  results_enabled,
  answer_review_enabled
) VALUES (
  'clf-c02-exam',
  'AWS Cloud Practitioner Week Long Workshop',
  'AWS Certified Cloud Practitioner — CLF-C02 Mock Examination',
  'Sathyabama Institute of Science and Technology, Chennai',
  'live',
  90,
  65,
  100,
  false,
  true,
  false
) ON CONFLICT (id) DO NOTHING;


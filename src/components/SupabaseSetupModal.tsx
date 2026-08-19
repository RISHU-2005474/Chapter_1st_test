import React, { useState } from 'react';
import { Database, Copy, Check, X, Terminal, ExternalLink } from 'lucide-react';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SQL_SCHEMA_SCRIPT = `-- ========================================================
-- RISHU SIR TEST SERIES - COMPLETE SUPABASE SQL SETUP
-- Run this script in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ========================================================

-- 1. Examination Attempts Table (All Student Results & Scores)
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_roll TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  roll_number TEXT,
  chapter_id TEXT,
  chapter_title TEXT,
  chapter_code TEXT,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  percentage INT NOT NULL,
  passed BOOLEAN NOT NULL,
  grade TEXT NOT NULL,
  correct_count INT DEFAULT 0,
  incorrect_count INT DEFAULT 0,
  unattempted_count INT DEFAULT 0,
  time_spent_seconds INT DEFAULT 0,
  user_answers JSONB,
  shuffled_questions JSONB,
  stats JSONB,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure columns exist if table was previously created with fewer columns
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='exam_attempts' AND column_name='email') THEN
    ALTER TABLE public.exam_attempts ADD COLUMN email TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='exam_attempts' AND column_name='phone') THEN
    ALTER TABLE public.exam_attempts ADD COLUMN phone TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='exam_attempts' AND column_name='roll_number') THEN
    ALTER TABLE public.exam_attempts ADD COLUMN roll_number TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='exam_attempts' AND column_name='correct_count') THEN
    ALTER TABLE public.exam_attempts ADD COLUMN correct_count INT DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='exam_attempts' AND column_name='incorrect_count') THEN
    ALTER TABLE public.exam_attempts ADD COLUMN incorrect_count INT DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='exam_attempts' AND column_name='unattempted_count') THEN
    ALTER TABLE public.exam_attempts ADD COLUMN unattempted_count INT DEFAULT 0;
  END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to exam_attempts" ON public.exam_attempts;
CREATE POLICY "Allow public access to exam_attempts"
ON public.exam_attempts
FOR ALL
USING (true)
WITH CHECK (true);

-- 2. Student Registrations Table (Real-time Candidate Logging)
CREATE TABLE IF NOT EXISTS public.student_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reg_key TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  roll_number TEXT,
  chapter_id TEXT,
  chapter_title TEXT,
  registered_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.student_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to student_registrations" ON public.student_registrations;
CREATE POLICY "Allow public access to student_registrations"
ON public.student_registrations
FOR ALL
USING (true)
WITH CHECK (true);

-- 3. Owner Chapter Test Controls Table (Live / Lock Status)
CREATE TABLE IF NOT EXISTS public.chapter_controls (
  id INT PRIMARY KEY,
  is_open BOOLEAN DEFAULT true,
  announcement TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert initial chapter records
INSERT INTO public.chapter_controls (id, is_open, announcement)
VALUES
  (1, true, ''),
  (2, true, ''),
  (3, true, ''),
  (4, true, ''),
  (5, true, '')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.chapter_controls ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to chapter_controls" ON public.chapter_controls;
CREATE POLICY "Allow public access to chapter_controls"
ON public.chapter_controls
FOR ALL
USING (true)
WITH CHECK (true);
`;

export const SupabaseSetupModal: React.FC<SupabaseSetupModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Supabase Table Setup Instructions</h3>
              <p className="text-xs text-slate-400">Project ID: <span className="text-indigo-400 font-mono">ejolboeirdtqcsuikayf</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            To enable cloud synchronization in Supabase, create the <code className="px-1.5 py-0.5 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-300 font-mono">exam_attempts</code> table by executing this SQL snippet in your Supabase SQL Editor:
          </p>

          <div className="relative bg-slate-950 border border-white/10 rounded-2xl p-4 overflow-x-auto font-mono text-xs text-emerald-400 leading-relaxed max-h-60">
            <pre>{SQL_SCHEMA_SCRIPT}</pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs">
          <a
            href="https://supabase.com/dashboard/project/ejolboeirdtqcsuikayf/sql/new"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold transition-colors"
          >
            <span>Open Supabase SQL Editor</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl transition-all cursor-pointer"
          >
            Done / Close
          </button>
        </div>
      </div>
    </div>
  );
};

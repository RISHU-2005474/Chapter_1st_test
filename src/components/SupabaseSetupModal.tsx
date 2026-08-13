import React, { useState } from 'react';
import { Database, Copy, Check, X, Terminal, ExternalLink } from 'lucide-react';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SQL_SCHEMA_SCRIPT = `-- Run this SQL script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ejolboeirdtqcsuikayf/sql/new

CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_roll TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  percentage INT NOT NULL,
  passed BOOLEAN NOT NULL,
  grade TEXT NOT NULL,
  time_spent_seconds INT DEFAULT 0,
  user_answers JSONB,
  shuffled_questions JSONB,
  stats JSONB,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;

-- Allow public inserts & reads for examination attempts
CREATE POLICY "Allow public access to exam_attempts"
ON public.exam_attempts
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

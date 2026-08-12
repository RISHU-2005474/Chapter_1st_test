import React from 'react';
import { Clock, Trophy } from 'lucide-react';

interface TimeoutModalProps {
  isOpen: boolean;
  onViewResults: () => void;
}

export const TimeoutModal: React.FC<TimeoutModalProps> = ({ isOpen, onViewResults }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-red-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
        <div className="w-16 h-16 mx-auto bg-red-500/20 border border-red-500/40 rounded-full flex items-center justify-center text-red-400 animate-pulse">
          <Clock className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Time's Up!</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Your 60-minute examination duration has expired. All inputs have been locked and your test has been automatically submitted.
          </p>
        </div>

        <button
          onClick={onViewResults}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/30 text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Trophy className="w-4 h-4" />
          <span>View Detailed Results</span>
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { AlertTriangle, Send, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
  onConfirmSubmit: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  totalQuestions,
  answeredCount,
  unansweredCount,
  markedCount,
  onConfirmSubmit,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Confirm Test Submission</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Are you sure you want to finalize and submit your O Level Chapter 1 examination? Once submitted, you cannot change your answers.
        </p>

        {/* Exam Breakdown Card */}
        <div className="grid grid-cols-3 gap-2.5 bg-white/5 border border-white/10 p-3.5 rounded-2xl text-center text-xs">
          <div className="p-2 bg-indigo-500/10 rounded-xl">
            <div className="text-lg font-extrabold text-indigo-400">{answeredCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Answered</div>
          </div>
          <div className="p-2 bg-amber-500/10 rounded-xl">
            <div className="text-lg font-extrabold text-amber-400">{unansweredCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Unattempted</div>
          </div>
          <div className="p-2 bg-purple-500/10 rounded-xl">
            <div className="text-lg font-extrabold text-purple-400">{markedCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Marked</div>
          </div>
        </div>

        {unansweredCount > 0 && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
            ⚠️ You still have <strong>{unansweredCount} unattempted questions</strong>. You can go back to complete them before submitting.
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-bold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
          >
            Return to Exam
          </button>
          <button
            onClick={onConfirmSubmit}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-900/40 uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Yes, Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

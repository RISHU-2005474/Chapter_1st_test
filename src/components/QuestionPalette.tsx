import React, { useState } from 'react';
import { Bookmark, CheckCircle2, Circle, AlertCircle, Filter, Send } from 'lucide-react';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  userAnswers: (number | null)[];
  markedForReview: boolean[];
  onSelectQuestion: (index: number) => void;
  onOpenSubmitModal: () => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentIndex,
  userAnswers,
  markedForReview,
  onSelectQuestion,
  onOpenSubmitModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered' | 'marked'>('all');

  const answeredCount = userAnswers.filter((a) => a !== null).length;
  const markedCount = markedForReview.filter(Boolean).length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const getQuestionStatus = (idx: number) => {
    const isCurrent = idx === currentIndex;
    const isAnswered = userAnswers[idx] !== null;
    const isMarked = markedForReview[idx];

    if (isCurrent) {
      return 'bg-slate-100 text-indigo-950 font-extrabold ring-2 ring-indigo-500 scale-105 z-10';
    }
    if (isAnswered && isMarked) {
      return 'bg-indigo-600 text-amber-300 border-2 border-amber-400 font-bold';
    }
    if (isMarked) {
      return 'bg-amber-500/20 text-amber-300 border border-amber-400/60 font-bold';
    }
    if (isAnswered) {
      return 'bg-indigo-600 text-white font-semibold shadow-sm';
    }
    return 'border border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200';
  };

  const isVisibleByFilter = (idx: number) => {
    if (filter === 'all') return true;
    if (filter === 'answered') return userAnswers[idx] !== null;
    if (filter === 'unanswered') return userAnswers[idx] === null;
    if (filter === 'marked') return markedForReview[idx];
    return true;
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col h-full shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Question Palette
          </h3>
          <p className="text-[11px] text-slate-400">100 Question Matrix</p>
        </div>
        <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-bold">
          {answeredCount}/{totalQuestions} Done
        </span>
      </div>

      {/* Quick Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-[10px] text-slate-300">
        <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg">
          <div className="w-2.5 h-2.5 bg-indigo-600 rounded-sm shrink-0" />
          <span>Answered ({answeredCount})</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg">
          <div className="w-2.5 h-2.5 border border-white/20 rounded-sm shrink-0" />
          <span>Empty ({unansweredCount})</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg">
          <div className="w-2.5 h-2.5 bg-amber-500/40 border border-amber-400 rounded-sm shrink-0" />
          <span>Marked ({markedCount})</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg">
          <div className="w-2.5 h-2.5 bg-slate-100 ring-1 ring-indigo-500 rounded-sm shrink-0" />
          <span>Current</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 mb-3 bg-black/20 p-1 rounded-xl text-[11px]">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1 rounded-lg transition-all ${
            filter === 'all' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('answered')}
          className={`flex-1 py-1 rounded-lg transition-all ${
            filter === 'answered' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Answered
        </button>
        <button
          onClick={() => setFilter('unanswered')}
          className={`flex-1 py-1 rounded-lg transition-all ${
            filter === 'unanswered' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('marked')}
          className={`flex-1 py-1 rounded-lg transition-all ${
            filter === 'marked' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Review
        </button>
      </div>

      {/* 100 Grid Matrix */}
      <div className="grid grid-cols-10 gap-1.5 flex-1 min-h-[280px] max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          if (!isVisibleByFilter(idx)) return null;
          return (
            <button
              key={idx}
              onClick={() => onSelectQuestion(idx)}
              className={`aspect-square rounded-lg flex items-center justify-center text-[10px] cursor-pointer transition-all ${getQuestionStatus(
                idx
              )}`}
              title={`Jump to Question ${idx + 1}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Bottom Submit Action & Progress bar */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
        <div>
          <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1 font-medium">
            <span>Test Completion</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={onOpenSubmitModal}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-emerald-900/40 uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Submit Final Test</span>
        </button>
      </div>
    </div>
  );
};

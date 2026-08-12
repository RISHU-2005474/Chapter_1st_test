import React from 'react';
import { Question } from '../types';
import { Bookmark, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null; // index 0, 1, 2, 3 or null
  isMarkedForReview: boolean;
  onSelectOption: (optionIndex: number) => void;
  onClearAnswer: () => void;
  onToggleBookmark: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpenSubmitModal: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  isMarkedForReview,
  onSelectOption,
  onClearAnswer,
  onToggleBookmark,
  onPrevious,
  onNext,
  onOpenSubmitModal,
}) => {
  const optionLetters = ['A', 'B', 'C', 'D'];

  const getDifficultyBadge = (diff: Question['difficulty']) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Medium':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Hard':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Main Question Box */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          {/* Top Info Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-xs font-extrabold uppercase tracking-wider">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-md border text-xs font-semibold ${getDifficultyBadge(
                  question.difficulty
                )}`}
              >
                {question.difficulty}
              </span>
            </div>

            <span className="text-xs text-slate-400 font-medium px-2.5 py-1 bg-white/5 border border-white/10 rounded-md">
              {question.category}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-100 leading-snug mb-8">
            {question.question}
          </h2>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 gap-3.5">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              return (
                <div
                  key={idx}
                  onClick={() => onSelectOption(idx)}
                  className={`group flex items-center p-4 rounded-2xl border cursor-pointer transition-all duration-200 select-none ${
                    isSelected
                      ? 'bg-indigo-500/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-500/40'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-bold text-sm shrink-0 mr-4 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-600 text-white shadow-md'
                        : 'border-white/20 text-slate-300 group-hover:border-indigo-400/60 group-hover:text-indigo-300'
                    }`}
                  >
                    {optionLetters[idx]}
                  </div>
                  <span
                    className={`text-sm sm:text-base leading-relaxed ${
                      isSelected ? 'text-white font-medium' : 'text-slate-200'
                    }`}
                  >
                    {option}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 ml-auto shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Clear selection action */}
        {selectedAnswer !== null && (
          <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
            <button
              onClick={onClearAnswer}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Choice</span>
            </button>
          </div>
        )}
      </div>

      {/* Navigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 backdrop-blur-md p-4 border border-white/10 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`px-4 sm:px-5 py-2.5 border rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentIndex === 0
                ? 'opacity-40 border-white/10 text-slate-500 cursor-not-allowed'
                : 'border-white/20 text-slate-200 hover:bg-white/10 hover:border-white/30'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={onToggleBookmark}
            className={`px-3.5 sm:px-5 py-2.5 border rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isMarkedForReview
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                : 'border-amber-500/40 text-amber-400/90 hover:bg-amber-500/10'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isMarkedForReview ? 'fill-amber-300' : ''}`} />
            <span className="hidden sm:inline">
              {isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}
            </span>
          </button>
        </div>

        <div>
          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={onNext}
              className="px-6 sm:px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenSubmitModal}
              className="px-6 sm:px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/40 uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Submit Test</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

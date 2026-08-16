import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Question, StudentInfo, ExamResultStats, Chapter } from '../types';
import logoImg from '../assets/images/rishu_sir_logo_1786638561837.jpg';
import {
  Trophy,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  RotateCcw,
  Printer,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Filter,
  Check,
  X,
  FileText
} from 'lucide-react';

interface ResultDashboardProps {
  student: StudentInfo;
  selectedChapter?: Chapter;
  questions: Question[];
  userAnswers: (number | null)[];
  stats: ExamResultStats;
  onRetake: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  student,
  selectedChapter,
  questions,
  userAnswers,
  stats,
  onRetake,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  // Trigger confetti on pass
  useEffect(() => {
    if (stats.passed) {
      // First burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'],
      });

      // Secondary cannon burst
      const timer = setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [stats.passed]);

  const formatTimeSpent = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  const filteredQuestions = questions.filter((q, idx) => {
    const userAnswer = userAnswers[idx];
    const isCorrect = userAnswer === q.correctAnswer;
    const isUnattempted = userAnswer === null;

    if (activeFilter === 'correct' && !isCorrect) return false;
    if (activeFilter === 'incorrect' && (isCorrect || isUnattempted)) return false;
    if (activeFilter === 'unattempted' && !isUnattempted) return false;

    if (searchQuery.trim()) {
      const qText = q.question.toLowerCase();
      const catText = q.category.toLowerCase();
      const query = searchQuery.toLowerCase();
      return qText.includes(query) || catText.includes(query);
    }

    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Victory / Encouragement Banner */}
      <div
        className={`relative rounded-3xl p-6 sm:p-10 border backdrop-blur-xl shadow-2xl overflow-hidden ${
          stats.passed
            ? 'bg-gradient-to-br from-indigo-900/60 via-slate-900/80 to-emerald-950/60 border-emerald-500/30'
            : 'bg-gradient-to-br from-slate-900/80 via-red-950/30 to-slate-900/80 border-red-500/30'
        }`}
      >
        {/* Glow ambient spots */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4 max-w-2xl">
            {stats.passed ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">
                <img src={logoImg} alt="Logo" className="w-4 h-4 rounded-full object-cover" referrerPolicy="no-referrer" />
                RISHU_SIR_TEST_SERIES — EXAM PASSED
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/20 border border-red-500/40 text-red-300 rounded-full text-xs font-bold uppercase tracking-wider">
                <img src={logoImg} alt="Logo" className="w-4 h-4 rounded-full object-cover" referrerPolicy="no-referrer" />
                RISHU_SIR_TEST_SERIES — ATTEMPT COMPLETED
              </div>
            )}

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {stats.passed
                ? `Congratulations, ${student.name}!`
                : `Keep Trying, ${student.name}!`}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {stats.passed
                ? `You have successfully cleared the Rishu_Sir_Test_Series O Level Module 1 (M1-R5) ${selectedChapter ? selectedChapter.title : 'Chapter Test'} Examination with a score of ${stats.score}/100 (${stats.percentage}%). Great achievement!`
                : `You scored ${stats.score}/100 (${stats.percentage}%). The minimum passing threshold is 50 Marks. Don't be discouraged! Review your detailed answers below and retake the exam.`}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onRetake}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Test</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Scorecard</span>
              </button>
            </div>
          </div>

          {/* 3D Badge / Trophy Card */}
          <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md min-w-[200px]">
            {stats.passed ? (
              <div className="relative mb-3">
                <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/30 transform hover:scale-105 transition-transform">
                  <Trophy className="w-10 h-10 text-slate-950" />
                </div>
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-md shadow-md">
                  GRADE {stats.grade}
                </div>
              </div>
            ) : (
              <div className="relative mb-3">
                <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <Award className="w-10 h-10 text-slate-400" />
                </div>
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white font-black text-xs rounded-md shadow-md">
                  GRADE {stats.grade}
                </div>
              </div>
            )}

            <div className="text-center">
              <div className="text-2xl font-black text-white">{stats.score} / 100</div>
              <div className="text-xs text-slate-400 font-medium">Final Percentage: {stats.percentage}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.score}</div>
            <div className="text-xs text-slate-400 font-medium">Total Score</div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">{stats.correctCount}</div>
            <div className="text-xs text-slate-400 font-medium">Correct Answers</div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">{stats.incorrectCount}</div>
            <div className="text-xs text-slate-400 font-medium">Incorrect Answers</div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-300">{formatTimeSpent(stats.timeSpentSeconds)}</div>
            <div className="text-xs text-slate-400 font-medium">Time Elapsed</div>
          </div>
        </div>
      </div>

      {/* Answer Key & Question Analysis Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Detailed Answer Analysis & Explanations</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Review correct answers, explanations, and your submitted choices for all 100 questions.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search question keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Questions ({questions.length})
          </button>
          <button
            onClick={() => setActiveFilter('correct')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'correct'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            Correct ({stats.correctCount})
          </button>
          <button
            onClick={() => setActiveFilter('incorrect')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'incorrect'
                ? 'bg-red-600 text-white'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            Incorrect ({stats.incorrectCount})
          </button>
          <button
            onClick={() => setActiveFilter('unattempted')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'unattempted'
                ? 'bg-amber-600 text-white'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            Unattempted ({stats.unattemptedCount})
          </button>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No questions found matching your filter criteria.
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const userAnswer = userAnswers[q.id - 1];
              const isCorrect = userAnswer === q.correctAnswer;
              const isUnattempted = userAnswer === null;
              const isExpanded = expandedQuestion === q.id;

              return (
                <div
                  key={q.id}
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    isCorrect
                      ? 'bg-emerald-950/10 border-emerald-500/30'
                      : isUnattempted
                      ? 'bg-slate-900/40 border-white/10'
                      : 'bg-red-950/10 border-red-500/30'
                  }`}
                >
                  {/* Collapsible Header */}
                  <div
                    onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isCorrect ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : isUnattempted ? (
                          <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
                            —
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center">
                            <X className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-300">
                            Q{q.id}.
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-slate-400 rounded">
                            {q.category}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-medium">
                            {q.difficulty}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-100">
                          {q.question}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : isUnattempted
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {isCorrect ? '+1 Mark' : '0 Marks'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Option Breakdown & Explanation */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-white/10 bg-black/20 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, optIdx) => {
                          const isThisCorrect = optIdx === q.correctAnswer;
                          const isThisUserSelection = optIdx === userAnswer;

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-xl border flex items-center justify-between ${
                                isThisCorrect
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold'
                                  : isThisUserSelection
                                  ? 'bg-red-500/20 border-red-500 text-red-200 line-through'
                                  : 'bg-white/5 border-white/10 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{optionLetters[optIdx]}.</span>
                                <span>{opt}</span>
                              </div>
                              {isThisCorrect && (
                                <span className="text-[10px] bg-emerald-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded">
                                  Correct
                                </span>
                              )}
                              {!isThisCorrect && isThisUserSelection && (
                                <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded">
                                  Your Answer
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Educational Explanation Box */}
                      <div className="p-3.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 leading-relaxed">
                        <strong className="text-indigo-300 uppercase tracking-wider text-[10px] block mb-1">
                          Official Solution & Explanation:
                        </strong>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

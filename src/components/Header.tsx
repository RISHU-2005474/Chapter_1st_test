import React from 'react';
import { Clock, ShieldAlert, User, Award, FileText } from 'lucide-react';
import { StudentInfo } from '../types';

interface HeaderProps {
  student: StudentInfo | null;
  timeLeft: number; // in seconds
  totalQuestions: number;
  answeredCount: number;
  onOpenSubmitModal: () => void;
  examStarted: boolean;
  examSubmitted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  timeLeft,
  totalQuestions,
  answeredCount,
  onOpenSubmitModal,
  examStarted,
  examSubmitted,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${formattedMins}:${formattedSecs}`;
  };

  const isWarning = timeLeft <= 300 && timeLeft > 0; // Less than 5 minutes

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-white/10 backdrop-blur-md bg-slate-900/80 px-4 sm:px-8 flex items-center justify-between shadow-lg">
      {/* Left branding */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-extrabold text-xl text-white shadow-md shadow-indigo-500/20">
          O
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              O Level: Module 1 (M1-R5)
            </h1>
            <span className="hidden md:inline-block px-2 py-0.5 text-[10px] bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded font-mono">
              100 Marks
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Chapter 1: Introduction to Computer
          </p>
        </div>
      </div>

      {/* Middle/Right: Student Info & Live Timer */}
      <div className="flex items-center gap-4 sm:gap-8">
        {student && (
          <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-slate-400 tracking-wider font-semibold">
                Student
              </span>
              <span className="text-xs font-semibold text-slate-100 max-w-[140px] truncate">
                {student.name} <span className="text-slate-400">({student.rollNumber})</span>
              </span>
            </div>
          </div>
        )}

        {/* Live Timer display */}
        {examStarted && !examSubmitted && (
          <div
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 ${
              isWarning
                ? 'bg-red-500/20 border-red-500/50 animate-pulse-red text-red-400'
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
            }`}
          >
            {isWarning ? (
              <ShieldAlert className="w-4 h-4 text-red-400 animate-bounce" />
            ) : (
              <Clock className="w-4 h-4 text-indigo-400" />
            )}
            <div className="flex flex-col items-start leading-none">
              <span className="text-[9px] uppercase tracking-wider opacity-75">
                {isWarning ? 'Time Warning!' : 'Time Remaining'}
              </span>
              <span className="font-mono text-lg font-bold tracking-tight">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        )}

        {/* Top Quick Submit Button on Mobile/Tablet */}
        {examStarted && !examSubmitted && (
          <button
            onClick={onOpenSubmitModal}
            className="sm:hidden px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md shadow-emerald-900/40"
          >
            Submit
          </button>
        )}
      </div>
    </header>
  );
};

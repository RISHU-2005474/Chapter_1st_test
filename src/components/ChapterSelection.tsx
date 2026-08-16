import React, { useState } from 'react';
import { Chapter, ChapterControlMap } from '../types';
import { CHAPTERS } from '../data/chapters';
import logoImg from '../assets/images/rishu_sir_logo_1786638561837.jpg';
import {
  Monitor,
  Cpu,
  FileText,
  Table,
  Presentation,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Database,
  Award,
  HelpCircle,
  Lock,
  Megaphone,
} from 'lucide-react';

interface ChapterSelectionProps {
  controls: ChapterControlMap;
  onSelectChapter: (chapter: Chapter) => void;
}

const ICON_MAP = {
  Monitor: Monitor,
  Cpu: Cpu,
  FileText: FileText,
  Table: Table,
  Presentation: Presentation,
};

export const ChapterSelection: React.FC<ChapterSelectionProps> = ({
  controls,
  onSelectChapter,
}) => {
  const [lockedModalChapter, setLockedModalChapter] = useState<{ chapter: Chapter; notice?: string } | null>(null);

  const handleCardClick = (chapter: Chapter) => {
    const status = controls[chapter.id] ?? { id: chapter.id, isOpen: true };
    if (!status.isOpen) {
      setLockedModalChapter({ chapter, notice: status.announcement });
      return;
    }
    onSelectChapter(chapter);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fade-in">
      {/* Top Banner Hero */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-10 overflow-hidden shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>O Level (M1-R5) Standardized Chapter Test Series</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Rishu_Sir_Test_Series
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Select your chapter test to begin. Each test contains <strong className="text-white">100 curated multiple choice questions (100 Marks)</strong> with a <strong className="text-white">60-minute live timer</strong>, single-attempt protection, and instant performance analysis.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Single Attempt per Email</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Supabase Live Storage</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant Verified Certificate</span>
              </div>
            </div>
          </div>

          {/* Logo Branding Emblem */}
          <div className="relative group shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-500">
              <img
                src={logoImg}
                alt="Rishu Sir Test Series"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap">
              Master Series
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Selection Grid Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>Select Chapter Test</span>
              <span className="text-xs px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                5 Chapters Available
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click on any active chapter below to load its 100-question exam portal.
            </p>
          </div>
        </div>

        {/* 5 Chapter Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTERS.map((chapter) => {
            const IconComponent = ICON_MAP[chapter.iconName] || Monitor;
            const status = controls[chapter.id] ?? { id: chapter.id, isOpen: true };
            const isOpen = status.isOpen;

            return (
              <div
                key={chapter.id}
                onClick={() => handleCardClick(chapter)}
                className={`group relative rounded-3xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer overflow-hidden border ${
                  isOpen
                    ? 'bg-slate-900/80 hover:bg-slate-900 border-white/10 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10'
                    : 'bg-slate-950/90 border-rose-500/30 opacity-85 hover:border-rose-500/60'
                }`}
              >
                {/* Accent Background Glow */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${chapter.gradient} opacity-10 group-hover:opacity-20 rounded-bl-full transition-opacity pointer-events-none`}
                />

                <div className="space-y-4 relative z-10">
                  {/* Top Badge & Live Status Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold rounded-full tracking-wide">
                        {chapter.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {chapter.code}
                      </span>
                    </div>

                    {/* Live vs Locked Badge */}
                    {isOpen ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold rounded-full tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE / OPEN</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-extrabold rounded-full tracking-wider uppercase">
                        <Lock className="w-3 h-3 text-rose-400" />
                        <span>LOCKED</span>
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3.5 rounded-2xl bg-gradient-to-br ${
                        isOpen ? chapter.gradient : 'from-slate-700 to-slate-800'
                      } text-white shadow-lg shrink-0 ${isOpen ? 'group-hover:scale-110' : ''} transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {chapter.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Module 1 (M1-R5)
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed min-h-[40px]">
                    {chapter.description}
                  </p>

                  {/* Announcement Banner (if any) */}
                  {status.announcement && (
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-start gap-2">
                      <Megaphone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] font-medium leading-tight">
                        <strong>Notice:</strong> {status.announcement}
                      </span>
                    </div>
                  )}

                  {/* Test Attributes */}
                  <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span><strong>{chapter.totalQuestions}</strong> MCQs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span><strong>{chapter.timeLimitMinutes}</strong> Minutes</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA Footer Button */}
                <div className="pt-6 mt-4 border-t border-white/10 relative z-10">
                  {isOpen ? (
                    <button
                      type="button"
                      className="w-full py-3 px-4 bg-indigo-600 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-amber-500/20 cursor-pointer"
                    >
                      <span>Start {chapter.badge} Test</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-rose-300 font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-rose-500/30 cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-rose-400" />
                      <span>Test Locked</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter Overview Footer */}
      <div className="p-6 bg-slate-900/60 border border-white/10 rounded-2xl text-center space-y-2">
        <p className="text-xs text-slate-300 font-semibold">
          Certified Rishu_Sir_Test_Series • O Level Computer Science (M1-R5) Syllabus
        </p>
        <p className="text-[11px] text-slate-500">
          All 5 chapter tests adhere strictly to the National Institute Computer Course curriculum. Test availability is managed on the cloud backend.
        </p>
      </div>

      {/* Chapter Locked Alert Modal */}
      {lockedModalChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-3xl mx-auto flex items-center justify-center text-rose-400 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">
                Chapter Test Currently Closed
              </h3>
              <p className="text-sm font-bold text-amber-300">
                {lockedModalChapter.chapter.title} ({lockedModalChapter.chapter.code})
              </p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Yeh test abhi backend par <strong>Locked (Band)</strong> hai. Jab Rishu Sir is test ko chalu (Open) karenge, tabhi aap is chapter ka test de sakte hain.
              </p>
            </div>

            {lockedModalChapter.notice && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-2xl text-xs flex items-center gap-2 text-left">
                <Megaphone className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Special Notice:</strong> {lockedModalChapter.notice}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setLockedModalChapter(null)}
                className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                Theek Hai / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Chapter } from '../types';
import { CHAPTERS } from '../data/chapters';
import logoImg from '../assets/images/rishu_sir_logo_1786638561837.jpg';
import {
  Monitor,
  Cpu,
  FileText,
  Table,
  Presentation,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Database,
  Award,
  HelpCircle,
} from 'lucide-react';

interface ChapterSelectionProps {
  onSelectChapter: (chapter: Chapter) => void;
}

const ICON_MAP = {
  Monitor: Monitor,
  Cpu: Cpu,
  FileText: FileText,
  Table: Table,
  Presentation: Presentation,
};

export const ChapterSelection: React.FC<ChapterSelectionProps> = ({ onSelectChapter }) => {
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
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>Select Chapter Test</span>
              <span className="text-xs px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                5 Chapters Available
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click on any chapter below to load its 100-question exam portal.
            </p>
          </div>
        </div>

        {/* 5 Chapter Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTERS.map((chapter) => {
            const IconComponent = ICON_MAP[chapter.iconName] || Monitor;

            return (
              <div
                key={chapter.id}
                onClick={() => onSelectChapter(chapter)}
                className="group relative bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-amber-500/50 rounded-3xl p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Accent Background Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${chapter.gradient} opacity-10 group-hover:opacity-20 rounded-bl-full transition-opacity pointer-events-none`} />

                <div className="space-y-4 relative z-10">
                  {/* Top Badge & Code */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold rounded-full tracking-wide">
                      {chapter.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {chapter.code}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${chapter.gradient} text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
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
                  <button
                    type="button"
                    className="w-full py-3 px-4 bg-indigo-600 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-amber-500/20 cursor-pointer"
                  >
                    <span>Start {chapter.badge} Test</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
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
          All 5 chapter tests adhere strictly to the National Institute Computer Course curriculum.
        </p>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { StudentInfo, Chapter, ChapterControlState } from '../types';
import { getAttempt, getAttemptAsync, StoredAttempt, saveRegistrationRecord } from '../utils/examStorage';
import { Database, BookOpen, Clock, Award, Shield, AlertCircle, ArrowRight, Sparkles, Shuffle, Lock, Eye, Grid, Megaphone, User, Mail, Phone, Hash } from 'lucide-react';
import logoImg from '../assets/images/rishu_sir_logo_1786638561837.jpg';

interface StudentRegisterProps {
  selectedChapter: Chapter;
  chapterControl?: ChapterControlState;
  onStartExam: (info: StudentInfo) => void;
  onViewPastAttempt: (attempt: StoredAttempt) => void;
  onChangeChapter?: () => void;
}

export const StudentRegister: React.FC<StudentRegisterProps> = ({
  selectedChapter,
  chapterControl,
  onStartExam,
  onViewPastAttempt,
  onChangeChapter,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');
  const [existingAttempt, setExistingAttempt] = useState<StoredAttempt | null>(null);

  const isChapterLocked = chapterControl ? !chapterControl.isOpen : false;

  // Check if email has already completed the test for THIS chapter
  useEffect(() => {
    let isMounted = true;
    const identifier = email.trim() || rollNumber.trim();
    if (identifier) {
      const pastLocal = getAttempt(identifier, selectedChapter.id);
      setExistingAttempt(pastLocal);
      if (pastLocal) {
        setError(`This Email / Roll Number (${pastLocal.student.email || pastLocal.student.rollNumber}) has already submitted the test for ${selectedChapter.title}.`);
      } else {
        setError('');
        getAttemptAsync(identifier, selectedChapter.id).then((pastRemote) => {
          if (!isMounted) return;
          if (pastRemote) {
            setExistingAttempt(pastRemote);
            setError(`This Email / Roll Number (${pastRemote.student.email || pastRemote.student.rollNumber}) has already submitted the test for ${selectedChapter.title}.`);
          }
        });
      }
    } else {
      setExistingAttempt(null);
      setError('');
    }
    return () => {
      isMounted = false;
    };
  }, [email, rollNumber, selectedChapter.id, selectedChapter.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter candidate full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter candidate email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address (e.g. student@gmail.com).');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter candidate mobile / WhatsApp number.');
      return;
    }
    if (phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (isChapterLocked) {
      setError(`This Chapter Test (${selectedChapter.title}) is currently closed by the Administrator.`);
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanRoll = rollNumber.trim() || `OL-${cleanEmail.slice(0, 4).toUpperCase()}-${phone.slice(-4)}`;

    // Double check with Supabase before starting
    const past = (await getAttemptAsync(cleanEmail, selectedChapter.id)) || getAttempt(cleanEmail, selectedChapter.id);
    if (past) {
      setExistingAttempt(past);
      setError(`You have already submitted ${selectedChapter.title} with this Email. Re-attempting the same chapter is not allowed!`);
      return;
    }

    const studentInfo: StudentInfo = {
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      rollNumber: cleanRoll,
    };

    // Log registration immediately in Supabase backend
    saveRegistrationRecord(studentInfo, selectedChapter.id, selectedChapter.title);

    setError('');
    onStartExam(studentInfo);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Exam Overview Banner */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900/40 via-slate-900/60 to-purple-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-amber-500/40 shadow-xl shadow-indigo-500/30 shrink-0">
                  <img
                    src={logoImg}
                    alt="Rishu Sir Test Series Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedChapter.badge}</span>
                </div>
              </div>

              {onChangeChapter && (
                <button
                  type="button"
                  onClick={onChangeChapter}
                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                  title="Select a different chapter"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Change</span>
                </button>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
              {selectedChapter.title}
            </h2>
            <p className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
              Rishu_Sir_Test_Series • {selectedChapter.code}
            </p>
            <p className="text-xs text-slate-300 font-medium mb-6 leading-relaxed">
              {selectedChapter.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white leading-none">{selectedChapter.totalQuestions}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Total MCQs</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white leading-none">{selectedChapter.timeLimitMinutes} Mins</div>
                  <div className="text-[11px] text-slate-400 mt-1">Duration</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white leading-none">50 Marks</div>
                  <div className="text-[11px] text-slate-400 mt-1">Pass Mark</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white leading-none">No Neg.</div>
                  <div className="text-[11px] text-slate-400 mt-1">Marking</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>1 Attempt per Candidate (Email & Mobile tracked)</span>
            </div>
            <div className="flex items-center gap-2">
              <Shuffle className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Unique Randomized Question Sequence</span>
            </div>
          </div>
        </div>

        {/* Right Side: Candidate Registration Form */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Candidate Registration
              </h3>
              <p className="text-sm text-slate-400">
                Please enter candidate details to start your examination.
              </p>
            </div>

            {/* Attempt Restriction / Lock Warning Banner */}
            {isChapterLocked ? (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/40 rounded-2xl space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-rose-500/20 rounded-xl text-rose-400 shrink-0 mt-0.5">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-rose-300">
                      Test Currently Locked by Administrator
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Yeh test abhi Administrator dwara band (Locked) kiya gaya hai.
                    </p>
                    {chapterControl?.announcement && (
                      <div className="mt-2 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-amber-400 shrink-0" />
                        <span><strong>Notice:</strong> {chapterControl.announcement}</span>
                      </div>
                    )}
                  </div>
                </div>

                {onChangeChapter && (
                  <button
                    type="button"
                    onClick={onChangeChapter}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Grid className="w-3.5 h-3.5 text-amber-400" />
                    <span>Choose Another Open Chapter</span>
                  </button>
                )}
              </div>
            ) : existingAttempt ? (
              <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 shrink-0 mt-0.5">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-300">
                      Chapter Test Already Submitted!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      This Email (<strong>{existingAttempt.student.email || existingAttempt.student.rollNumber}</strong>) has already completed the examination for <strong>{selectedChapter.title}</strong> under candidate name <strong>{existingAttempt.student.name}</strong> with a score of <strong>{existingAttempt.stats.score}/100 ({existingAttempt.stats.percentage}%)</strong>.
                    </p>
                    <p className="text-[11px] text-amber-400/90 font-medium mt-1">
                      ⚠️ Re-attempting {selectedChapter.title} with the same Email is not allowed. You may still attempt other chapter tests using this Email.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onViewPastAttempt(existingAttempt)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Submitted Result & Certificate</span>
                </button>
              </div>
            ) : error ? (
              <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Candidate Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Full Name <span className="text-red-400">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isChapterLocked}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Candidate Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Email Address <span className="text-red-400">*</span></span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. student@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isChapterLocked}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Grid: Mobile Number + Roll Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Mobile / WhatsApp <span className="text-red-400">*</span></span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    maxLength={15}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d+]/g, ''))}
                    disabled={isChapterLocked}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-slate-400" />
                    <span>Roll / Student ID <span className="text-slate-500 text-[10px] lowercase">(optional)</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. OL-2026-01"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    disabled={isChapterLocked}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                  />
                </div>
              </div>

              <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-3.5 text-xs text-slate-300 space-y-1.5">
                <h4 className="font-semibold text-indigo-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Important Instructions:</span>
                </h4>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px]">
                  <li>Only <strong>1 attempt</strong> is permitted per Candidate Email ID.</li>
                  <li>Countdown timer starts immediately upon clicking <strong>Start Test Now</strong>.</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={!!existingAttempt || isChapterLocked}
                className={`w-full py-3.5 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group text-sm sm:text-base uppercase tracking-wider ${
                  isChapterLocked
                    ? 'bg-slate-800 text-rose-300 cursor-not-allowed border border-rose-500/30'
                    : existingAttempt
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 cursor-pointer'
                }`}
              >
                <span>
                  {isChapterLocked
                    ? 'Test Closed'
                    : existingAttempt
                    ? 'Attempt Locked for this Email'
                    : 'Start Test Now'}
                </span>
                {!existingAttempt && !isChapterLocked && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>
          </div>

          <p className="text-[11px] text-center text-slate-500 mt-4 italic">
            Certified O Level Computer Science Examination • Single Attempt Portal
          </p>
        </div>
      </div>
    </div>
  );
};



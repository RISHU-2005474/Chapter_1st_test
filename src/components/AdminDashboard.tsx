import React, { useState, useEffect } from 'react';
import { StoredAttempt, fetchAllAttemptsFromSupabase, exportAttemptsToCsv, fetchAllRegistrationsFromSupabase, clearAllAttempts } from '../utils/examStorage';
import { Chapter, ChapterControlMap, RegisteredStudent } from '../types';
import { CHAPTERS } from '../data/chapters';
import { updateChapterControl, broadcastChapterControls } from '../utils/chapterControls';
import { SupabaseSetupModal } from './SupabaseSetupModal';
import { testSupabaseConnection, getActiveSupabaseConfig, updateSupabaseCredentials, resetSupabaseCredentials } from '../lib/supabase';
import {
  ShieldCheck,
  Users,
  Award,
  Clock,
  Download,
  Search,
  Filter,
  RefreshCw,
  Database,
  Lock,
  Unlock,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  ExternalLink,
  Code,
  Settings,
  Mail,
  Phone,
  ArrowLeft,
  KeyRound,
  FileSpreadsheet,
  AlertTriangle,
  Megaphone,
} from 'lucide-react';
import logoImg from '../assets/images/rishu_sir_logo_1786638561837.jpg';

interface AdminDashboardProps {
  chapterControls: ChapterControlMap;
  onUpdateChapterControl: (chapterId: number, isOpen: boolean, announcement?: string) => Promise<void>;
  onClose: () => void;
  onViewStudentResult?: (attempt: StoredAttempt) => void;
}

const ADMIN_PINS = ['9842', '1234', 'rishusir', 'admin'];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  chapterControls,
  onUpdateChapterControl,
  onClose,
  onViewStudentResult,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('rishu_sir_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState<'submissions' | 'registrations' | 'chapters' | 'database'>('submissions');
  const [attempts, setAttempts] = useState<StoredAttempt[]>([]);
  const [registrations, setRegistrations] = useState<RegisteredStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<string>('all');
  const [selectedResultFilter, setSelectedResultFilter] = useState<'all' | 'pass' | 'fail'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'date' | 'name'>('score');

  const [dbStatus, setDbStatus] = useState<{ checked: boolean; success: boolean; message: string }>({
    checked: false,
    success: true,
    message: 'Testing connection...',
  });
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);

  // Custom Supabase Config Edit Form
  const [supabaseUrlInput, setSupabaseUrlInput] = useState('');
  const [supabaseKeyInput, setSupabaseKeyInput] = useState('');
  const [configSaveMsg, setConfigSaveMsg] = useState('');

  // Chapter control announcement state
  const [editingAnnouncementChapter, setEditingAnnouncementChapter] = useState<number | null>(null);
  const [announcementText, setAnnouncementText] = useState<string>('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [allAttempts, allRegs] = await Promise.all([
        fetchAllAttemptsFromSupabase(),
        fetchAllRegistrationsFromSupabase(),
      ]);
      setAttempts(allAttempts);
      setRegistrations(allRegs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const checkDatabase = async () => {
    const res = await testSupabaseConnection();
    setDbStatus({ checked: true, success: res.success, message: res.message });
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      checkDatabase();
      const config = getActiveSupabaseConfig();
      setSupabaseUrlInput(config.url);
      setSupabaseKeyInput(config.anonKey);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ADMIN_PINS.includes(pinInput.trim().toLowerCase())) {
      setIsAuthenticated(true);
      sessionStorage.setItem('rishu_sir_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Invalid Security PIN. (Hint: Default PIN is 9842)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('rishu_sir_admin_auth');
  };

  const handleToggleChapter = async (chapterId: number, currentOpen: boolean) => {
    await onUpdateChapterControl(chapterId, !currentOpen);
  };

  const handleSaveAnnouncement = async (chapterId: number) => {
    const current = chapterControls[chapterId];
    await onUpdateChapterControl(chapterId, current ? current.isOpen : true, announcementText);
    setEditingAnnouncementChapter(null);
    setAnnouncementText('');
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrlInput.trim() || !supabaseKeyInput.trim()) {
      setConfigSaveMsg('Please provide both Project URL and Anon Public Key.');
      return;
    }
    const success = updateSupabaseCredentials(supabaseUrlInput.trim(), supabaseKeyInput.trim());
    if (success) {
      setConfigSaveMsg('Supabase credentials saved successfully! Testing connection...');
      checkDatabase();
      loadData();
      setTimeout(() => setConfigSaveMsg(''), 4000);
    } else {
      setConfigSaveMsg('Failed to update credentials.');
    }
  };

  const handleResetSupabaseConfig = () => {
    if (confirm('Reset to default Supabase project credentials?')) {
      resetSupabaseCredentials();
      const config = getActiveSupabaseConfig();
      setSupabaseUrlInput(config.url);
      setSupabaseKeyInput(config.anonKey);
      setConfigSaveMsg('Reset to default credentials.');
      checkDatabase();
      loadData();
    }
  };

  // Filtered and Sorted attempts
  const filteredAttempts = attempts
    .filter((att) => {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = (att.student.name || '').toLowerCase().includes(q);
      const emailMatch = (att.student.email || att.student.rollNumber || '').toLowerCase().includes(q);
      const phoneMatch = (att.student.phone || '').includes(q);
      const searchPass = !q || nameMatch || emailMatch || phoneMatch;

      const chapterPass =
        selectedChapterFilter === 'all' ||
        String(att.chapterId) === selectedChapterFilter ||
        att.chapterCode === selectedChapterFilter;

      const resultPass =
        selectedResultFilter === 'all' ||
        (selectedResultFilter === 'pass' && att.stats.passed) ||
        (selectedResultFilter === 'fail' && !att.stats.passed);

      return searchPass && chapterPass && resultPass;
    })
    .sort((a, b) => {
      if (sortBy === 'score') {
        return b.stats.score - a.stats.score;
      }
      if (sortBy === 'date') {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      }
      if (sortBy === 'name') {
        return (a.student.name || '').localeCompare(b.student.name || '');
      }
      return 0;
    });

  // Calculate summary metrics
  const totalSubmissions = attempts.length;
  const totalPassed = attempts.filter((a) => a.stats.passed).length;
  const passRate = totalSubmissions > 0 ? Math.round((totalPassed / totalSubmissions) * 100) : 0;
  const averageScore =
    totalSubmissions > 0
      ? Math.round(attempts.reduce((acc, curr) => acc + curr.stats.score, 0) / totalSubmissions)
      : 0;
  const highestScore =
    totalSubmissions > 0 ? Math.max(...attempts.map((a) => a.stats.score)) : 0;

  // Format seconds to display
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="mx-auto w-16 h-16 rounded-2xl overflow-hidden border border-amber-500/50 shadow-xl shadow-amber-500/20">
            <img src={logoImg} alt="Rishu Sir Logo" className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner & Admin Security</span>
            </div>
            <h2 className="text-2xl font-black text-white">Rishu Sir Admin Portal</h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter Administrator Security PIN to access live candidate registrations, marks, and Supabase backend.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Administrator PIN <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter PIN (e.g. 9842)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono tracking-widest text-center text-lg"
                  autoFocus
                />
                <KeyRound className="w-5 h-5 text-slate-500 absolute right-3 top-3.5" />
              </div>
              {pinError && <p className="text-xs text-red-400 mt-2">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl transition-all shadow-lg shadow-amber-500/20 uppercase tracking-wider text-sm cursor-pointer"
            >
              Unlock Admin Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <button
              type="button"
              onClick={onClose}
              className="hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Exam Portal</span>
            </button>
            <span className="text-[11px] text-slate-500 font-mono">Default PIN: 9842</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Header Bar */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-amber-500/40 shadow-lg shadow-amber-500/20 shrink-0">
            <img src={logoImg} alt="Rishu Sir Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">Rishu Sir Admin Dashboard</h2>
              <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-full">
                Live Backend
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time Candidate Records, Examination Marks, Supabase Synchronization & Test Controls
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto justify-end">
          <button
            onClick={() => exportAttemptsToCsv(attempts)}
            disabled={attempts.length === 0}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
            title="Download CSV for Excel / Google Sheets"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export to Excel (CSV)</span>
          </button>

          <button
            onClick={loadData}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Lock / Logout
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal</span>
          </button>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
          <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white leading-none">{totalSubmissions}</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Total Attempts</div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400 leading-none">{passRate}%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">{totalPassed} Passed (≥50%)</div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
          <div className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400 leading-none">{highestScore}/100</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Highest Score</div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
          <div className="p-3 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white leading-none">{averageScore}</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Average Marks</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'submissions'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Completed Exam Results ({attempts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('registrations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'registrations'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Candidates ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('chapters')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'chapters'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Chapter Lock & Access Controls</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'database'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Supabase Database Config</span>
        </button>
      </div>

      {/* TAB 1: Completed Exam Submissions */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search candidate name, email, or mobile number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Filter by Chapter */}
            <select
              value={selectedChapterFilter}
              onChange={(e) => setSelectedChapterFilter(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Chapters</option>
              {CHAPTERS.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.code} - {ch.shortTitle}
                </option>
              ))}
            </select>

            {/* Filter by Result */}
            <select
              value={selectedResultFilter}
              onChange={(e) => setSelectedResultFilter(e.target.value as any)}
              className="px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Results</option>
              <option value="pass">Passed Only (≥50%)</option>
              <option value="fail">Failed Only (&lt;50%)</option>
            </select>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="score">Sort: Highest Marks (Rank 1)</option>
              <option value="date">Sort: Recent Submissions</option>
              <option value="name">Sort: Candidate Name</option>
            </select>
          </div>

          {/* Table Container */}
          <div className="bg-slate-900/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 text-center">Rank</th>
                    <th className="py-3.5 px-4">Candidate Details</th>
                    <th className="py-3.5 px-4">Module / Chapter</th>
                    <th className="py-3.5 px-4 text-center">Marks</th>
                    <th className="py-3.5 px-4 text-center">Percentage</th>
                    <th className="py-3.5 px-4 text-center">Grade / Status</th>
                    <th className="py-3.5 px-4">Time Spent</th>
                    <th className="py-3.5 px-4">Submission Date</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200 font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-400">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-400" />
                        <span>Loading student records from Supabase...</span>
                      </td>
                    </tr>
                  ) : filteredAttempts.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-400">
                        No candidate submission records match your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAttempts.map((att, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        {/* Rank */}
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block w-6 h-6 rounded-full text-xs font-bold leading-6 ${
                              idx === 0
                                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-black'
                                : idx === 1
                                ? 'bg-slate-300 text-slate-950'
                                : idx === 2
                                ? 'bg-amber-700 text-white'
                                : 'bg-white/10 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </span>
                        </td>

                        {/* Candidate Details */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm">{att.student.name}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-3 h-3 text-indigo-400 shrink-0" />
                            <span>{att.student.email || att.student.rollNumber}</span>
                          </div>
                          {att.student.phone && (
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>{att.student.phone}</span>
                            </div>
                          )}
                        </td>

                        {/* Chapter */}
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-200">
                            {att.chapterTitle || `Chapter ${att.chapterId}`}
                          </div>
                          <div className="text-[10px] font-mono text-indigo-300 mt-0.5">
                            {att.chapterCode || 'M1-R5'}
                          </div>
                        </td>

                        {/* Marks */}
                        <td className="py-3 px-4 text-center">
                          <div className="text-base font-black text-amber-400">
                            {att.stats.score}
                            <span className="text-xs text-slate-400 font-normal">/{att.stats.totalQuestions}</span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {att.stats.correctCount} Correct • {att.stats.incorrectCount} Wrong
                          </div>
                        </td>

                        {/* Percentage */}
                        <td className="py-3 px-4 text-center">
                          <span className="text-sm font-bold text-white">{att.stats.percentage}%</span>
                        </td>

                        {/* Grade / Status */}
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-extrabold ${
                              att.stats.passed
                                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                                : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                            }`}
                          >
                            {att.stats.passed ? `PASS (Grade ${att.stats.grade})` : 'FAIL (Grade F)'}
                          </span>
                        </td>

                        {/* Time Spent */}
                        <td className="py-3 px-4 text-slate-300 font-mono">
                          {formatDuration(att.stats.timeSpentSeconds)}
                        </td>

                        {/* Submission Date */}
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {new Date(att.submittedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>

                        {/* Action */}
                        <td className="py-3 px-4 text-center">
                          {onViewStudentResult ? (
                            <button
                              onClick={() => onViewStudentResult(att)}
                              className="px-2.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer mx-auto"
                              title="View student result certificate"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Sheet</span>
                            </button>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Registered Candidates */}
      {activeTab === 'registrations' && (
        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-300">
            <div>
              <strong className="text-white">Real-time Candidates Registered:</strong> Students who filled their details on the registration page are listed here immediately.
            </div>
            <button
              onClick={loadData}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="bg-slate-900/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 text-center">#</th>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4">Email Address</th>
                    <th className="py-3.5 px-4">Mobile / WhatsApp</th>
                    <th className="py-3.5 px-4">Roll Number</th>
                    <th className="py-3.5 px-4">Target Chapter</th>
                    <th className="py-3.5 px-4">Registered At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200 font-medium">
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No student registrations found yet.
                      </td>
                    </tr>
                  ) : (
                    registrations.map((reg, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-center text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-white">{reg.name}</td>
                        <td className="py-3 px-4 text-indigo-300 font-mono">{reg.email}</td>
                        <td className="py-3 px-4 text-emerald-400 font-mono">{reg.phone || 'N/A'}</td>
                        <td className="py-3 px-4 font-mono text-slate-300">{reg.rollNumber}</td>
                        <td className="py-3 px-4 text-slate-300">{reg.chapterTitle || `Chapter ${reg.chapterId}`}</td>
                        <td className="py-3 px-4 text-slate-400">
                          {reg.registeredAt
                            ? new Date(reg.registeredAt).toLocaleString('en-IN')
                            : 'Just Now'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Chapter Lock & Access Controls */}
      {activeTab === 'chapters' && (
        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-400">Owner Access Controls:</strong> Rishu Sir can Lock (Close) or Unlock (Open) any chapter test for all candidates. When locked, candidates cannot start the test and will see your custom announcement notice.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHAPTERS.map((chapter) => {
              const control = chapterControls[chapter.id] || { id: chapter.id, isOpen: true };
              const isOpen = control.isOpen;
              const isEditing = editingAnnouncementChapter === chapter.id;

              return (
                <div
                  key={chapter.id}
                  className={`border rounded-2xl p-5 backdrop-blur-xl transition-all shadow-xl ${
                    isOpen
                      ? 'bg-slate-900/80 border-emerald-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                        {chapter.code}
                      </span>
                      <h4 className="text-base font-bold text-white">{chapter.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{chapter.description}</p>
                    </div>

                    <button
                      onClick={() => handleToggleChapter(chapter.id, isOpen)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isOpen
                          ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300'
                          : 'bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300'
                      }`}
                    >
                      {isOpen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      <span>{isOpen ? 'OPEN (Live)' : 'LOCKED (Closed)'}</span>
                    </button>
                  </div>

                  {/* Announcement Display / Edit */}
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="e.g. Test will open today at 6:00 PM..."
                          value={announcementText}
                          onChange={(e) => setAnnouncementText(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveAnnouncement(chapter.id)}
                            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
                          >
                            Save Notice
                          </button>
                          <button
                            onClick={() => setEditingAnnouncementChapter(null)}
                            className="px-3 py-1 bg-white/10 text-slate-300 rounded-lg text-xs cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-slate-400 text-[11px] truncate flex items-center gap-1.5">
                          <Megaphone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>
                            {control.announcement
                              ? `Notice: ${control.announcement}`
                              : 'No custom lock notice set'}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setEditingAnnouncementChapter(chapter.id);
                            setAnnouncementText(control.announcement || '');
                          }}
                          className="text-amber-400 hover:text-amber-300 text-[11px] font-bold cursor-pointer underline"
                        >
                          Edit Notice
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Supabase Database Config */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          {/* Connection Status Card */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Supabase Cloud Database Status</h3>
                  <p className="text-xs text-slate-400">{dbStatus.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={checkDatabase}
                  className="px-3.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Test Connection</span>
                </button>

                <button
                  onClick={() => setIsSqlModalOpen(true)}
                  className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>View SQL Script</span>
                </button>
              </div>
            </div>

            {/* Custom Supabase Credentials Form */}
            <form onSubmit={handleSaveSupabaseConfig} className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Supabase Credentials Settings:
              </h4>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Project URL:</label>
                <input
                  type="text"
                  value={supabaseUrlInput}
                  onChange={(e) => setSupabaseUrlInput(e.target.value)}
                  placeholder="https://xxxx.supabase.co"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Anon / Public API Key:</label>
                <input
                  type="text"
                  value={supabaseKeyInput}
                  onChange={(e) => setSupabaseKeyInput(e.target.value)}
                  placeholder="sb_publishable_..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {configSaveMsg && (
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-300 text-xs">
                  {configSaveMsg}
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer transition-all"
                >
                  Save Supabase Settings
                </button>
                <button
                  type="button"
                  onClick={handleResetSupabaseConfig}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-all"
                >
                  Reset to Default
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SQL Setup Modal */}
      <SupabaseSetupModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />
    </div>
  );
};

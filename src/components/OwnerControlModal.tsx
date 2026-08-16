import React, { useState, useEffect } from 'react';
import { ChapterControlMap } from '../types';
import { CHAPTERS } from '../data/chapters';
import {
  isOwnerLoggedIn,
  setOwnerLoggedIn,
  verifyOwnerPasscode,
  getOwnerPasscode,
  setOwnerPasscode,
  updateChapterStatus,
  updateAllChaptersStatus,
  fetchChapterControls,
  DEFAULT_OWNER_PASSCODE,
} from '../utils/chapterControls';
import {
  Shield,
  Lock,
  Unlock,
  KeyRound,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Database,
  RefreshCw,
  LogOut,
  Save,
  MessageSquare,
  Eye,
  EyeOff,
} from 'lucide-react';
import logoImg from '../assets/images/rishu_sir_logo_1786638561837.jpg';

interface OwnerControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  controls: ChapterControlMap;
  onControlsUpdated: (newControls: ChapterControlMap) => void;
  onOpenSqlSetup?: () => void;
}

export const OwnerControlModal: React.FC<OwnerControlModalProps> = ({
  isOpen,
  onClose,
  controls,
  onControlsUpdated,
  onOpenSqlSetup,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // Custom notices per chapter state
  const [announcements, setAnnouncements] = useState<Record<number, string>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [successToast, setSuccessToast] = useState<string>('');

  // Password change state
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [newPasscode, setNewPasscode] = useState<string>('');
  const [confirmPasscode, setConfirmPasscode] = useState<string>('');
  const [passcodeMsg, setPasscodeMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const logged = isOwnerLoggedIn();
      setIsAuthenticated(logged);
      setPasscode('');
      setLoginError('');
      setSuccessToast('');

      // Populate local notices
      const notes: Record<number, string> = {};
      CHAPTERS.forEach((ch) => {
        notes[ch.id] = controls[ch.id]?.announcement || '';
      });
      setAnnouncements(notes);
    }
  }, [isOpen, controls]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setLoginError('Please enter your owner passcode.');
      return;
    }

    if (verifyOwnerPasscode(passcode)) {
      setIsAuthenticated(true);
      setOwnerLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid passcode! Please enter the correct Rishu Sir master passcode.');
    }
  };

  const handleLogout = () => {
    setOwnerLoggedIn(false);
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleToggleChapter = async (chapterId: number, currentOpen: boolean) => {
    setSavingId(chapterId);
    try {
      const updated = await updateChapterStatus(chapterId, !currentOpen, announcements[chapterId]);
      onControlsUpdated(updated);
      showToast(`Chapter ${chapterId} test is now ${!currentOpen ? 'OPEN (Chalu)' : 'LOCKED (Band)'}!`);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveAnnouncement = async (chapterId: number) => {
    setSavingId(chapterId);
    try {
      const currentOpen = controls[chapterId]?.isOpen ?? true;
      const updated = await updateChapterStatus(chapterId, currentOpen, announcements[chapterId]);
      onControlsUpdated(updated);
      showToast(`Notice for Chapter ${chapterId} saved!`);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingId(null);
    }
  };

  const handleBulkToggle = async (openAll: boolean) => {
    setIsSyncing(true);
    try {
      const updated = await updateAllChaptersStatus(openAll);
      onControlsUpdated(updated);
      showToast(openAll ? 'All 5 Chapter Tests are now OPEN!' : 'All 5 Chapter Tests are now LOCKED!');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleRefresh = async () => {
    setIsSyncing(true);
    try {
      const remote = await fetchChapterControls();
      onControlsUpdated(remote);
      showToast('Synced latest chapter statuses from database!');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) {
      setPasscodeMsg({ type: 'error', text: 'New passcode cannot be empty.' });
      return;
    }
    if (newPasscode.length < 4) {
      setPasscodeMsg({ type: 'error', text: 'Passcode should be at least 4 characters long.' });
      return;
    }
    if (newPasscode !== confirmPasscode) {
      setPasscodeMsg({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    setOwnerPasscode(newPasscode);
    setPasscodeMsg({ type: 'success', text: 'Master Passcode updated successfully!' });
    setNewPasscode('');
    setConfirmPasscode('');
    setTimeout(() => {
      setShowChangePassword(false);
      setPasscodeMsg(null);
    }, 2000);
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast('');
    }, 3500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-4xl bg-slate-900 border border-amber-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden text-slate-100 my-auto">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-amber-500/50 shadow-md shrink-0">
              <img
                src={logoImg}
                alt="Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>Owner Test Control Panel</span>
                </h2>
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                  Admin (Rishu Sir)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Control which chapter tests are LIVE or LOCKED for students in real-time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer shrink-0"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Toast */}
        {successToast && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in shadow-lg">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successToast}</span>
          </div>
        )}

        {/* VIEW 1: Owner Passcode Login Screen */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-8 space-y-6 text-center relative z-10">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-3xl mx-auto flex items-center justify-center text-amber-400 shadow-xl">
              <Shield className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">
                Owner Authentication Required
              </h3>
              <p className="text-xs text-slate-300">
                Only the test administrator (Rishu Sir) can lock or open chapter tests. Please enter your Master Passcode to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Master Passcode</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setLoginError('');
                    }}
                    placeholder="Enter Owner Passcode (e.g. rishu123)"
                    className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 focus:border-amber-400 rounded-2xl text-sm text-white placeholder-slate-500 outline-none transition-all pr-10"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Default Passcode: <strong className="text-amber-400 font-mono">rishu123</strong></span>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Unlock Owner Controls</span>
              </button>
            </form>
          </div>
        ) : (
          /* VIEW 2: Authenticated Owner Dashboard */
          <div className="space-y-6 relative z-10">
            {/* Top Toolbar Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950/60 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">Owner Mode Active:</span>
                <span className="text-slate-300">Changes apply immediately to all users.</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleBulkToggle(true)}
                  disabled={isSyncing}
                  className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Unlock all 5 chapter tests for students"
                >
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open All Tests</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleBulkToggle(false)}
                  disabled={isSyncing}
                  className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Lock all 5 chapter tests"
                >
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span>Lock All Tests</span>
                </button>

                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isSyncing}
                  className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
                  title="Refresh status from database"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-rose-300 rounded-xl font-semibold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </div>
            </div>

            {/* Individual Chapter Toggle Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Chapter Test Status & Controls</span>
                </h3>
                <span className="text-xs text-slate-400">
                  Toggle switch to Open (Chalu) or Lock (Band) each chapter test
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CHAPTERS.map((chapter) => {
                  const state = controls[chapter.id] || { id: chapter.id, isOpen: true };
                  const isOpen = state.isOpen;
                  const isSaving = savingId === chapter.id;

                  return (
                    <div
                      key={chapter.id}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-3 ${
                        isOpen
                          ? 'bg-slate-950/70 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                          : 'bg-slate-950/90 border-rose-500/40 shadow-lg shadow-rose-500/5 opacity-90'
                      }`}
                    >
                      {/* Top Row: Chapter Info & Switch Toggle */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-white/10 border border-white/10 text-[10px] font-extrabold rounded-md text-amber-300 font-mono">
                              {chapter.badge}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              {chapter.code}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1">
                            {chapter.title}
                          </h4>
                        </div>

                        {/* Interactive Open/Lock Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => handleToggleChapter(chapter.id, isOpen)}
                          disabled={isSaving}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                            isOpen
                              ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                              : 'bg-rose-600 text-white hover:bg-rose-500 shadow-md shadow-rose-600/20'
                          }`}
                        >
                          {isOpen ? (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              <span>OPEN (Live)</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>LOCKED</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Status explanation */}
                      <div className="text-[11px] flex items-center justify-between border-t border-white/5 pt-2">
                        <span className={isOpen ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                          {isOpen
                            ? '🟢 Test is Active: Students can register & take exam.'
                            : '🔒 Test is Closed: Students see "Locked by Owner" message.'}
                        </span>
                      </div>

                      {/* Optional Announcement / Notice for this Chapter */}
                      <div className="space-y-1.5 pt-1 border-t border-white/5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-indigo-400" />
                          <span>Custom Notice for Students (Optional)</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={announcements[chapter.id] || ''}
                            onChange={(e) =>
                              setAnnouncements({
                                ...announcements,
                                [chapter.id]: e.target.value,
                              })
                            }
                            placeholder="e.g. Test will open Sunday 10:00 AM"
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-white/10 focus:border-indigo-400 rounded-xl text-xs text-slate-200 placeholder-slate-600 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveAnnouncement(chapter.id)}
                            disabled={isSaving}
                            className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer"
                            title="Save custom notice"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Admin Tools & Password Change Accordion */}
            <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Change Master Passcode</span>
                </button>

                {onOpenSqlSetup && (
                  <button
                    type="button"
                    onClick={onOpenSqlSetup}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-300 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Supabase SQL Script</span>
                  </button>
                )}
              </div>

              <div className="text-[11px] text-slate-400">
                Logged in as: <strong className="text-amber-400">Owner (Rishu Sir)</strong>
              </div>
            </div>

            {/* Change Passcode Sub-form */}
            {showChangePassword && (
              <form onSubmit={handleChangePasscode} className="p-4 bg-slate-950 border border-amber-500/30 rounded-2xl space-y-3 animate-fade-in">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Update Owner Security Passcode</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="password"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Enter new master passcode"
                    className="px-3 py-2 bg-slate-900 border border-white/10 focus:border-amber-400 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
                  />
                  <input
                    type="password"
                    value={confirmPasscode}
                    onChange={(e) => setConfirmPasscode(e.target.value)}
                    placeholder="Confirm new master passcode"
                    className="px-3 py-2 bg-slate-900 border border-white/10 focus:border-amber-400 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
                  />
                </div>

                {passcodeMsg && (
                  <div
                    className={`p-2 rounded-xl text-xs flex items-center gap-2 ${
                      passcodeMsg.type === 'error'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    <span>{passcodeMsg.text}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Save New Passcode
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowChangePassword(false);
                      setPasscodeMsg(null);
                    }}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

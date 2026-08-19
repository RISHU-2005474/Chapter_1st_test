import { StudentInfo, ExamResultStats, Question, RegisteredStudent } from '../types';
import { supabase } from '../lib/supabase';

export interface StoredAttempt {
  student: StudentInfo;
  chapterId?: string | number;
  chapterTitle?: string;
  chapterCode?: string;
  userAnswers: (number | null)[];
  shuffledQuestions: Question[];
  stats: ExamResultStats;
  submittedAt: string;
}

const STORAGE_KEY = 'olevel_m1_exam_attempts_v2';
const REGISTRATIONS_STORAGE_KEY = 'olevel_m1_registrations_v2';

function getStorageMap(): Record<string, StoredAttempt> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load exam attempts from localStorage', e);
    return {};
  }
}

function getRegistrationsMap(): Record<string, RegisteredStudent> {
  try {
    const raw = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

export function makeAttemptKey(emailOrRoll: string, chapterId?: string | number): string {
  const cleanEmail = emailOrRoll.trim().toLowerCase();
  if (!chapterId) return cleanEmail;
  return `${cleanEmail}::${chapterId}`;
}

export function getAttempt(emailOrRoll: string, chapterId?: string | number): StoredAttempt | null {
  if (!emailOrRoll) return null;
  const cleanEmail = emailOrRoll.trim().toLowerCase();
  const map = getStorageMap();

  if (chapterId) {
    const chapterKey = makeAttemptKey(cleanEmail, chapterId);
    if (map[chapterKey]) return map[chapterKey];
    if (map[cleanEmail] && (!map[cleanEmail].chapterId || String(map[cleanEmail].chapterId) === String(chapterId))) {
      return map[cleanEmail];
    }
    return null;
  }

  return map[cleanEmail] || null;
}

export async function getAttemptAsync(emailOrRoll: string, chapterId?: string | number): Promise<StoredAttempt | null> {
  if (!emailOrRoll) return null;
  const cleanEmail = emailOrRoll.trim().toLowerCase();
  const dbKey = makeAttemptKey(cleanEmail, chapterId);

  // 1. Check local cache first
  const local = getAttempt(cleanEmail, chapterId);
  if (local) return local;

  // 2. Fetch from Supabase as fallback
  try {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select('*')
      .eq('email_roll', dbKey)
      .maybeSingle();

    if (!error && data) {
      const attempt: StoredAttempt = {
        student: {
          name: data.student_name,
          rollNumber: data.roll_number || cleanEmail,
          email: data.email || cleanEmail,
          phone: data.phone || '',
        },
        chapterId: data.chapter_id || chapterId,
        chapterTitle: data.chapter_title,
        chapterCode: data.chapter_code,
        userAnswers: data.user_answers || [],
        shuffledQuestions: data.shuffled_questions || [],
        stats: data.stats || {
          score: data.score,
          totalQuestions: data.total_questions,
          percentage: data.percentage,
          passed: data.passed,
          correctCount: data.score,
          incorrectCount: data.total_questions - data.score,
          unattemptedCount: 0,
          timeSpentSeconds: data.time_spent_seconds || 0,
          grade: data.grade || 'F',
        },
        submittedAt: data.submitted_at || new Date().toISOString(),
      };

      // Save into local storage for quick access
      const map = getStorageMap();
      map[dbKey] = attempt;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));

      return attempt;
    }
  } catch (err) {
    // Silent catch
  }

  return null;
}

// Record student registration in Supabase table `student_registrations` immediately
export async function saveRegistrationRecord(student: StudentInfo, chapterId: number | string, chapterTitle: string): Promise<void> {
  const regId = `${(student.email || student.rollNumber).trim().toLowerCase()}::${chapterId}`;
  const record: RegisteredStudent = {
    name: student.name,
    email: student.email || student.rollNumber,
    phone: student.phone || '',
    rollNumber: student.rollNumber,
    chapterId,
    chapterTitle,
    registeredAt: new Date().toISOString(),
  };

  // Local storage cache
  try {
    const regMap = getRegistrationsMap();
    regMap[regId] = record;
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(regMap));
  } catch (e) {
    // ignore
  }

  // Supabase sync
  try {
    await supabase.from('student_registrations').upsert(
      {
        reg_key: regId,
        student_name: student.name,
        email: student.email || student.rollNumber,
        phone: student.phone || '',
        roll_number: student.rollNumber,
        chapter_id: String(chapterId),
        chapter_title: chapterTitle,
        registered_at: record.registeredAt,
      },
      { onConflict: 'reg_key' }
    );
  } catch (err) {
    // ignore
  }
}

export async function saveAttempt(attempt: StoredAttempt, chapterId?: string | number): Promise<void> {
  const activeChapterId = attempt.chapterId || chapterId || 'ch1_intro';
  const cleanEmail = (attempt.student.email || attempt.student.rollNumber).trim().toLowerCase();
  const dbKey = makeAttemptKey(cleanEmail, activeChapterId);

  const enrichedAttempt: StoredAttempt = {
    ...attempt,
    chapterId: activeChapterId,
  };

  // 1. Save locally
  try {
    const map = getStorageMap();
    map[dbKey] = enrichedAttempt;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Failed to save attempt to localStorage', e);
  }

  // 2. Save to Supabase DB table `exam_attempts`
  try {
    const payload = {
      email_roll: dbKey,
      student_name: attempt.student.name,
      email: attempt.student.email || cleanEmail,
      phone: attempt.student.phone || '',
      roll_number: attempt.student.rollNumber,
      chapter_id: String(activeChapterId),
      chapter_title: attempt.chapterTitle || '',
      chapter_code: attempt.chapterCode || '',
      score: attempt.stats.score,
      total_questions: attempt.stats.totalQuestions,
      percentage: attempt.stats.percentage,
      passed: attempt.stats.passed,
      grade: attempt.stats.grade,
      correct_count: attempt.stats.correctCount,
      incorrect_count: attempt.stats.incorrectCount,
      unattempted_count: attempt.stats.unattemptedCount,
      time_spent_seconds: attempt.stats.timeSpentSeconds,
      user_answers: attempt.userAnswers,
      shuffled_questions: attempt.shuffledQuestions,
      stats: attempt.stats,
      submitted_at: attempt.submittedAt,
    };

    const { error } = await supabase
      .from('exam_attempts')
      .upsert(payload, { onConflict: 'email_roll' });

    if (error) {
      console.warn('Supabase save note:', error.message);
    } else {
      console.log('Successfully saved attempt to Supabase backend database!');
    }
  } catch (err) {
    console.info('Supabase connection note:', err);
  }
}

export function getAllAttempts(): StoredAttempt[] {
  const map = getStorageMap();
  return Object.values(map);
}

export async function fetchAllAttemptsFromSupabase(): Promise<StoredAttempt[]> {
  try {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        student: {
          name: d.student_name,
          rollNumber: d.roll_number || d.email_roll,
          email: d.email || d.email_roll,
          phone: d.phone || '',
        },
        chapterId: d.chapter_id,
        chapterTitle: d.chapter_title,
        chapterCode: d.chapter_code,
        userAnswers: d.user_answers || [],
        shuffledQuestions: d.shuffled_questions || [],
        stats: d.stats || {
          score: d.score,
          totalQuestions: d.total_questions,
          percentage: d.percentage,
          passed: d.passed,
          correctCount: d.correct_count ?? d.score,
          incorrectCount: d.incorrect_count ?? (d.total_questions - d.score),
          unattemptedCount: d.unattempted_count ?? 0,
          timeSpentSeconds: d.time_spent_seconds || 0,
          grade: d.grade || 'F',
        },
        submittedAt: d.submitted_at || new Date().toISOString(),
      }));
    }
  } catch (err) {
    console.warn('Failed to fetch attempts from Supabase:', err);
  }
  return getAllAttempts();
}

export async function fetchAllRegistrationsFromSupabase(): Promise<RegisteredStudent[]> {
  try {
    const { data, error } = await supabase
      .from('student_registrations')
      .select('*')
      .order('registered_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        name: d.student_name,
        email: d.email,
        phone: d.phone,
        rollNumber: d.roll_number,
        chapterId: d.chapter_id,
        chapterTitle: d.chapter_title,
        registeredAt: d.registered_at,
      }));
    }
  } catch (err) {
    // fallback to local
  }
  const map = getRegistrationsMap();
  return Object.values(map);
}

export function exportAttemptsToCsv(attempts: StoredAttempt[]): void {
  if (!attempts || attempts.length === 0) {
    alert('No candidate records available to export.');
    return;
  }

  const headers = [
    'S.No',
    'Candidate Name',
    'Email Address',
    'Mobile / Phone',
    'Roll Number',
    'Chapter Code',
    'Chapter Title',
    'Score',
    'Total Questions',
    'Percentage (%)',
    'Result Status',
    'Grade',
    'Correct Answers',
    'Incorrect Answers',
    'Unattempted',
    'Time Spent (Seconds)',
    'Submission Date & Time',
  ];

  const rows = attempts.map((att, idx) => [
    idx + 1,
    `"${(att.student.name || '').replace(/"/g, '""')}"`,
    `"${(att.student.email || att.student.rollNumber || '').replace(/"/g, '""')}"`,
    `"${(att.student.phone || 'N/A').replace(/"/g, '""')}"`,
    `"${(att.student.rollNumber || '').replace(/"/g, '""')}"`,
    `"${(att.chapterCode || '').replace(/"/g, '""')}"`,
    `"${(att.chapterTitle || '').replace(/"/g, '""')}"`,
    att.stats.score,
    att.stats.totalQuestions,
    `${att.stats.percentage}%`,
    att.stats.passed ? 'PASSED' : 'FAILED',
    att.stats.grade,
    att.stats.correctCount,
    att.stats.incorrectCount,
    att.stats.unattemptedCount,
    att.stats.timeSpentSeconds,
    `"${new Date(att.submittedAt).toLocaleString('en-IN')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Rishu_Sir_Test_Results_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function clearAllAttempts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REGISTRATIONS_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear attempts', e);
  }
}


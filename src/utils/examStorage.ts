import { StudentInfo, ExamResultStats, Question } from '../types';
import { supabase } from '../lib/supabase';

export interface StoredAttempt {
  student: StudentInfo;
  chapterId?: string;
  chapterTitle?: string;
  chapterCode?: string;
  userAnswers: (number | null)[];
  shuffledQuestions: Question[];
  stats: ExamResultStats;
  submittedAt: string;
}

const STORAGE_KEY = 'olevel_m1_exam_attempts_v2';

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

export function makeAttemptKey(emailOrRoll: string, chapterId?: string): string {
  const cleanEmail = emailOrRoll.trim().toLowerCase();
  if (!chapterId) return cleanEmail;
  return `${cleanEmail}::${chapterId}`;
}

export function getAttempt(emailOrRoll: string, chapterId?: string): StoredAttempt | null {
  if (!emailOrRoll) return null;
  const cleanEmail = emailOrRoll.trim().toLowerCase();
  const map = getStorageMap();

  if (chapterId) {
    const chapterKey = makeAttemptKey(cleanEmail, chapterId);
    if (map[chapterKey]) return map[chapterKey];
    // Check fallback for old key
    if (map[cleanEmail] && (!map[cleanEmail].chapterId || map[cleanEmail].chapterId === chapterId)) {
      return map[cleanEmail];
    }
    return null;
  }

  return map[cleanEmail] || null;
}

export async function getAttemptAsync(emailOrRoll: string, chapterId?: string): Promise<StoredAttempt | null> {
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
        student: { name: data.student_name, rollNumber: cleanEmail },
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
    // Silent catch for initial setup before table is created
  }

  return null;
}

export async function saveAttempt(attempt: StoredAttempt, chapterId?: string): Promise<void> {
  const activeChapterId = attempt.chapterId || chapterId || 'ch1_intro';
  const cleanEmail = attempt.student.rollNumber.trim().toLowerCase();
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
      chapter_id: activeChapterId,
      chapter_title: attempt.chapterTitle || '',
      chapter_code: attempt.chapterCode || '',
      score: attempt.stats.score,
      total_questions: attempt.stats.totalQuestions,
      percentage: attempt.stats.percentage,
      passed: attempt.stats.passed,
      grade: attempt.stats.grade,
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
      if (
        error.message?.includes('schema cache') ||
        error.message?.includes('exam_attempts') ||
        error.code === 'PGRST301' ||
        error.code === '42P01'
      ) {
        console.info(
          'Supabase Info: The table "public.exam_attempts" does not exist in your Supabase project yet. The exam result has been safely stored in local browser storage. Run the SQL script provided in the UI to create the table in Supabase.'
        );
      } else {
        console.warn('Supabase upsert note:', error.message);
      }
    } else {
      console.log('Successfully saved attempt to Supabase database!');
    }
  } catch (err) {
    console.info('Supabase connection note (using local storage fallback):', err);
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
        student: { name: d.student_name, rollNumber: d.email_roll },
        userAnswers: d.user_answers || [],
        shuffledQuestions: d.shuffled_questions || [],
        stats: d.stats || {
          score: d.score,
          totalQuestions: d.total_questions,
          percentage: d.percentage,
          passed: d.passed,
          correctCount: d.score,
          incorrectCount: d.total_questions - d.score,
          unattemptedCount: 0,
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

export function clearAllAttempts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear attempts', e);
  }
}

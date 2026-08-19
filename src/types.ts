export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string]; // [A, B, C, D]
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  difficulty: Difficulty;
  category: string;
}

export interface StudentInfo {
  name: string;
  rollNumber: string;
  email?: string;
  phone?: string;
}

export interface Chapter {
  id: number;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  iconName: 'Monitor' | 'Cpu' | 'FileText' | 'Table' | 'Presentation';
  totalQuestions: number;
  timeLimitMinutes: number;
  badge: string;
  gradient: string;
  accentColor: string;
}

export type ExamStatus = 'chapter_selection' | 'registration' | 'ongoing' | 'submitted';

export interface ExamResultStats {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  timeSpentSeconds: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
}

export interface ChapterControlState {
  id: number;
  isOpen: boolean;
  announcement?: string;
  updatedAt?: string;
}

export type ChapterControlMap = Record<number, ChapterControlState>;

export interface RegisteredStudent {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  rollNumber: string;
  chapterId?: number | string;
  chapterTitle?: string;
  registeredAt?: string;
}


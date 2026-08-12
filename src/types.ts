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
}

export type ExamStatus = 'registration' | 'ongoing' | 'submitted';

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

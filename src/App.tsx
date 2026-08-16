/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { QUESTIONS } from './data/questions';
import { CHAPTERS } from './data/chapters';
import { getQuestionsForChapter } from './data/chapterQuestions';
import { StudentInfo, ExamStatus, ExamResultStats, Question, Chapter, ChapterControlMap } from './types';
import { Header } from './components/Header';
import { ChapterSelection } from './components/ChapterSelection';
import { StudentRegister } from './components/StudentRegister';
import { QuestionCard } from './components/QuestionCard';
import { QuestionPalette } from './components/QuestionPalette';
import { ResultDashboard } from './components/ResultDashboard';
import { ConfirmationModal } from './components/ConfirmationModal';
import { TimeoutModal } from './components/TimeoutModal';
import { OwnerControlModal } from './components/OwnerControlModal';
import { shuffleQuestionsForUser } from './utils/shuffle';
import { saveAttempt, StoredAttempt } from './utils/examStorage';
import { fetchChapterControls } from './utils/chapterControls';

const TOTAL_QUESTIONS = 100;
const EXAM_DURATION_SECONDS = 3600; // 60 minutes = 3600 seconds

export default function App() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(CHAPTERS[0]);
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [examStatus, setExamStatus] = useState<ExamStatus>('chapter_selection');
  const [chapterQuestions, setChapterQuestions] = useState<Question[]>(QUESTIONS);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    Array(TOTAL_QUESTIONS).fill(null)
  );
  const [markedForReview, setMarkedForReview] = useState<boolean[]>(
    Array(TOTAL_QUESTIONS).fill(false)
  );
  const [timeLeft, setTimeLeft] = useState<number>(EXAM_DURATION_SECONDS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isTimeoutModalOpen, setIsTimeoutModalOpen] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Owner Chapter Controls State
  const [chapterControls, setChapterControls] = useState<ChapterControlMap>(() => {
    // Initial local read (fast)
    const initial: ChapterControlMap = {};
    CHAPTERS.forEach((c) => {
      initial[c.id] = { id: c.id, isOpen: true };
    });
    try {
      const stored = localStorage.getItem('rishu_sir_chapter_controls_v1');
      if (stored) {
        return { ...initial, ...JSON.parse(stored) };
      }
    } catch {
      // fallback to initial
    }
    return initial;
  });
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState<boolean>(false);

  // Sync chapter controls with Supabase / storage on startup
  useEffect(() => {
    let isMounted = true;
    fetchChapterControls().then((remoteControls) => {
      if (isMounted && remoteControls && Object.keys(remoteControls).length > 0) {
        setChapterControls(remoteControls);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Chapter selection handler
  const handleSelectChapter = (chapter: Chapter) => {
    const qList = getQuestionsForChapter(chapter.id);
    setSelectedChapter(chapter);
    setChapterQuestions(qList);
    setActiveQuestions(qList);
    setExamStatus('registration');
  };

  // Return to chapter selection
  const handleChangeChapter = () => {
    setExamStatus('chapter_selection');
  };

  // Helper to calculate exam results using current active/shuffled questions
  const calculateResults = useCallback((): ExamResultStats => {
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    userAnswers.forEach((ans, idx) => {
      if (ans === null) {
        unattemptedCount++;
      } else if (ans === activeQuestions[idx]?.correctAnswer) {
        correctCount++;
        score++;
      } else {
        incorrectCount++;
      }
    });

    const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
    const passed = score >= 50;

    let grade: ExamResultStats['grade'] = 'F';
    if (percentage >= 85) grade = 'S';
    else if (percentage >= 75) grade = 'A';
    else if (percentage >= 65) grade = 'B';
    else if (percentage >= 55) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    return {
      score,
      totalQuestions: TOTAL_QUESTIONS,
      percentage,
      passed,
      correctCount,
      incorrectCount,
      unattemptedCount,
      timeSpentSeconds: timeSpent,
      grade,
    };
  }, [userAnswers, timeSpent, activeQuestions]);

  // Save finalized attempt into persistent storage
  const finalizeAndSaveAttempt = useCallback(
    (currentStudent: StudentInfo, answers: (number | null)[], questions: Question[]) => {
      let score = 0;
      let correctCount = 0;
      let incorrectCount = 0;
      let unattemptedCount = 0;

      answers.forEach((ans, idx) => {
        if (ans === null) {
          unattemptedCount++;
        } else if (ans === questions[idx]?.correctAnswer) {
          correctCount++;
          score++;
        } else {
          incorrectCount++;
        }
      });

      const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
      const passed = score >= 50;

      let grade: ExamResultStats['grade'] = 'F';
      if (percentage >= 85) grade = 'S';
      else if (percentage >= 75) grade = 'A';
      else if (percentage >= 65) grade = 'B';
      else if (percentage >= 55) grade = 'C';
      else if (percentage >= 50) grade = 'D';

      const stats: ExamResultStats = {
        score,
        totalQuestions: TOTAL_QUESTIONS,
        percentage,
        passed,
        correctCount,
        incorrectCount,
        unattemptedCount,
        timeSpentSeconds: timeSpent,
        grade,
      };

      saveAttempt({
        student: currentStudent,
        chapterId: selectedChapter.id,
        chapterTitle: selectedChapter.title,
        chapterCode: selectedChapter.code,
        userAnswers: answers,
        shuffledQuestions: questions,
        stats,
        submittedAt: new Date().toISOString(),
      }, selectedChapter.id);
    },
    [timeSpent, selectedChapter]
  );

  // Handle auto-submit on timeout
  const handleTimeoutSubmit = useCallback(() => {
    setExamStatus('submitted');
    setIsSubmitModalOpen(false);
    setIsTimeoutModalOpen(true);

    if (student) {
      finalizeAndSaveAttempt(student, userAnswers, activeQuestions);
    }
  }, [student, userAnswers, activeQuestions, finalizeAndSaveAttempt]);

  // Countdown timer effect
  useEffect(() => {
    if (examStatus !== 'ongoing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeoutSubmit();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [examStatus, handleTimeoutSubmit]);

  // Start exam trigger - shuffles questions specifically for the candidate's email
  const handleStartExam = (info: StudentInfo) => {
    // Gatekeeper: verify chapter is open
    const currentControl = chapterControls[selectedChapter.id];
    if (currentControl && !currentControl.isOpen) {
      alert(`Test for ${selectedChapter.title} is currently closed by the Owner (Rishu Sir).`);
      return;
    }

    const shuffled = shuffleQuestionsForUser(chapterQuestions, info.rollNumber);
    setStudent(info);
    setActiveQuestions(shuffled);
    setExamStatus('ongoing');
    setTimeLeft(EXAM_DURATION_SECONDS);
    setTimeSpent(0);
    setCurrentIndex(0);
    setUserAnswers(Array(TOTAL_QUESTIONS).fill(null));
    setMarkedForReview(Array(TOTAL_QUESTIONS).fill(false));
  };

  // View past completed attempt
  const handleViewPastAttempt = (attempt: StoredAttempt) => {
    setStudent(attempt.student);
    setActiveQuestions(attempt.shuffledQuestions);
    setUserAnswers(attempt.userAnswers);
    setExamStatus('submitted');
  };

  // Option select handler
  const handleSelectOption = (optionIndex: number) => {
    if (examStatus !== 'ongoing') return;
    const updated = [...userAnswers];
    updated[currentIndex] = optionIndex;
    setUserAnswers(updated);
  };

  // Clear choice handler
  const handleClearAnswer = () => {
    if (examStatus !== 'ongoing') return;
    const updated = [...userAnswers];
    updated[currentIndex] = null;
    setUserAnswers(updated);
  };

  // Bookmark toggle handler
  const handleToggleBookmark = () => {
    if (examStatus !== 'ongoing') return;
    const updated = [...markedForReview];
    updated[currentIndex] = !updated[currentIndex];
    setMarkedForReview(updated);
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSelectQuestionFromPalette = (index: number) => {
    setCurrentIndex(index);
  };

  // Manual submission confirm
  const handleConfirmSubmit = () => {
    setExamStatus('submitted');
    setIsSubmitModalOpen(false);

    if (student) {
      finalizeAndSaveAttempt(student, userAnswers, activeQuestions);
    }
  };

  // Return to Registration / New candidate
  const handleRetake = () => {
    setExamStatus('registration');
    setIsSubmitModalOpen(false);
    setIsTimeoutModalOpen(false);
    setTimeLeft(EXAM_DURATION_SECONDS);
    setTimeSpent(0);
    setCurrentIndex(0);
    setStudent(null);
    setActiveQuestions(chapterQuestions);
  };

  const answeredCount = userAnswers.filter((a) => a !== null).length;
  const unansweredCount = TOTAL_QUESTIONS - answeredCount;
  const markedCount = markedForReview.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans relative overflow-x-hidden flex flex-col">
      {/* Background Frosted Glass Ambient Lighting Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[30%] w-[35%] h-[35%] bg-emerald-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Main Header */}
      <Header
        student={student}
        selectedChapter={selectedChapter}
        timeLeft={timeLeft}
        totalQuestions={TOTAL_QUESTIONS}
        answeredCount={answeredCount}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        examStarted={examStatus === 'ongoing'}
        examSubmitted={examStatus === 'submitted'}
        onChangeChapter={handleChangeChapter}
        onOpenOwnerControl={() => setIsOwnerModalOpen(true)}
      />

      {/* Main Container Viewport */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* VIEW 0: Landing Chapter Selection */}
        {examStatus === 'chapter_selection' && (
          <ChapterSelection
            controls={chapterControls}
            onSelectChapter={handleSelectChapter}
            onOpenOwnerControl={() => setIsOwnerModalOpen(true)}
          />
        )}

        {/* VIEW 1: Candidate Registration */}
        {examStatus === 'registration' && (
          <StudentRegister
            selectedChapter={selectedChapter}
            chapterControl={chapterControls[selectedChapter.id]}
            onStartExam={handleStartExam}
            onViewPastAttempt={handleViewPastAttempt}
            onChangeChapter={handleChangeChapter}
          />
        )}

        {/* VIEW 2: Active Exam Portal */}
        {examStatus === 'ongoing' && (
          <div className="flex-1 p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full items-start">
            {/* Left 8 Cols: Active Question */}
            <section className="lg:col-span-8 flex flex-col h-full min-h-[550px]">
              <QuestionCard
                question={activeQuestions[currentIndex]}
                currentIndex={currentIndex}
                totalQuestions={TOTAL_QUESTIONS}
                selectedAnswer={userAnswers[currentIndex]}
                isMarkedForReview={markedForReview[currentIndex]}
                onSelectOption={handleSelectOption}
                onClearAnswer={handleClearAnswer}
                onToggleBookmark={handleToggleBookmark}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
              />
            </section>

            {/* Right 4 Cols: Question Palette Matrix */}
            <section className="lg:col-span-4 h-full">
              <QuestionPalette
                totalQuestions={TOTAL_QUESTIONS}
                currentIndex={currentIndex}
                userAnswers={userAnswers}
                markedForReview={markedForReview}
                onSelectQuestion={handleSelectQuestionFromPalette}
                onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
              />
            </section>
          </div>
        )}

        {/* VIEW 3: Results & Analytics Dashboard */}
        {examStatus === 'submitted' && student && (
          <ResultDashboard
            student={student}
            selectedChapter={selectedChapter}
            questions={activeQuestions}
            userAnswers={userAnswers}
            stats={calculateResults()}
            onRetake={handleRetake}
          />
        )}
      </main>

      {/* Manual Submit Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSubmitModalOpen}
        totalQuestions={TOTAL_QUESTIONS}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        markedCount={markedCount}
        onConfirmSubmit={handleConfirmSubmit}
        onCancel={() => setIsSubmitModalOpen(false)}
      />

      {/* Time Out Modal */}
      <TimeoutModal
        isOpen={isTimeoutModalOpen}
        onViewResults={() => setIsTimeoutModalOpen(false)}
      />

      {/* Owner (Rishu Sir) Test Availability Control Modal */}
      <OwnerControlModal
        isOpen={isOwnerModalOpen}
        controls={chapterControls}
        onClose={() => setIsOwnerModalOpen(false)}
        onControlsUpdated={(updated) => setChapterControls(updated)}
      />
    </div>
  );
}

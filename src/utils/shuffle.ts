import { Question } from '../types';

/**
 * Hash string to integer seed
 */
function hashString(str: string): number {
  let hash = 0;
  const cleanStr = str.trim().toLowerCase();
  for (let i = 0; i < cleanStr.length; i++) {
    hash = (hash << 5) - hash + cleanStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1234567;
}

/**
 * Simple Pseudo-Random Number Generator based on Seed
 */
function seededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Shuffles questions & options deterministically based on candidate's email / roll number.
 * Every unique email gets a unique randomized order of questions & options.
 */
export function shuffleQuestionsForUser(
  questions: Question[],
  userIdentifier: string
): Question[] {
  if (!userIdentifier || !userIdentifier.trim()) {
    return [...questions];
  }

  const seed = hashString(userIdentifier);
  const rng = seededRandom(seed);

  // Deep clone array
  const shuffled = questions.map((q) => ({
    ...q,
    options: [...q.options] as [string, string, string, string],
  }));

  // Fisher-Yates shuffle for Question Order
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Also shuffle Options per question while maintaining correct answer index
  return shuffled.map((q) => {
    const optionPairs = q.options.map((optText, origIdx) => ({
      text: optText,
      isCorrect: origIdx === q.correctAnswer,
    }));

    // Fisher-Yates shuffle for options using same seeded RNG
    for (let i = optionPairs.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [optionPairs[i], optionPairs[j]] = [optionPairs[j], optionPairs[i]];
    }

    const newOptions: [string, string, string, string] = [
      optionPairs[0].text,
      optionPairs[1].text,
      optionPairs[2].text,
      optionPairs[3].text,
    ];
    const newCorrectIndex = optionPairs.findIndex((p) => p.isCorrect);

    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectIndex >= 0 ? newCorrectIndex : 0,
    };
  });
}

// Homework Type Definitions for Biblical Hebrew

export type SectionId = 1 | 2 | 3 | 4 | 5;

export type QuestionType = 'transliteration' | 'mcq';

// Base question interface
export interface BaseQuestion {
  id: string;
  type: QuestionType;
}

// For Section 1 & 2: Hebrew transliteration (Hebrew → type Latin)
export interface TransliterationQuestion extends BaseQuestion {
  type: 'transliteration';
  hebrew: string;
  answer: string;
  variants: string[];  // Acceptable alternative spellings
  gloss?: string;      // English meaning for feedback
}

// For Sections 3-5: Multiple choice
export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  question: string;
  hebrew?: string;     // Optional Hebrew text to display
  options: string[];
  correctIndex: number;
  explanation: string;
  category?: string;   // e.g., "binyan", "construct", "grammar"
}

// Union type for all questions
export type HomeworkQuestion = TransliterationQuestion | MCQQuestion;

// Answer tracking
export interface QuestionAnswer {
  questionId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  timestamp: number;
}

// Section progress
export interface SectionProgress {
  sectionId: SectionId;
  status: 'not_started' | 'in_progress' | 'completed';
  currentIndex: number;
  answers: QuestionAnswer[];
  score: number;
  totalQuestions: number;
  startedAt?: number;
  completedAt?: number;
}

// Overall homework progress
export interface Homework1Progress {
  id: 'hw1';
  status: 'not_started' | 'in_progress' | 'completed';
  sections: Record<SectionId, SectionProgress>;
  currentSection: SectionId;
  startedAt?: number;
  completedAt?: number;
  totalScore: number;
  totalPossible: number;
}

// Section metadata for display
export interface SectionMeta {
  id: SectionId;
  title: string;
  description: string;
  questionCount: number;
  helpPage: string;
}

// Help page content types
export interface AlphabetEntry {
  hebrew: string;
  latin: string;
  name: string;
  sound?: string;
  isFinal?: boolean;
}

export interface GrammarTerm {
  term: string;
  definition: string;
  example: string;
  hebrewExample?: string;
}

export interface ConstructDefinition {
  name: string;
  function: string;
  description: string;
  example: string;
  hebrewExample: string;
}

export interface BinyanDefinition {
  name: string;
  hebrewName: string;
  meaning: string;
  example: string;
  translation: string;
}

// Helper type for creating initial state
export const createInitialSectionProgress = (
  sectionId: SectionId,
  totalQuestions: number
): SectionProgress => ({
  sectionId,
  status: 'not_started',
  currentIndex: 0,
  answers: [],
  score: 0,
  totalQuestions,
});

export const createInitialHomework1Progress = (): Homework1Progress => ({
  id: 'hw1',
  status: 'not_started',
  sections: {
    1: createInitialSectionProgress(1, 31),  // 26 Hebrew letter forms + 5 final forms
    2: createInitialSectionProgress(2, 16),  // 16 Hebrew words
    3: createInitialSectionProgress(3, 10),  // 10 grammar term MCQs
    4: createInitialSectionProgress(4, 5),   // 5 construct state MCQs
    5: createInitialSectionProgress(5, 24),  // 24 binyan identification MCQs
  },
  currentSection: 1,
  totalScore: 0,
  totalPossible: 86,  // 31 + 16 + 10 + 5 + 24
});

// Section metadata - Hebrew specific
export const SECTION_META: Record<SectionId, SectionMeta> = {
  1: {
    id: 1,
    title: 'Hebrew Alphabet',
    description: 'Transliterate each letter of the Hebrew alphabet including final forms',
    questionCount: 31,
    helpPage: '/homework/help/transliteration',
  },
  2: {
    id: 2,
    title: 'Word Transliteration',
    description: 'Transliterate common Hebrew vocabulary words',
    questionCount: 16,
    helpPage: '/homework/help/transliteration',
  },
  3: {
    id: 3,
    title: 'Grammar Terms',
    description: 'Test your knowledge of English grammar terminology',
    questionCount: 10,
    helpPage: '/homework/help/grammar-terms',
  },
  4: {
    id: 4,
    title: 'Construct State',
    description: 'Learn about the Hebrew construct state (סְמִיכוּת) for showing relationships',
    questionCount: 5,
    helpPage: '/homework/help/construct-state',
  },
  5: {
    id: 5,
    title: 'Binyan Identification',
    description: 'Identify the binyan (verb stem) of Hebrew verb forms',
    questionCount: 24,
    helpPage: '/homework/help/binyanim',
  },
};

// Homework submission for teacher dashboard
export interface HomeworkSubmission {
  studentUid: string;
  homeworkId: string;
  status: 'completed';
  completedAt: Date;
  score: number;
  totalPossible: number;
  percentage: number;
  displayName: string | null;
  email: string | null;
  sections?: Record<string, {
    score: number;
    totalQuestions: number;
    status: string;
  }>;
}

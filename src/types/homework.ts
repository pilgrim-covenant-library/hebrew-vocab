// Homework Type Definitions for Biblical Hebrew

export type SectionId = 1 | 2 | 3 | 4 | 5;

// Homework 1 is a single unified alphabet-and-vocabulary assignment.
export const HOMEWORK1_SECTION_IDS: readonly SectionId[] = [1];

export type QuestionType = 'transliteration' | 'mcq' | 'paired_mcq';

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
  meaning?: string;    // English meaning for vocabulary items
  transliterationOptions?: string[];
  transliterationCorrectIndex?: number;
  meaningOptions?: string[];
  meaningCorrectIndex?: number;
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

// A two-stage MCQ used whenever a Hebrew word is tested for both reading and
// meaning. The transliteration stage must be completed before meaning appears.
export interface PairedMCQQuestion extends BaseQuestion {
  type: 'paired_mcq';
  question: string;
  hebrew: string;
  transliterationOptions: string[];
  transliterationCorrectIndex: number;
  transliterationExplanation: string;
  meaningOptions: string[];
  meaningCorrectIndex: number;
  meaningExplanation: string;
  category?: string;
}

// Union type for all questions
export type HomeworkQuestion = TransliterationQuestion | MCQQuestion | PairedMCQQuestion;

export interface PairedMCQAnswer {
  transliterationIndex: number;
  meaningIndex: number;
}

// Answer tracking
export interface QuestionAnswer {
  questionId: string;
  userAnswer: string | number | PairedMCQAnswer;
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
    1: createInitialSectionProgress(1, 47),  // 31 alphabet + 16 two-stage word MCQs
    2: createInitialSectionProgress(2, 0),
    3: createInitialSectionProgress(3, 0),
    4: createInitialSectionProgress(4, 0),
    5: createInitialSectionProgress(5, 0),
  },
  currentSection: 1,
  totalScore: 0,
  totalPossible: 47,
});

// Section metadata - Hebrew specific
export const SECTION_META: Record<SectionId, SectionMeta> = {
  1: {
    id: 1,
    title: 'Hebrew Alphabet & Word Transliteration',
    description: 'Identify every letter and final form, then each word’s transliteration and English meaning',
    questionCount: 47,
    helpPage: '/homework/help/transliteration',
  },
  2: {
    id: 2,
    title: 'Word Transliteration',
    description: 'Identify each word’s transliteration, then its English meaning',
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

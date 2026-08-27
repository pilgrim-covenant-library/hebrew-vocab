export interface PracticeQuestion {
  id: string;
  prompt: string;
  hebrew?: string;
  transliteration?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

// Groups keep multi-step practice items together while allowing single-screen
// questions to use the same session builder.
export interface PracticeQuestionGroup {
  id: string;
  questions: PracticeQuestion[];
}

export interface PracticeSessionMode {
  id: string;
  label: string;
  count: number;
}

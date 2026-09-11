import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  CLASS13_PRACTICE_PAPER_SECTIONS,
  class13GrammarQuestions,
  class13VerseAnalysisQuestions,
  class13VocabQuestions,
} from '@/data/review/class13PracticePaper';
import {
  CLASS13_EXAM_SECTIONS,
  class13ExamGrammarQuestions,
  class13ExamVerseAnalysisQuestions,
  class13ExamVocabQuestions,
} from '@/data/review/class13FinalExam';
import type { PracticeMCQ, PracticeVerseAnalysis } from '@/data/review/practicePaper';

const hasHebrew = (s: string) => /[֐-׿]/.test(s);
// Strip Hebrew points/accents (niqqud + te'amim + Maqqef, U+0591–U+05C7).
const skeleton = (s: string) => s.replace(/[֑-ׇ]/g, '');

function validateMCQ(question: PracticeMCQ) {
  expect(question.options).toHaveLength(4);
  expect(new Set(question.options).size).toBe(4);
  expect(question.correctIndex).toBeGreaterThanOrEqual(0);
  expect(question.correctIndex).toBeLessThan(4);
  expect(question.explanation.length).toBeGreaterThan(0);
}

function validateVerse(verse: PracticeVerseAnalysis) {
  expect(hasHebrew(verse.hebrew)).toBe(true);
  expect(verse.reference.length).toBeGreaterThan(0);
  expect(verse.transliteration.length).toBeGreaterThan(0);
  expect(verse.referenceTranslation.length).toBeGreaterThan(0);
  expect(verse.keyTerms.length).toBeGreaterThan(0);
  expect(verse.matchingPairs.length).toBeGreaterThanOrEqual(4);
  expect(verse.distractorCategories.length).toBeGreaterThanOrEqual(3);

  const categories = verse.matchingPairs.map((pair) => pair.category);
  expect(new Set(categories).size).toBe(categories.length);
  for (const pair of verse.matchingPairs) {
    expect(hasHebrew(pair.hebrew)).toBe(true);
  }
  // A distractor that duplicates a real category would make the item unanswerable.
  for (const distractor of verse.distractorCategories) {
    expect(categories).not.toContain(distractor);
  }
  expect(new Set(verse.distractorCategories).size).toBe(verse.distractorCategories.length);
}

const papers: Array<{
  name: string;
  grammar: PracticeMCQ[];
  vocab: PracticeMCQ[];
  verses: PracticeVerseAnalysis[];
  sections: ReadonlyArray<{ id: number; title: string; questionCount: number }>;
}> = [
  {
    name: 'Class 13 practice paper',
    grammar: class13GrammarQuestions,
    vocab: class13VocabQuestions,
    verses: class13VerseAnalysisQuestions,
    sections: CLASS13_PRACTICE_PAPER_SECTIONS,
  },
  {
    name: 'Class 13 final exam',
    grammar: class13ExamGrammarQuestions,
    vocab: class13ExamVocabQuestions,
    verses: class13ExamVerseAnalysisQuestions,
    sections: CLASS13_EXAM_SECTIONS,
  },
];

describe.each(papers)('$name', ({ grammar, vocab, verses, sections }) => {
  it('has the Koine paper shape: 50 grammar, 30 vocab, 5 verse-analysis items', () => {
    expect(grammar).toHaveLength(50);
    expect(vocab).toHaveLength(30);
    expect(verses).toHaveLength(5);
  });

  it('advertises section counts that match the banks', () => {
    expect(sections).toHaveLength(3);
    expect(sections[0].questionCount).toBe(grammar.length);
    expect(sections[1].questionCount).toBe(vocab.length);
    expect(sections[2].questionCount).toBe(verses.length);
  });

  it('uses unique IDs across the whole paper', () => {
    const ids = [...grammar, ...vocab].map((q) => q.id).concat(verses.map((v) => v.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses valid four-option MCQs with an explanation', () => {
    for (const question of [...grammar, ...vocab]) {
      validateMCQ(question);
    }
  });

  it('has no MCQ whose four Hebrew options differ only by vowel/dagesh marks', () => {
    const offenders = [...grammar, ...vocab]
      .filter((q) => q.options.every(hasHebrew) && new Set(q.options.map(skeleton)).size <= 1)
      .map((q) => q.id);
    expect(offenders).toEqual([]);
  });

  it('keeps every answer position well below a skewed share', () => {
    const tally = [0, 0, 0, 0];
    for (const question of [...grammar, ...vocab]) {
      tally[question.correctIndex] += 1;
    }
    const positions = tally.reduce((sum, count) => sum + count, 0);
    for (const count of tally) {
      expect(count / positions).toBeLessThan(0.4);
    }
  });

  it('has well-formed verse-analysis items', () => {
    for (const verse of verses) {
      validateVerse(verse);
    }
  });
});

describe('Class 13 exam composition', () => {
  it('reuses most of the practice paper and adds exam-only items', () => {
    expect(class13ExamGrammarQuestions.slice(0, 40)).toEqual(class13GrammarQuestions.slice(0, 40));
    expect(class13ExamVocabQuestions.slice(0, 24)).toEqual(class13VocabQuestions.slice(0, 24));
    expect(class13ExamVerseAnalysisQuestions.slice(0, 4)).toEqual(class13VerseAnalysisQuestions.slice(0, 4));
  });

  it('makes roughly a fifth of the exam unseen', () => {
    const practiceIds = new Set(
      [...class13GrammarQuestions, ...class13VocabQuestions].map((q) => q.id),
    );
    const examIds = [...class13ExamGrammarQuestions, ...class13ExamVocabQuestions].map((q) => q.id);
    const unseen = examIds.filter((id) => !practiceIds.has(id));

    expect(unseen).toHaveLength(16);
    expect(unseen.length / examIds.length).toBeGreaterThan(0.15);
    expect(unseen.length / examIds.length).toBeLessThan(0.25);

    const practiceVerseIds = new Set(class13VerseAnalysisQuestions.map((v) => v.id));
    const unseenVerses = class13ExamVerseAnalysisQuestions.filter((v) => !practiceVerseIds.has(v.id));
    expect(unseenVerses).toHaveLength(1);
  });

  it('replaces the dropped syntax and derived-stem items rather than losing that coverage', () => {
    const dropped = class13GrammarQuestions.slice(40).map((q) => q.id);
    const examIds = class13ExamGrammarQuestions.map((q) => q.id);
    for (const id of dropped) {
      expect(examIds).not.toContain(id);
    }
    // The exam-only items must still cover the derived stems and the Hithpael verse.
    const examText = [
      ...class13ExamGrammarQuestions.slice(40).map((q) => `${q.question} ${q.explanation}`),
      class13ExamVerseAnalysisQuestions[4].matchingPairs.map((p) => p.category).join(' '),
    ].join(' ');
    for (const stem of ['Niphal', 'Hiphil', 'Hophal', 'Piel', 'Pual', 'Hithpael']) {
      expect(examText).toContain(stem);
    }
  });
});

describe('Practice Paper is released and live', () => {
  const routes = [
    'src/app/grammar/review/practice-paper/page.tsx',
    'src/app/grammar/review/final-exam/page.tsx',
  ];

  it('is imported by both live review routes', () => {
    for (const route of routes) {
      const source = readFileSync(join(process.cwd(), route), 'utf8');
      expect(source).toContain('class13');
    }
  });
});

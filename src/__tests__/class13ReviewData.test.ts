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
const capRun = (s: string) => /[A-Z]{2,}/.test(s);
const hasParen = (s: string) => /[()]/.test(s);
const hasComma = (s: string) => s.includes(',');

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
  it('has the Koine paper shape: 40 grammar, 40 vocab, 5 verse-analysis items', () => {
    expect(grammar).toHaveLength(40);
    expect(vocab).toHaveLength(40);
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
      expect(count / positions).toBeLessThan(0.32);
    }
  });

  it('never lets the correct option stand out (no caps/paren/comma/length tell)', () => {
    for (const q of [...grammar, ...vocab]) {
      const c = q.options[q.correctIndex];
      const others = q.options.filter((_, i) => i !== q.correctIndex);
      if (capRun(c)) expect(others.some(capRun)).toBe(true);
      if (hasParen(c)) expect(others.some(hasParen)).toBe(true);
      if (hasComma(c)) expect(others.some(hasComma)).toBe(true);
      const maxOther = Math.max(...others.map((o) => o.length));
      const tooLong = c.length > maxOther * 1.4 && c.length - maxOther >= 8;
      expect(tooLong).toBe(false);
    }
  });

  it('never names the answer in the question stem', () => {
    // Metalanguage that IS the answer: a stem must not hand over the parse it asks for.
    const giveaways = [/wayyiqtol/i, /q[oō]t[eē]l/i, /construct verbal noun/i, /prefix.conjugation/i];
    for (const q of [...grammar, ...vocab]) {
      for (const tell of giveaways) {
        expect(`${q.id}: ${q.question}`).not.toMatch(tell);
      }
    }
  });

  it('has well-formed verse-analysis items', () => {
    for (const verse of verses) {
      validateVerse(verse);
    }
  });

  it('never keys שָׁמַיִם as dual', () => {
    // -ayim looks dual, but שָׁמַיִם is a plurale tantum: plural in form and meaning.
    // Prose may discuss the dual ending; no answer key or category may classify it as one.
    const mentionsShamayim = (t: string) => t.includes('שָּׁמַיִם') || t.includes('שָׁמַיִם');
    for (const q of [...grammar, ...vocab]) {
      if (mentionsShamayim(`${q.hebrew ?? ''} ${q.question}`)) {
        expect(q.options[q.correctIndex]).not.toMatch(/dual/i);
      }
    }
    for (const verse of verses) {
      for (const pair of verse.matchingPairs) {
        if (mentionsShamayim(pair.hebrew)) expect(pair.category).not.toMatch(/dual/i);
      }
    }
  });

  it('never lets a matching category stand out by a caps run', () => {
    // In matching, every listed pair is correct — a caps run on those alone
    // tells the student which categories are the real ones.
    for (const verse of verses) {
      const correct = verse.matchingPairs.map((p) => p.category);
      if (correct.some(capRun)) {
        expect(verse.distractorCategories.some(capRun)).toBe(true);
      }
    }
  });
});

describe('Class 13 exam composition', () => {
  it('reuses most of the practice paper and adds exam-only items', () => {
    expect(class13ExamGrammarQuestions.slice(0, 30)).toEqual(class13GrammarQuestions.slice(0, 30));
    expect(class13ExamVocabQuestions.slice(0, 34)).toEqual(class13VocabQuestions.slice(0, 34));
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

  it('drops the last ten practice grammar items and swaps in unseen ones', () => {
    const dropped = class13GrammarQuestions.slice(30).map((q) => q.id);
    const examIds = class13ExamGrammarQuestions.map((q) => q.id);
    for (const id of dropped) {
      expect(examIds).not.toContain(id);
    }
    // The ten swapped-in items are the exam-only replacements (ids not in the paper).
    const paperIds = new Set(class13GrammarQuestions.map((q) => q.id));
    const examOnly = class13ExamGrammarQuestions.filter((q) => !paperIds.has(q.id));
    expect(examOnly).toHaveLength(10);
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

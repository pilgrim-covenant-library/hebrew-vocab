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
import { hw2Meta as hw2 } from '@/data/homework/hw2-questions';
import { hw3Meta as hw3 } from '@/data/homework/hw3-questions';
import { hw4Meta as hw4 } from '@/data/homework/hw4-questions';
import { hw5Meta as hw5 } from '@/data/homework/hw5-questions';
import { hw6Meta as hw6 } from '@/data/homework/hw6-questions';
import { hw7Meta as hw7 } from '@/data/homework/hw7-questions';
import { hw8Meta as hw8 } from '@/data/homework/hw8-questions';
import { hw9Meta as hw9 } from '@/data/homework/hw9-questions';
import { hw10Meta as hw10 } from '@/data/homework/hw10-questions';
import { hw11Meta as hw11 } from '@/data/homework/hw11-questions';

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

describe.each(papers)('$name', ({ name, grammar, vocab, verses, sections }) => {
  // The practice paper is 100 questions: 60 grammar (20 of them testing the
  // derived-stem chart), 35 vocabulary and 5 verses. The exam keeps the Koine
  // shape, drawing 30 grammar and 34 vocabulary items from the paper.
  it('has its shape: 60/35/5 = 100 (paper) or 40/40/5 (exam)', () => {
    const isPaper = name === 'Class 13 practice paper';
    expect(grammar).toHaveLength(isPaper ? 60 : 40);
    expect(vocab).toHaveLength(isPaper ? 35 : 40);
    expect(verses).toHaveLength(5);
    if (isPaper) expect(grammar.length + vocab.length + verses.length).toBe(100);
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

  it('tests every derived stem, not just Niphal', () => {
    // BBH spends two chapters on each derived stem; a paper that drops one
    // (Hophal was absent, Niphal doubled) leaves that chapter unpractised.
    const text = [
      ...[...grammar, ...vocab].map((q) => `${q.question} ${q.options[q.correctIndex]} ${q.explanation}`),
      ...verses.flatMap((v) => v.matchingPairs.map((p) => p.category)),
    ].join(' ');
    for (const stem of ['Niphal', 'Piel', 'Pual', 'Hiphil', 'Hophal', 'Hithpael']) {
      expect(text).toContain(stem);
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

// The derived-stem chart: what each stem and conjugation MEANS, and how each stem
// CONJUGATES. Before this block the paper asked one meaning question per stem
// and nothing at all about the forms in the chart.
describe('Class 13 practice paper — derived-stem chart', () => {
  const text = (q: PracticeMCQ) => `${q.question} ${q.hebrew ?? ''} ${q.options[q.correctIndex]} ${q.explanation}`;
  const asked = (pattern: RegExp) => class13GrammarQuestions.filter((q) => pattern.test(text(q)));

  it.each([
    ['Perfect', /kind of action does the Perfect/],
    ['Imperfect', /incomplete or future action/],
    ['Imperative', /Imperative is used for/],
    ['Infinitive Construct', /What is an Infinitive Construct/],
    ['Infinitive Absolute', /What is an Infinitive Absolute/],
    ['Participle', /What is a Participle/],
  ])('asks what the %s is', (_, pattern) => {
    expect(asked(pattern).length).toBeGreaterThanOrEqual(1);
  });

  it.each(['Niphal', 'Hiphil', 'Hophal', 'Piel', 'Pual', 'Hithpael'])(
    'asks both what the %s means and how it is formed',
    (stem) => {
      const meaning = class13GrammarQuestions.filter((q) => q.options[q.correctIndex].includes(stem) || new RegExp(`${stem} form`).test(q.question) || new RegExp(`The ${stem} is`).test(q.question));
      const forms = class13GrammarQuestions.filter((q) => q.id >= 'c13-g41' && new RegExp(`\\b${stem}\\b`).test(`${q.options[q.correctIndex]} ${q.explanation}`) && /קָטַל|קְטִיל|קַטֵּל|קֻטַּל|קָטֵל|קְטוֹל|קְטָל|קְטַל/.test(text(q)));
      expect(meaning.length).toBeGreaterThanOrEqual(1);
      expect(forms.length).toBeGreaterThanOrEqual(1);
    },
  );

  it('covers every column of the chart with a paradigm form', () => {
    const block = class13GrammarQuestions.filter((q) => q.id >= 'c13-g41').map(text).join(' ');
    for (const column of ['Perfect', 'Imperfect', 'Imperative', 'Infinitive Construct', 'Infinitive Absolute', 'Participle']) {
      expect(block).toContain(column);
    }
  });

  it('asks no paradigm question that a homework already asks word for word', () => {
    const homeworkPrompts = new Set(
      [hw2, hw3, hw4, hw5, hw6, hw7, hw8, hw9, hw10, hw11]
        .flatMap((m) => Object.values(m.sectionQuestions).flat() as { question?: string; hebrew?: string }[])
        .map((q) => `${q.question}|${q.hebrew ?? ''}`),
    );
    const copies = class13GrammarQuestions.filter((q) => homeworkPrompts.has(`${q.question}|${q.hebrew ?? ''}`)).map((q) => q.id);
    expect(copies).toEqual([]);
  });
});

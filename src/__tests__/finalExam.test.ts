// The final exam is the practice paper with at least 20% of it replaced by
// questions the paper never asks, behind a Hebrew-course access code.

import {
  class13GrammarQuestions,
  class13VocabQuestions,
  class13VerseAnalysisQuestions,
} from '@/data/review/class13PracticePaper';
import {
  class13ExamGrammarQuestions,
  class13ExamVocabQuestions,
  class13ExamVerseAnalysisQuestions,
} from '@/data/review/class13FinalExam';
import { courseworkWordKey } from '@/lib/coursework';
import { buildQuestions, computeSummary, createQuestionOrder, isFinalExamAccessCode } from '@/lib/finalExam';
import { familyKey } from '@/lib/hebrewStem';

const paperMcqs = [...class13GrammarQuestions, ...class13VocabQuestions];
const paperIds = new Set([...paperMcqs, ...class13VerseAnalysisQuestions].map((q) => q.id));
const examMcqs = [...class13ExamGrammarQuestions, ...class13ExamVocabQuestions];
const examOnlyMcqs = examMcqs.filter((q) => !paperIds.has(q.id));
const examOnlyVerses = class13ExamVerseAnalysisQuestions.filter((q) => !paperIds.has(q.id));
const examTotal = examMcqs.length + class13ExamVerseAnalysisQuestions.length;

describe('final exam access code', () => {
  it.each(['shalom', 'Shalom', ' SHALOM '])('should accept %p', (code) => {
    expect(isFinalExamAccessCode(code)).toBe(true);
  });

  it.each(['hebrew', 'greek', '', 'shaloms'])('should reject %p', (code) => {
    expect(isFinalExamAccessCode(code)).toBe(false);
  });
});

describe('final exam vs the practice paper', () => {
  it('should keep the 40 grammar + 40 vocabulary + 5 verse shape', () => {
    expect([class13ExamGrammarQuestions.length, class13ExamVocabQuestions.length, class13ExamVerseAnalysisQuestions.length]).toEqual([40, 40, 5]);
  });

  it('should make at least 20% of the exam questions the paper does not have', () => {
    expect((examOnlyMcqs.length + examOnlyVerses.length) / examTotal).toBeGreaterThanOrEqual(0.2);
  });

  it('should not re-ask any practice-paper Hebrew under a new id', () => {
    const paperHebrew = new Map(paperMcqs.filter((q) => q.hebrew).map((q) => [courseworkWordKey(q.hebrew as string), q.id]));
    const repeats = examOnlyMcqs
      .filter((q) => q.hebrew && paperHebrew.has(courseworkWordKey(q.hebrew)))
      .map((q) => `${q.id} = ${paperHebrew.get(courseworkWordKey(q.hebrew as string))}`);
    expect(repeats).toEqual([]);
  });

  it('should not test a word family the paper vocabulary already tests', () => {
    const paperFamilies = new Set(
      class13VocabQuestions.flatMap((q) => (q.hebrew ?? '').split(' vs. ')).filter(Boolean).map(familyKey),
    );
    const repeats = class13ExamVocabQuestions
      .filter((q) => !paperIds.has(q.id))
      .flatMap((q) => (q.hebrew ?? '').split(' vs. '))
      .filter((word) => paperFamilies.has(familyKey(word)));
    expect(repeats).toEqual([]);
  });

  it('should not reuse a practice-paper verse', () => {
    const paperRefs = new Set(class13VerseAnalysisQuestions.map((v) => v.reference));
    expect(examOnlyVerses.filter((v) => paperRefs.has(v.reference)).map((v) => v.reference)).toEqual([]);
  });
});

describe('final exam question order', () => {
  it('should rebuild the same questions, grammar then vocabulary then verses, from a saved order', () => {
    const order = createQuestionOrder();
    const questions = buildQuestions(order);
    expect(questions.map((q) => q.data.id)).toEqual(order.map((ref) => ref.questionId));
    expect(questions.map((q) => q.sectionId)).toEqual([
      ...Array(40).fill(1),
      ...Array(40).fill(2),
      ...Array(5).fill(3),
    ]);
  });

  it('should drop ids that no longer exist instead of crashing a resumed exam', () => {
    const order = [{ sectionId: 1 as const, type: 'mcq' as const, questionId: 'gone' }, ...createQuestionOrder()];
    expect(buildQuestions(order)).toHaveLength(85);
  });
});

describe('computeSummary', () => {
  const questions = buildQuestions(createQuestionOrder());
  const allRight = Object.fromEntries(
    questions.flatMap((q) => (q.type === 'mcq' ? [[q.data.id, q.data.correctIndex]] : [])),
  );
  const allMatched = Object.fromEntries(
    class13ExamVerseAnalysisQuestions.map((v) => [v.id, Object.fromEntries(v.matchingPairs.map((p) => [p.hebrew, p.category]))]),
  );

  it('should score an untouched exam as zero, with every question reported unanswered', () => {
    const summary = computeSummary(questions, {}, {}, {});
    expect([summary.totalScore, summary.percentage, summary.grade.label]).toEqual([0, 0, 'F']);
    expect(summary.mcqAnswers.flatMap((s) => s.questions).every((q) => q.studentAnswer === -1)).toBe(true);
  });

  it('should give one point per right answer and two per fully matched verse', () => {
    const summary = computeSummary(questions, allRight, allMatched, {});
    expect([summary.grammarCorrect, summary.vocabCorrect, summary.verseAnalysisScore]).toEqual([40, 40, 10]);
    expect([summary.totalScore, summary.totalPossible, summary.percentage, summary.grade.label]).toEqual([90, 100, 90, 'A']);
  });

  it('should count "I don\'t know" as answered but wrong', () => {
    const [first, second] = questions;
    const summary = computeSummary(questions, { [first.data.id]: -1, [second.data.id]: allRight[second.data.id] }, {}, {});
    expect(summary.grammarCorrect).toBe(1);
    expect(summary.mcqAnswers[0].questions.find((q) => q.questionId === first.data.id)).toMatchObject({ studentAnswer: -1, isCorrect: false });
  });
});

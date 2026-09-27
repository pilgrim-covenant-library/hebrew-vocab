// A refresh, a crash or a closed tab must not cost a student their exam.

import { FINAL_EXAM_STORAGE_KEY, useFinalExamStore } from '@/stores/finalExamStore';

const ORDER = [
  { sectionId: 1 as const, type: 'mcq' as const, questionId: 'c13-g01' },
  { sectionId: 3 as const, type: 'va' as const, questionId: 'c13-va01' },
];
const saved = () => JSON.parse(localStorage.getItem(FINAL_EXAM_STORAGE_KEY) ?? '{}').state;

beforeEach(() => {
  localStorage.clear();
  useFinalExamStore.getState().reset();
});

describe('useFinalExamStore', () => {
  it('should write every answer to localStorage as it is given', () => {
    const exam = useFinalExamStore.getState();
    exam.setStudentName('Ruth');
    exam.startExam(ORDER);
    exam.saveMcq('c13-g01', 2);
    exam.saveMatching('c13-va01', 'בָּרָא', 'Qal Perfect 3ms');
    exam.saveTranslation('c13-va01', 'In the beginning');
    exam.setCurrentIndex(1);

    expect(saved()).toMatchObject({
      studentName: 'Ruth',
      questionOrder: ORDER,
      currentIndex: 1,
      mcqAnswers: { 'c13-g01': 2 },
      verseMatching: { 'c13-va01': { 'בָּרָא': 'Qal Perfect 3ms' } },
      verseTranslations: { 'c13-va01': 'In the beginning' },
    });
    expect(saved().startedAt).toEqual(expect.any(Number));
  });

  it('should restore a saved exam on reload', async () => {
    localStorage.setItem(FINAL_EXAM_STORAGE_KEY, JSON.stringify({
      state: { studentName: 'Boaz', startedAt: 1, questionOrder: ORDER, mcqAnswers: { 'c13-g01': 0 }, currentIndex: 1 },
      version: 1,
    }));
    await useFinalExamStore.persist.rehydrate();
    expect(useFinalExamStore.getState()).toMatchObject({ studentName: 'Boaz', startedAt: 1, currentIndex: 1, mcqAnswers: { 'c13-g01': 0 } });
  });

  it('should keep a submission unemailed until the email is confirmed', () => {
    const exam = useFinalExamStore.getState();
    exam.startExam(ORDER);
    exam.submitExam(true);
    expect(saved()).toMatchObject({ timedOut: true, emailedAt: null });
    expect(saved().submittedAt).toEqual(expect.any(Number));

    useFinalExamStore.getState().markEmailed();
    expect(saved().emailedAt).toEqual(expect.any(Number));
  });

  it('should clear answers and email status when a new attempt starts', () => {
    const exam = useFinalExamStore.getState();
    exam.startExam(ORDER);
    exam.saveMcq('c13-g01', 1);
    exam.submitExam(false);
    useFinalExamStore.getState().markEmailed();
    useFinalExamStore.getState().startExam(ORDER);
    expect(useFinalExamStore.getState()).toMatchObject({ mcqAnswers: {}, submittedAt: null, emailedAt: null, currentIndex: 0 });
  });
});

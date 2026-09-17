// A homework can gain sections after a student has already started it (HW10
// gained the strong Piel and Pual). Persisted progress snapshots the section
// list and the total at creation time, so it must be reconciled against the
// live meta on load — otherwise the new sections cannot be started and the
// homework reports itself complete without them.

import { useExtendedHomeworkStore } from '@/stores/extendedHomeworkStore';
import { hw10Meta } from '@/data/homework/hw10-questions';

const staleProgress = () => ({
  id: 'hw10' as const,
  status: 'in_progress' as const,
  sections: {
    1: { sectionId: 1, status: 'completed' as const, currentIndex: 7, answers: [], score: 8, totalQuestions: 8 },
    2: { sectionId: 2, status: 'not_started' as const, currentIndex: 0, answers: [], score: 0, totalQuestions: 8 },
    3: { sectionId: 3, status: 'not_started' as const, currentIndex: 0, answers: [], score: 0, totalQuestions: 8 },
    4: { sectionId: 4, status: 'not_started' as const, currentIndex: 0, answers: [], score: 0, totalQuestions: 8 },
    5: { sectionId: 5, status: 'not_started' as const, currentIndex: 0, answers: [], score: 0, totalQuestions: 10 },
    6: { sectionId: 6, status: 'not_started' as const, currentIndex: 0, answers: [], score: 0, totalQuestions: 8 },
  },
  currentSection: 1,
  totalScore: 8,
  totalPossible: 50,
  attemptSeed: 12345,
});

describe('extended homework reconciles stale progress against the live meta', () => {
  beforeEach(() => {
    useExtendedHomeworkStore.setState({ homeworks: { hw10: staleProgress() } });
  });

  it('backfills sections added after the student started', () => {
    const hw = useExtendedHomeworkStore.getState().ensureHomework('hw10');
    expect(Object.keys(hw.sections).map(Number).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(hw.sections[7].totalQuestions).toBe(8);
    expect(hw.sections[8].totalQuestions).toBe(8);
  });

  it('re-totals the homework so the progress denominator is current', () => {
    const hw = useExtendedHomeworkStore.getState().ensureHomework('hw10');
    expect(hw.totalPossible).toBe(hw10Meta.totalQuestions);
    expect(useExtendedHomeworkStore.getState().getOverallProgress('hw10').total).toBe(66);
  });

  it('preserves work already done', () => {
    const hw = useExtendedHomeworkStore.getState().ensureHomework('hw10');
    expect(hw.sections[1].status).toBe('completed');
    expect(hw.sections[1].score).toBe(8);
    expect(hw.attemptSeed).toBe(12345);
  });

  it('does not call a homework complete while a new section is unfinished', () => {
    useExtendedHomeworkStore.getState().ensureHomework('hw10');
    expect(useExtendedHomeworkStore.getState().isHomeworkComplete('hw10')).toBe(false);
  });

  it('lets a backfilled section actually start', () => {
    useExtendedHomeworkStore.getState().ensureHomework('hw10');
    useExtendedHomeworkStore.getState().startSection('hw10', 7);
    expect(useExtendedHomeworkStore.getState().getSection('hw10', 7)?.status).toBe('in_progress');
  });
});

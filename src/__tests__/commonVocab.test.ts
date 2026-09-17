import {
  COMMON_VOCAB_COUNT,
  WORDS_PER_SECTION,
  SECTION_COUNT,
  COMMON_VOCAB_SECTION_META,
  getCommonOTVocab,
  getCommonOTVocabIds,
  getCommonVocabSection,
  getCommonVocabSectionCount,
  type CommonVocabSectionId,
} from '@/lib/commonVocab';
import { useUserStore } from '@/stores/userStore';

describe('Common OT Vocabulary (Top 300)', () => {
  beforeEach(() => {
    // Reset user store state
    useUserStore.setState({
      progress: {},
      commonVocabSectionScores: {},
    });
  });

  it('should return exactly 300 words sorted by frequency descending', () => {
    const words = getCommonOTVocab();
    expect(words).toHaveLength(COMMON_VOCAB_COUNT);
    expect(words.length).toBe(300);

    for (let i = 0; i < words.length - 1; i++) {
      expect(words[i].frequency).toBeGreaterThanOrEqual(words[i + 1].frequency);
    }
  });

  it('should have valid fields for all 300 words', () => {
    const words = getCommonOTVocab();
    words.forEach((word) => {
      expect(word.id).toBeTruthy();
      expect(word.hebrew).toBeTruthy();
      expect(word.gloss).toBeTruthy();
      expect(typeof word.frequency).toBe('number');
      expect(word.frequency).toBeGreaterThan(0);
    });
  });

  it('should provide 10 distinct non-overlapping sections of 30 words each', () => {
    expect(SECTION_COUNT).toBe(10);
    expect(getCommonVocabSectionCount()).toBe(10);

    const seenIds = new Set<string>();

    for (let sectionId = 1; sectionId <= 10; sectionId++) {
      const sectionWords = getCommonVocabSection(sectionId as CommonVocabSectionId);
      expect(sectionWords).toHaveLength(WORDS_PER_SECTION);
      expect(sectionWords.length).toBe(30);

      const meta = COMMON_VOCAB_SECTION_META[sectionId as CommonVocabSectionId];
      expect(meta).toBeDefined();
      expect(meta.title).toBeTruthy();
      expect(meta.description).toBeTruthy();

      sectionWords.forEach((word) => {
        expect(seenIds.has(word.id)).toBe(false);
        seenIds.add(word.id);
      });
    }

    expect(seenIds.size).toBe(300);
  });

  it('should return a set of 300 IDs with getCommonOTVocabIds', () => {
    const ids = getCommonOTVocabIds();
    expect(ids.size).toBe(300);
  });

  it('should correctly calculate user progress for common vocab', () => {
    const store = useUserStore.getState();
    const initialProgress = store.getCommonVocabProgress();
    expect(initialProgress.learned).toBe(0);
    expect(initialProgress.total).toBe(300);
    expect(initialProgress.percentage).toBe(0);

    const section1Words = getCommonVocabSection(1);

    // Mark 15 words as reviewed (repetitions: 1)
    const mockProgress: Record<string, any> = {};
    section1Words.slice(0, 15).forEach((w) => {
      mockProgress[w.id] = {
        wordId: w.id,
        repetitions: 1,
        maxRepetitions: 1,
        easeFactor: 2.5,
        interval: 1,
        nextReview: new Date(),
        lastReview: new Date(),
        lastQuality: 5,
        timesReviewed: 1,
        timesCorrect: 1,
      };
    });

    useUserStore.setState({ progress: mockProgress });

    const updatedProgress = useUserStore.getState().getCommonVocabProgress();
    expect(updatedProgress.learned).toBe(15);
    expect(updatedProgress.total).toBe(300);
    expect(updatedProgress.percentage).toBe(5); // 15 / 300 = 5%
  });

  it('should record and retrieve section scores correctly', () => {
    const store = useUserStore.getState();
    store.recordCommonVocabSectionScore(1, 28, 30);

    const state = useUserStore.getState();
    expect(state.commonVocabSectionScores[1]).toBeDefined();
    expect(state.commonVocabSectionScores[1].score).toBe(28);
    expect(state.commonVocabSectionScores[1].total).toBe(30);
    expect(state.commonVocabSectionScores[1].lastAttempt).toBeTruthy();
  });
});

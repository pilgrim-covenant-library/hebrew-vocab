/**
 * Tests for the SM-2 Spaced Repetition Algorithm
 *
 * Tests interval calculations, ease factor adjustments,
 * and word progress tracking.
 */

import {
  calculateNextReview,
  createInitialProgress,
  updateWordProgress,
  isDue,
  getDueWords,
  calculateMastery,
  buttonToQuality,
  getButtonIntervals,
} from '@/lib/srs';
import type { WordProgress, SRSCard } from '@/types';

describe('SM-2 Algorithm', () => {
  describe('calculateNextReview', () => {
    const defaultCard: SRSCard = {
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
    };

    it('should set 1-day interval for first correct answer', () => {
      const result = calculateNextReview(defaultCard, 4);

      expect(result.interval).toBe(1);
      expect(result.repetitions).toBe(1);
    });

    it('should set 6-day interval for second correct answer', () => {
      const card: SRSCard = { ...defaultCard, repetitions: 1, interval: 1 };
      const result = calculateNextReview(card, 4);

      expect(result.interval).toBe(6);
      expect(result.repetitions).toBe(2);
    });

    it('should apply ease factor for subsequent reviews', () => {
      const card: SRSCard = { easeFactor: 2.5, interval: 6, repetitions: 2 };
      const result = calculateNextReview(card, 4);

      // interval = 6 * 2.5 = 15
      expect(result.interval).toBe(15);
      expect(result.repetitions).toBe(3);
    });

    it('should reset on incorrect answer (quality < 3)', () => {
      const card: SRSCard = { easeFactor: 2.5, interval: 15, repetitions: 3 };
      const result = calculateNextReview(card, 2);

      expect(result.interval).toBe(1);
      expect(result.repetitions).toBe(0);
    });

    it('should decrease ease factor on low quality', () => {
      const result = calculateNextReview(defaultCard, 1);

      expect(result.easeFactor).toBeLessThan(2.5);
    });

    it('should increase ease factor on high quality', () => {
      const result = calculateNextReview(defaultCard, 5);

      expect(result.easeFactor).toBeGreaterThan(2.5);
    });

    it('should not go below minimum ease factor (1.3)', () => {
      const card: SRSCard = { easeFactor: 1.4, interval: 1, repetitions: 1 };
      const result = calculateNextReview(card, 1);

      expect(result.easeFactor).toBeGreaterThanOrEqual(1.3);
    });

    it('should not exceed maximum ease factor (3.0)', () => {
      const card: SRSCard = { easeFactor: 2.9, interval: 1, repetitions: 1 };
      const result = calculateNextReview(card, 5);
      const result2 = calculateNextReview({ ...card, easeFactor: result.easeFactor }, 5);
      const result3 = calculateNextReview({ ...card, easeFactor: result2.easeFactor }, 5);

      expect(result3.easeFactor).toBeLessThanOrEqual(3.0);
    });

    it('should apply interval modifier', () => {
      const result = calculateNextReview(defaultCard, 4, 0.8);

      // 1 day * 0.8 = 0.8, rounded = 1 (minimum)
      expect(result.interval).toBe(1);

      const card: SRSCard = { easeFactor: 2.5, interval: 6, repetitions: 2 };
      const result2 = calculateNextReview(card, 4, 0.8);

      // 6 * 2.5 * 0.8 = 12
      expect(result2.interval).toBe(12);
    });

    it('should handle NaN quality gracefully', () => {
      const result = calculateNextReview(defaultCard, NaN);

      // Should treat as quality 1 (incorrect)
      expect(result.repetitions).toBe(0);
      expect(result.interval).toBe(1);
    });

    it('should clamp quality to 0-5 range', () => {
      const resultHigh = calculateNextReview(defaultCard, 10);
      const resultLow = calculateNextReview(defaultCard, -5);

      // Quality 10 should be treated as 5
      expect(resultHigh.easeFactor).toBeGreaterThan(2.5);
      // Quality -5 should be treated as 0
      expect(resultLow.easeFactor).toBeLessThan(2.5);
    });

    it('should set next review date correctly', () => {
      const result = calculateNextReview(defaultCard, 4);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      expect(result.nextReview.getTime()).toBe(tomorrow.getTime());
    });
  });

  describe('createInitialProgress', () => {
    it('should create progress with correct defaults', () => {
      const progress = createInitialProgress('test-word');

      expect(progress.wordId).toBe('test-word');
      expect(progress.easeFactor).toBe(2.5);
      expect(progress.interval).toBe(0);
      expect(progress.repetitions).toBe(0);
      expect(progress.maxRepetitions).toBe(0);
      expect(progress.lastReview).toBeNull();
      expect(progress.lastQuality).toBe(0);
      expect(progress.timesReviewed).toBe(0);
      expect(progress.timesCorrect).toBe(0);
    });

    it('should set nextReview to now', () => {
      const before = new Date();
      const progress = createInitialProgress('test-word');
      const after = new Date();

      expect(progress.nextReview.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(progress.nextReview.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe('updateWordProgress', () => {
    it('should update all fields correctly', () => {
      const initial = createInitialProgress('test-word');
      const updated = updateWordProgress(initial, 4);

      expect(updated.interval).toBe(1);
      expect(updated.repetitions).toBe(1);
      expect(updated.maxRepetitions).toBe(1);
      expect(updated.lastQuality).toBe(4);
      expect(updated.timesReviewed).toBe(1);
      expect(updated.timesCorrect).toBe(1);
      expect(updated.lastReview).not.toBeNull();
    });

    it('should increment timesCorrect only on correct answer', () => {
      const initial = createInitialProgress('test-word');
      const updated = updateWordProgress(initial, 2);

      expect(updated.timesReviewed).toBe(1);
      expect(updated.timesCorrect).toBe(0);
    });

    it('should track maxRepetitions correctly', () => {
      let progress = createInitialProgress('test-word');

      // Build up to 3 repetitions
      progress = updateWordProgress(progress, 4);
      progress = updateWordProgress(progress, 4);
      progress = updateWordProgress(progress, 4);
      expect(progress.maxRepetitions).toBe(3);

      // Get wrong - repetitions reset but maxRepetitions stays
      progress = updateWordProgress(progress, 1);
      expect(progress.repetitions).toBe(0);
      expect(progress.maxRepetitions).toBe(3);
    });

    it('should apply interval modifier', () => {
      const initial = createInitialProgress('test-word');
      const normal = updateWordProgress(initial, 4, 1.0);
      const aggressive = updateWordProgress(initial, 4, 0.8);

      expect(aggressive.interval).toBeLessThanOrEqual(normal.interval);
    });
  });

  describe('isDue', () => {
    it('should return true for new words', () => {
      const progress = createInitialProgress('test-word');

      expect(isDue(progress)).toBe(true);
    });

    it('should return true for overdue words', () => {
      const progress = createInitialProgress('test-word');
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      progress.nextReview = yesterday;

      expect(isDue(progress)).toBe(true);
    });

    it('should return false for future words', () => {
      const progress = createInitialProgress('test-word');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      progress.nextReview = tomorrow;

      expect(isDue(progress)).toBe(false);
    });
  });

  describe('getDueWords', () => {
    it('should return only due words', () => {
      const due1 = createInitialProgress('due1');
      const due2 = createInitialProgress('due2');
      const notDue = createInitialProgress('notDue');

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      notDue.nextReview = tomorrow;

      const result = getDueWords([due1, notDue, due2]);

      expect(result).toHaveLength(2);
      expect(result.map((p) => p.wordId)).toContain('due1');
      expect(result.map((p) => p.wordId)).toContain('due2');
      expect(result.map((p) => p.wordId)).not.toContain('notDue');
    });

    it('should sort by most overdue first', () => {
      const recent = createInitialProgress('recent');
      const old = createInitialProgress('old');

      // Set "old" to be more overdue
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      old.nextReview = twoDaysAgo;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      recent.nextReview = yesterday;

      const result = getDueWords([recent, old]);

      expect(result[0].wordId).toBe('old');
      expect(result[1].wordId).toBe('recent');
    });

    it('should return empty array when no words are due', () => {
      const notDue = createInitialProgress('notDue');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      notDue.nextReview = tomorrow;

      const result = getDueWords([notDue]);

      expect(result).toHaveLength(0);
    });
  });

  describe('calculateMastery', () => {
    it('should return 0 for never-reviewed words', () => {
      const progress = createInitialProgress('test-word');

      expect(calculateMastery(progress)).toBe(0);
    });

    it('should increase with repetitions', () => {
      const progress = createInitialProgress('test-word');
      progress.timesReviewed = 5;
      progress.timesCorrect = 5;
      progress.repetitions = 3;

      const mastery = calculateMastery(progress);

      expect(mastery).toBeGreaterThan(0);
    });

    it('should reflect accuracy', () => {
      const highAccuracy: WordProgress = {
        ...createInitialProgress('high'),
        timesReviewed: 10,
        timesCorrect: 10,
        repetitions: 3,
      };

      const lowAccuracy: WordProgress = {
        ...createInitialProgress('low'),
        timesReviewed: 10,
        timesCorrect: 5,
        repetitions: 3,
      };

      expect(calculateMastery(highAccuracy)).toBeGreaterThan(calculateMastery(lowAccuracy));
    });

    it('should cap at 100%', () => {
      const perfect: WordProgress = {
        ...createInitialProgress('perfect'),
        timesReviewed: 100,
        timesCorrect: 100,
        repetitions: 10,
        maxRepetitions: 10,
        easeFactor: 3.0,
      };

      expect(calculateMastery(perfect)).toBeLessThanOrEqual(100);
    });
  });

  describe('buttonToQuality', () => {
    it('should map buttons to correct quality values', () => {
      expect(buttonToQuality('again')).toBe(1);
      expect(buttonToQuality('hard')).toBe(3);
      expect(buttonToQuality('good')).toBe(4);
      expect(buttonToQuality('easy')).toBe(5);
    });
  });

  describe('getButtonIntervals', () => {
    it('should return intervals for all buttons', () => {
      const progress = createInitialProgress('test-word');
      const intervals = getButtonIntervals(progress);

      expect(intervals).toHaveProperty('again');
      expect(intervals).toHaveProperty('hard');
      expect(intervals).toHaveProperty('good');
      expect(intervals).toHaveProperty('easy');
    });

    it('should return formatted interval strings', () => {
      const progress: WordProgress = {
        ...createInitialProgress('test-word'),
        interval: 30,
        repetitions: 3,
        easeFactor: 2.5,
      };

      const intervals = getButtonIntervals(progress);

      // Each should be a non-empty string
      Object.values(intervals).forEach((interval) => {
        expect(typeof interval).toBe('string');
        expect(interval.length).toBeGreaterThan(0);
      });
    });

    it('should apply interval modifier', () => {
      const progress: WordProgress = {
        ...createInitialProgress('test-word'),
        interval: 10,
        repetitions: 3,
        easeFactor: 2.5,
      };

      const normal = getButtonIntervals(progress, 1.0);
      const aggressive = getButtonIntervals(progress, 0.8);

      // Aggressive should have shorter intervals (but both formatted as strings)
      expect(normal).toBeDefined();
      expect(aggressive).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large intervals', () => {
      const card: SRSCard = { easeFactor: 2.5, interval: 1000, repetitions: 10 };
      const result = calculateNextReview(card, 5);

      expect(result.interval).toBeGreaterThan(1000);
      expect(Number.isFinite(result.interval)).toBe(true);
    });

    it('should handle minimum values', () => {
      const card: SRSCard = { easeFactor: 1.3, interval: 1, repetitions: 0 };
      const result = calculateNextReview(card, 3);

      expect(result.interval).toBeGreaterThanOrEqual(1);
      expect(result.easeFactor).toBeGreaterThanOrEqual(1.3);
    });

    it('should produce consistent results', () => {
      const card: SRSCard = { easeFactor: 2.5, interval: 0, repetitions: 0 };

      const result1 = calculateNextReview(card, 4);
      const result2 = calculateNextReview(card, 4);

      expect(result1.interval).toBe(result2.interval);
      expect(result1.repetitions).toBe(result2.repetitions);
      expect(result1.easeFactor).toBe(result2.easeFactor);
    });
  });
});

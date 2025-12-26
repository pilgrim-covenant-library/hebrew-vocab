/**
 * Tests for Data Validation and Sanitization
 *
 * Tests data integrity, corruption repair, and migration
 * for localStorage persistence.
 */

import {
  sanitizeWordProgress,
  sanitizeProgress,
  sanitizeUserStats,
  sanitizeStudyHistory,
  needsDataMigration,
  migrateLastReviewDate,
} from '@/lib/dataValidation';
import type { WordProgress, UserStats } from '@/types';

describe('Data Validation', () => {
  describe('sanitizeWordProgress', () => {
    const validProgress: WordProgress = {
      wordId: 'test-word',
      easeFactor: 2.5,
      interval: 10,
      repetitions: 3,
      maxRepetitions: 3,
      nextReview: new Date(),
      lastReview: new Date(),
      lastQuality: 4,
      timesReviewed: 10,
      timesCorrect: 8,
    };

    it('should return valid progress unchanged', () => {
      const result = sanitizeWordProgress(validProgress);

      expect(result.easeFactor).toBe(2.5);
      expect(result.interval).toBe(10);
      expect(result.repetitions).toBe(3);
    });

    it('should clamp easeFactor to valid range', () => {
      const tooLow: WordProgress = { ...validProgress, easeFactor: 0.5 };
      const tooHigh: WordProgress = { ...validProgress, easeFactor: 5.0 };

      expect(sanitizeWordProgress(tooLow).easeFactor).toBe(1.3);
      expect(sanitizeWordProgress(tooHigh).easeFactor).toBe(3.0);
    });

    it('should fix negative values', () => {
      const negative: WordProgress = {
        ...validProgress,
        interval: -5,
        repetitions: -2,
        timesReviewed: -10,
        timesCorrect: -5,
      };

      const result = sanitizeWordProgress(negative);

      expect(result.interval).toBe(0);
      expect(result.repetitions).toBe(0);
      expect(result.timesReviewed).toBe(0);
      expect(result.timesCorrect).toBe(0);
    });

    it('should cap timesCorrect at timesReviewed', () => {
      const corrupted: WordProgress = {
        ...validProgress,
        timesReviewed: 5,
        timesCorrect: 10,
      };

      const result = sanitizeWordProgress(corrupted);

      expect(result.timesCorrect).toBe(5);
    });

    it('should clamp lastQuality to 0-5', () => {
      const tooLow: WordProgress = { ...validProgress, lastQuality: -1 };
      const tooHigh: WordProgress = { ...validProgress, lastQuality: 10 };

      expect(sanitizeWordProgress(tooLow).lastQuality).toBe(0);
      expect(sanitizeWordProgress(tooHigh).lastQuality).toBe(5);
    });

    it('should handle undefined values', () => {
      const partial = {
        wordId: 'test',
      } as WordProgress;

      const result = sanitizeWordProgress(partial);

      expect(result.easeFactor).toBe(2.5);
      expect(result.interval).toBe(0);
      expect(result.repetitions).toBe(0);
    });

    it('should convert date strings to Date objects', () => {
      const withStrings = {
        ...validProgress,
        nextReview: '2024-01-15T00:00:00.000Z' as unknown as Date,
        lastReview: '2024-01-14T00:00:00.000Z' as unknown as Date,
      };

      const result = sanitizeWordProgress(withStrings);

      expect(result.nextReview).toBeInstanceOf(Date);
      expect(result.lastReview).toBeInstanceOf(Date);
    });

    it('should preserve null lastReview', () => {
      const noLastReview: WordProgress = {
        ...validProgress,
        lastReview: null,
      };

      const result = sanitizeWordProgress(noLastReview);

      expect(result.lastReview).toBeNull();
    });

    it('should fix maxRepetitions based on repetitions', () => {
      const missing: WordProgress = {
        ...validProgress,
        repetitions: 5,
        maxRepetitions: undefined as unknown as number,
      };

      const result = sanitizeWordProgress(missing);

      expect(result.maxRepetitions).toBe(5);
    });
  });

  describe('sanitizeProgress', () => {
    it('should sanitize all entries', () => {
      const progress: Record<string, WordProgress> = {
        word1: {
          wordId: 'word1',
          easeFactor: 0.5, // Invalid
          interval: 10,
          repetitions: 3,
          maxRepetitions: 3,
          nextReview: new Date(),
          lastReview: null,
          lastQuality: 4,
          timesReviewed: 10,
          timesCorrect: 12, // Invalid
        },
        word2: {
          wordId: 'word2',
          easeFactor: 2.5,
          interval: -5, // Invalid
          repetitions: 2,
          maxRepetitions: 2,
          nextReview: new Date(),
          lastReview: null,
          lastQuality: 3,
          timesReviewed: 5,
          timesCorrect: 3,
        },
      };

      const result = sanitizeProgress(progress);

      expect(result.word1.easeFactor).toBe(1.3);
      expect(result.word1.timesCorrect).toBe(10);
      expect(result.word2.interval).toBe(0);
    });

    it('should skip entries with invalid wordIds', () => {
      const progress = {
        validWord: {
          wordId: 'validWord',
          easeFactor: 2.5,
          interval: 5,
          repetitions: 2,
          maxRepetitions: 2,
          nextReview: new Date(),
          lastReview: null,
          lastQuality: 4,
          timesReviewed: 3,
          timesCorrect: 2,
        },
        '': {
          wordId: '',
          easeFactor: 2.5,
          interval: 5,
          repetitions: 2,
          maxRepetitions: 2,
          nextReview: new Date(),
          lastReview: null,
          lastQuality: 4,
          timesReviewed: 3,
          timesCorrect: 2,
        },
      } as Record<string, WordProgress>;

      const result = sanitizeProgress(progress);

      expect(Object.keys(result)).toEqual(['validWord']);
    });

    it('should return empty object for empty input', () => {
      const result = sanitizeProgress({});

      expect(result).toEqual({});
    });
  });

  describe('sanitizeUserStats', () => {
    const validStats: UserStats = {
      xp: 1000,
      level: 5,
      streak: 10,
      longestStreak: 15,
      lastStudyDate: new Date(),
      achievements: ['first_review', 'week_streak'],
      wordsLearned: 100,
      wordsInProgress: 50,
      totalReviews: 500,
      correctReviews: 400,
    };

    it('should return valid stats unchanged', () => {
      const result = sanitizeUserStats(validStats);

      expect(result.xp).toBe(1000);
      expect(result.level).toBe(5);
      expect(result.streak).toBe(10);
    });

    it('should fix negative values', () => {
      const negative: UserStats = {
        ...validStats,
        xp: -100,
        streak: -5,
        wordsLearned: -10,
      };

      const result = sanitizeUserStats(negative);

      expect(result.xp).toBe(0);
      expect(result.streak).toBe(0);
      expect(result.wordsLearned).toBe(0);
    });

    it('should ensure level is at least 1', () => {
      const zeroLevel: UserStats = { ...validStats, level: 0 };

      expect(sanitizeUserStats(zeroLevel).level).toBe(1);
    });

    it('should cap correctReviews at totalReviews', () => {
      const corrupted: UserStats = {
        ...validStats,
        totalReviews: 100,
        correctReviews: 200,
      };

      const result = sanitizeUserStats(corrupted);

      expect(result.correctReviews).toBe(100);
    });

    it('should ensure longestStreak >= streak', () => {
      const inconsistent: UserStats = {
        ...validStats,
        streak: 20,
        longestStreak: 10,
      };

      const result = sanitizeUserStats(inconsistent);

      expect(result.longestStreak).toBe(20);
    });

    it('should handle non-array achievements', () => {
      const badAchievements = {
        ...validStats,
        achievements: 'not-an-array' as unknown as string[],
      };

      const result = sanitizeUserStats(badAchievements);

      expect(Array.isArray(result.achievements)).toBe(true);
      expect(result.achievements).toEqual([]);
    });

    it('should convert date strings to Date objects', () => {
      const withString = {
        ...validStats,
        lastStudyDate: '2024-01-15T00:00:00.000Z' as unknown as Date,
      };

      const result = sanitizeUserStats(withString);

      expect(result.lastStudyDate).toBeInstanceOf(Date);
    });

    it('should preserve null lastStudyDate', () => {
      const noDate: UserStats = {
        ...validStats,
        lastStudyDate: null,
      };

      const result = sanitizeUserStats(noDate);

      expect(result.lastStudyDate).toBeNull();
    });
  });

  describe('sanitizeStudyHistory', () => {
    it('should sanitize valid entries', () => {
      const history = {
        '2024-01-15': { reviews: 20, wordsLearned: 5 },
        '2024-01-16': { reviews: 15, wordsLearned: 3 },
      };

      const result = sanitizeStudyHistory(history);

      expect(result['2024-01-15']).toEqual({ reviews: 20, wordsLearned: 5 });
      expect(result['2024-01-16']).toEqual({ reviews: 15, wordsLearned: 3 });
    });

    it('should skip entries with invalid date format', () => {
      const history = {
        '2024-01-15': { reviews: 20, wordsLearned: 5 },
        'Jan 15 2024': { reviews: 15, wordsLearned: 3 }, // Invalid format
        '15-01-2024': { reviews: 10, wordsLearned: 2 }, // Invalid format
      };

      const result = sanitizeStudyHistory(history);

      expect(Object.keys(result)).toEqual(['2024-01-15']);
    });

    it('should fix negative values', () => {
      const history = {
        '2024-01-15': { reviews: -5, wordsLearned: -2 },
      };

      const result = sanitizeStudyHistory(history);

      expect(result['2024-01-15']).toEqual({ reviews: 0, wordsLearned: 0 });
    });

    it('should handle undefined values', () => {
      const history = {
        '2024-01-15': { reviews: undefined, wordsLearned: undefined },
      } as Record<string, { reviews: number; wordsLearned: number }>;

      const result = sanitizeStudyHistory(history);

      expect(result['2024-01-15']).toEqual({ reviews: 0, wordsLearned: 0 });
    });

    it('should return empty object for empty input', () => {
      const result = sanitizeStudyHistory({});

      expect(result).toEqual({});
    });
  });

  describe('needsDataMigration', () => {
    it('should return false for valid data', () => {
      const data = {
        state: {
          lastReviewDate: '2024-01-15',
          progress: {
            word1: {
              easeFactor: 2.5,
              timesReviewed: 10,
              timesCorrect: 8,
              repetitions: 3,
              interval: 5,
            },
          },
        },
      };

      expect(needsDataMigration(data)).toBe(false);
    });

    it('should detect old date format', () => {
      const data = {
        state: {
          lastReviewDate: 'Mon Jan 15 2024', // Old format
        },
      };

      expect(needsDataMigration(data)).toBe(true);
    });

    it('should detect corrupted progress (timesCorrect > timesReviewed)', () => {
      const data = {
        state: {
          progress: {
            word1: {
              timesReviewed: 5,
              timesCorrect: 10,
              easeFactor: 2.5,
              repetitions: 2,
              interval: 3,
            },
          },
        },
      };

      expect(needsDataMigration(data)).toBe(true);
    });

    it('should detect out-of-range easeFactor', () => {
      const data = {
        state: {
          progress: {
            word1: {
              easeFactor: 0.5, // Too low
              timesReviewed: 10,
              timesCorrect: 8,
              repetitions: 2,
              interval: 3,
            },
          },
        },
      };

      expect(needsDataMigration(data)).toBe(true);
    });

    it('should detect negative values', () => {
      const data = {
        state: {
          progress: {
            word1: {
              easeFactor: 2.5,
              timesReviewed: 10,
              timesCorrect: 8,
              repetitions: -2, // Negative
              interval: 3,
            },
          },
        },
      };

      expect(needsDataMigration(data)).toBe(true);
    });

    it('should return false for null or non-object data', () => {
      expect(needsDataMigration(null)).toBe(false);
      expect(needsDataMigration(undefined)).toBe(false);
      expect(needsDataMigration('string')).toBe(false);
      expect(needsDataMigration(123)).toBe(false);
    });

    it('should return false for object without state', () => {
      expect(needsDataMigration({})).toBe(false);
      expect(needsDataMigration({ other: 'data' })).toBe(false);
    });
  });

  describe('migrateLastReviewDate', () => {
    it('should return null for null input', () => {
      expect(migrateLastReviewDate(null)).toBeNull();
    });

    it('should preserve valid ISO format', () => {
      expect(migrateLastReviewDate('2024-01-15')).toBe('2024-01-15');
    });

    it('should convert old toDateString format', () => {
      const result = migrateLastReviewDate('Mon Jan 15 2024');

      expect(result).toBe('2024-01-15');
    });

    it('should convert other parseable formats', () => {
      const result = migrateLastReviewDate('January 15, 2024');

      expect(result).toBe('2024-01-15');
    });

    it('should return null for unparseable dates', () => {
      expect(migrateLastReviewDate('not-a-date')).toBeNull();
      expect(migrateLastReviewDate('invalid')).toBeNull();
    });

    it('should handle ISO datetime strings', () => {
      const result = migrateLastReviewDate('2024-01-15T10:30:00.000Z');

      expect(result).toBe('2024-01-15');
    });
  });

  describe('Edge Cases', () => {
    it('should handle deeply nested undefined values', () => {
      const progress: WordProgress = {
        wordId: 'test',
        easeFactor: undefined as unknown as number,
        interval: undefined as unknown as number,
        repetitions: undefined as unknown as number,
        maxRepetitions: undefined as unknown as number,
        nextReview: undefined as unknown as Date,
        lastReview: undefined as unknown as Date,
        lastQuality: undefined as unknown as number,
        timesReviewed: undefined as unknown as number,
        timesCorrect: undefined as unknown as number,
      };

      const result = sanitizeWordProgress(progress);

      expect(result.easeFactor).toBe(2.5);
      expect(result.interval).toBe(0);
      expect(result.nextReview).toBeInstanceOf(Date);
    });

    it('should handle NaN values', () => {
      const progress: WordProgress = {
        wordId: 'test',
        easeFactor: NaN,
        interval: NaN,
        repetitions: NaN,
        maxRepetitions: NaN,
        nextReview: new Date(),
        lastReview: null,
        lastQuality: NaN,
        timesReviewed: NaN,
        timesCorrect: NaN,
      };

      const result = sanitizeWordProgress(progress);

      // NaN || 2.5 = 2.5, then clamped
      expect(result.easeFactor).toBe(2.5);
    });

    it('should handle Infinity values', () => {
      const progress: WordProgress = {
        wordId: 'test',
        easeFactor: Infinity,
        interval: Infinity,
        repetitions: Infinity,
        maxRepetitions: Infinity,
        nextReview: new Date(),
        lastReview: null,
        lastQuality: Infinity,
        timesReviewed: Infinity,
        timesCorrect: Infinity,
      };

      const result = sanitizeWordProgress(progress);

      // Infinity should be clamped to max
      expect(result.easeFactor).toBe(3.0);
      expect(result.lastQuality).toBe(5);
    });
  });
});

/**
 * Tests for the XP and Leveling System
 *
 * Tests level calculations, XP awards, streak tracking,
 * and multiplier logic.
 */

import {
  calculateLevel,
  getXPForNextLevel,
  getLevelProgress,
  awardXP,
  updateStreak,
  getStreakMultiplier,
  getLevelTitle,
  createInitialStats,
} from '@/lib/xp';
import { LEVEL_THRESHOLDS, XP_REWARDS, type UserStats } from '@/types';

describe('XP System', () => {
  describe('calculateLevel', () => {
    it('should return level 1 for 0 XP', () => {
      expect(calculateLevel(0)).toBe(1);
    });

    it('should return level 2 at 100 XP', () => {
      expect(calculateLevel(100)).toBe(2);
    });

    it('should return correct level at thresholds', () => {
      LEVEL_THRESHOLDS.forEach((threshold, index) => {
        const expectedLevel = index + 1;
        expect(calculateLevel(threshold)).toBe(expectedLevel);
      });
    });

    it('should return level 1 for negative XP', () => {
      expect(calculateLevel(-100)).toBe(1);
    });

    it('should handle very large XP values', () => {
      const maxLevel = LEVEL_THRESHOLDS.length;
      expect(calculateLevel(10000000)).toBe(maxLevel);
    });

    it('should handle XP between thresholds', () => {
      expect(calculateLevel(150)).toBe(2); // Between 100 (level 2) and 250 (level 3)
      expect(calculateLevel(300)).toBe(3); // Between 250 (level 3) and 500 (level 4)
    });
  });

  describe('getXPForNextLevel', () => {
    it('should return correct threshold for each level', () => {
      expect(getXPForNextLevel(1)).toBe(100);
      expect(getXPForNextLevel(2)).toBe(250);
      expect(getXPForNextLevel(3)).toBe(500);
    });

    it('should use exponential growth beyond defined thresholds', () => {
      const maxDefinedLevel = LEVEL_THRESHOLDS.length;
      const lastThreshold = LEVEL_THRESHOLDS[maxDefinedLevel - 1];

      const nextXP = getXPForNextLevel(maxDefinedLevel);

      expect(nextXP).toBeGreaterThan(lastThreshold);
    });

    it('should continue to increase for very high levels', () => {
      const level60 = getXPForNextLevel(60);
      const level70 = getXPForNextLevel(70);

      expect(level70).toBeGreaterThan(level60);
    });
  });

  describe('getLevelProgress', () => {
    it('should return 0% at level threshold', () => {
      expect(getLevelProgress(100)).toBe(0); // Just hit level 2
    });

    it('should return correct progress within level', () => {
      // Level 2 is 100-249 XP (150 XP range)
      // At 175 XP, progress should be (175-100)/(250-100) = 75/150 = 50%
      expect(getLevelProgress(175)).toBe(50);
    });

    it('should cap at 100%', () => {
      // Even with edge cases, should never exceed 100
      expect(getLevelProgress(10000000)).toBeLessThanOrEqual(100);
    });

    it('should return 0% for 0 XP', () => {
      expect(getLevelProgress(0)).toBe(0);
    });
  });

  describe('awardXP', () => {
    let initialStats: UserStats;

    beforeEach(() => {
      initialStats = createInitialStats();
    });

    it('should award correct XP for flashcard', () => {
      const result = awardXP(initialStats, 'correctFlashcard');

      expect(result.xpGained).toBe(XP_REWARDS.correctFlashcard);
      expect(result.newStats.xp).toBe(XP_REWARDS.correctFlashcard);
    });

    it('should award correct XP for quiz', () => {
      const result = awardXP(initialStats, 'correctQuiz');

      expect(result.xpGained).toBe(XP_REWARDS.correctQuiz);
    });

    it('should award correct XP for new word learned', () => {
      const result = awardXP(initialStats, 'newWordLearned');

      expect(result.xpGained).toBe(XP_REWARDS.newWordLearned);
    });

    it('should apply multiplier', () => {
      const result = awardXP(initialStats, 'correctFlashcard', 2);

      expect(result.xpGained).toBe(XP_REWARDS.correctFlashcard * 2);
    });

    it('should detect level up', () => {
      // Start at 99 XP (still level 1), award 10 XP to reach 109 (level 2)
      const stats: UserStats = { ...initialStats, xp: 99, level: 1 };
      const result = awardXP(stats, 'correctFlashcard');

      expect(result.leveledUp).toBe(true);
      expect(result.newStats.level).toBe(2);
    });

    it('should not report level up when staying same level', () => {
      const result = awardXP(initialStats, 'correctFlashcard');

      expect(result.leveledUp).toBe(false);
    });

    it('should preserve other stats', () => {
      const stats: UserStats = {
        ...initialStats,
        achievements: ['test'],
        wordsLearned: 10,
      };

      const result = awardXP(stats, 'correctFlashcard');

      expect(result.newStats.achievements).toEqual(['test']);
      expect(result.newStats.wordsLearned).toBe(10);
    });

    it('should round XP when using multiplier', () => {
      const result = awardXP(initialStats, 'correctFlashcard', 1.5);

      expect(Number.isInteger(result.xpGained)).toBe(true);
    });
  });

  describe('updateStreak', () => {
    let initialStats: UserStats;

    beforeEach(() => {
      initialStats = createInitialStats();
    });

    it('should set streak to 1 for first session', () => {
      const result = updateStreak(initialStats);

      expect(result.streak).toBe(1);
      expect(result.longestStreak).toBe(1);
      expect(result.lastStudyDate).not.toBeNull();
    });

    it('should increment streak for consecutive day', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const stats: UserStats = {
        ...initialStats,
        streak: 5,
        longestStreak: 5,
        lastStudyDate: yesterday,
      };

      const result = updateStreak(stats);

      expect(result.streak).toBe(6);
      expect(result.longestStreak).toBe(6);
    });

    it('should reset streak after missing a day', () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      twoDaysAgo.setHours(0, 0, 0, 0);

      const stats: UserStats = {
        ...initialStats,
        streak: 10,
        longestStreak: 15,
        lastStudyDate: twoDaysAgo,
      };

      const result = updateStreak(stats);

      expect(result.streak).toBe(1);
      expect(result.longestStreak).toBe(15); // Should preserve longest
    });

    it('should not change stats if already studied today', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const stats: UserStats = {
        ...initialStats,
        streak: 5,
        longestStreak: 5,
        lastStudyDate: today,
      };

      const result = updateStreak(stats);

      expect(result.streak).toBe(5);
      expect(result).toBe(stats); // Same reference
    });

    it('should update longest streak when breaking record', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const stats: UserStats = {
        ...initialStats,
        streak: 10,
        longestStreak: 10,
        lastStudyDate: yesterday,
      };

      const result = updateStreak(stats);

      expect(result.streak).toBe(11);
      expect(result.longestStreak).toBe(11);
    });
  });

  describe('getStreakMultiplier', () => {
    it('should return 1x for streak of 0 or 1', () => {
      expect(getStreakMultiplier(0)).toBe(1);
      expect(getStreakMultiplier(1)).toBe(1);
    });

    it('should increase by 5% per day for first week', () => {
      expect(getStreakMultiplier(2)).toBeCloseTo(1.05, 2);
      expect(getStreakMultiplier(7)).toBeCloseTo(1.3, 2);
    });

    it('should increase by 2% per day up to 30 days', () => {
      expect(getStreakMultiplier(8)).toBeCloseTo(1.32, 2);
      expect(getStreakMultiplier(30)).toBeCloseTo(1.76, 2);
    });

    it('should cap at 2x', () => {
      expect(getStreakMultiplier(100)).toBe(2.0);
      expect(getStreakMultiplier(1000)).toBe(2.0);
    });

    it('should increase gradually after 30 days', () => {
      const day31 = getStreakMultiplier(31);
      const day32 = getStreakMultiplier(32);

      expect(day32).toBeGreaterThan(day31);
      expect(day32 - day31).toBeCloseTo(0.01, 2);
    });
  });

  describe('getLevelTitle', () => {
    it('should return Novice for levels 1-5', () => {
      expect(getLevelTitle(1)).toBe('Novice');
      expect(getLevelTitle(5)).toBe('Novice');
    });

    it('should return Student for levels 6-10', () => {
      expect(getLevelTitle(6)).toBe('Student');
      expect(getLevelTitle(10)).toBe('Student');
    });

    it('should return Scholar for levels 16-20', () => {
      expect(getLevelTitle(16)).toBe('Scholar');
      expect(getLevelTitle(20)).toBe('Scholar');
    });

    it('should return Master for levels 31-40', () => {
      expect(getLevelTitle(31)).toBe('Master');
      expect(getLevelTitle(40)).toBe('Master');
    });

    it('should return Grandmaster for levels above 50', () => {
      expect(getLevelTitle(51)).toBe('Grandmaster');
      expect(getLevelTitle(100)).toBe('Grandmaster');
    });

    it('should progress through all titles', () => {
      const titles = [
        getLevelTitle(1),
        getLevelTitle(6),
        getLevelTitle(11),
        getLevelTitle(16),
        getLevelTitle(21),
        getLevelTitle(26),
        getLevelTitle(31),
        getLevelTitle(41),
        getLevelTitle(51),
      ];

      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(9);
    });
  });

  describe('createInitialStats', () => {
    it('should create stats with all zero values', () => {
      const stats = createInitialStats();

      expect(stats.xp).toBe(0);
      expect(stats.level).toBe(1);
      expect(stats.streak).toBe(0);
      expect(stats.longestStreak).toBe(0);
      expect(stats.lastStudyDate).toBeNull();
      expect(stats.achievements).toEqual([]);
      expect(stats.wordsLearned).toBe(0);
      expect(stats.wordsInProgress).toBe(0);
      expect(stats.totalReviews).toBe(0);
      expect(stats.correctReviews).toBe(0);
    });

    it('should create independent objects', () => {
      const stats1 = createInitialStats();
      const stats2 = createInitialStats();

      stats1.xp = 100;
      stats1.achievements.push('test');

      expect(stats2.xp).toBe(0);
      expect(stats2.achievements).toEqual([]);
    });
  });

  describe('Integration Scenarios', () => {
    it('should correctly level up from grinding flashcards', () => {
      let stats = createInitialStats();

      // Do 10 flashcards (100 XP total)
      for (let i = 0; i < 10; i++) {
        const result = awardXP(stats, 'correctFlashcard');
        stats = result.newStats;
      }

      expect(stats.xp).toBe(100);
      expect(stats.level).toBe(2);
    });

    it('should correctly calculate XP with streak multiplier', () => {
      let stats: UserStats = {
        ...createInitialStats(),
        streak: 7,
      };

      const multiplier = getStreakMultiplier(7);
      const result = awardXP(stats, 'correctFlashcard', multiplier);

      expect(result.xpGained).toBe(Math.round(10 * 1.3)); // 10 XP * 1.3x
    });

    it('should track progress through multiple levels', () => {
      let stats = createInitialStats();

      // Award enough XP to reach level 5 (1000+ XP needed)
      // Level 5 threshold is 1000 XP
      for (let i = 0; i < 100; i++) {
        stats = awardXP(stats, 'correctFlashcard').newStats;
      }

      // 100 * 10 = 1000 XP = Level 5
      expect(stats.level).toBe(5);
    });
  });
});

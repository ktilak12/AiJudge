import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateAndNormalizeJudgement,
  evaluateDailyEntry,
  evaluateWeeklyReview
} from '../../../src/services/geminiService.js';

describe('Gemini AI Judicial Service Unit Tests', () => {
  it('should correctly normalize and clamp score boundaries to 0-100', () => {
    const raw = {
      overallScore: 50,
      categoryScores: {
        productivity: { score: 150, reason: 'Exceeded max' },
        discipline: { score: -20, reason: 'Below min' },
        health: { score: 80, reason: 'Good' },
        timeManagement: { score: 60, reason: 'Decent' },
        consistency: { score: 70, reason: 'Solid' }
      },
      verdict: 'Sample verdict'
    };

    const normalized = validateAndNormalizeJudgement(raw);
    assert.equal(normalized.categoryScores.productivity.score, 100);
    assert.equal(normalized.categoryScores.discipline.score, 0);
    assert.equal(normalized.categoryScores.health.score, 80);
    // Average of 100 + 0 + 80 + 60 + 70 = 310 / 5 = 62
    assert.equal(normalized.overallScore, 62);
    assert.equal(normalized.performanceLabel, 'Decent Progress');
  });

  it('should generate valid evaluation using deterministic reasoning engine', async () => {
    const entryData = {
      achievements: 'Wrote unit tests and deployed API',
      completedTasks: 'Fixed 4 bugs',
      postponedTasks: 'None',
      distractions: 'Checked email twice',
      workHours: 8,
      studyHours: 2,
      sleepHours: 8,
      exercise: 'Yes (5km jog)',
      mood: 'Good',
      judgePersonality: 'Strict Professor'
    };

    const result = await evaluateDailyEntry(entryData);
    assert.ok(result.overallScore >= 0 && result.overallScore <= 100);
    assert.ok(result.verdict.length > 10);
    assert.ok(result.improvements.length >= 1);
    assert.ok(result.tomorrowChallenge.length > 5);
  });

  it('should compute weekly review metrics from daily records', async () => {
    const mockJudgements = [
      {
        overallScore: 80,
        createdAt: new Date('2026-10-25'),
        performanceLabel: 'Strong Performance',
        summary: 'Day 1 good',
        categoryScores: { productivity: { score: 80 }, discipline: { score: 80 } }
      },
      {
        overallScore: 60,
        createdAt: new Date('2026-10-26'),
        performanceLabel: 'Decent Progress',
        summary: 'Day 2 average',
        categoryScores: { productivity: { score: 60 }, discipline: { score: 60 } }
      }
    ];

    const mockEntries = [
      { distractions: 'YouTube rabbit hole', postponedTasks: 'Drafting contract' },
      { distractions: 'Twitter feed', postponedTasks: 'Drafting contract' }
    ];

    const weekly = await evaluateWeeklyReview(mockJudgements, mockEntries);
    assert.equal(weekly.averageScore, 70);
    assert.equal(weekly.bestDay.score, 80);
    assert.equal(weekly.worstDay.score, 60);
    assert.ok(weekly.weeklyVerdict.length > 20);
    assert.equal(weekly.improvementPlan.length, 3);
  });
});

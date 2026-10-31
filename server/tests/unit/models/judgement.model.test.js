import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Judgement from '../../../src/models/Judgement.js';

let mongoServer;

describe('Judgement Model Unit Tests', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should accept valid structured judgement records', async () => {
    const dummyUserId = new mongoose.Types.ObjectId();
    const dummyEntryId = new mongoose.Types.ObjectId();

    const record = await Judgement.create({
      userId: dummyUserId,
      dailyEntryId: dummyEntryId,
      overallScore: 82,
      performanceLabel: 'Strong Performance',
      categoryScores: {
        productivity: { score: 85, reason: 'High task completion' },
        discipline: { score: 80, reason: 'Zero deviations' },
        health: { score: 90, reason: 'Solid 8h sleep' },
        timeManagement: { score: 75, reason: 'Minimal leaks' },
        consistency: { score: 80, reason: 'Consistent routine' }
      },
      verdict: 'Excellent execution today. Maintain standard.',
      biggestMistake: 'Slight delay starting morning sprint',
      bestAchievement: 'Completed backend architecture',
      improvements: ['Start by 8:30 AM', 'Hydrate more', 'Review backlog'],
      tomorrowChallenge: 'Execute top task before 10 AM',
      summary: 'Solid performance',
      confidence: 'high'
    });

    assert.equal(record.overallScore, 82);
    assert.equal(record.performanceLabel, 'Strong Performance');
    assert.equal(record.improvements.length, 3);
  });

  it('should reject invalid performance label enum values', async () => {
    const dummyUserId = new mongoose.Types.ObjectId();
    const dummyEntryId = new mongoose.Types.ObjectId();

    await assert.rejects(
      async () => {
        await Judgement.create({
          userId: dummyUserId,
          dailyEntryId: dummyEntryId,
          overallScore: 50,
          performanceLabel: 'Invalid Fake Label',
          verdict: 'Invalid',
          biggestMistake: 'None',
          bestAchievement: 'None',
          improvements: ['Test'],
          tomorrowChallenge: 'Test',
          summary: 'Test'
        });
      },
      /is not a valid enum value/
    );
  });
});

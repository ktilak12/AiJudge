import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import DailyEntry from '../../../src/models/DailyEntry.js';

let mongoServer;

describe('DailyEntry Model Unit Tests', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should initialize entry with correct defaults', async () => {
    const dummyUserId = new mongoose.Types.ObjectId();
    const entry = await DailyEntry.create({
      userId: dummyUserId,
      achievements: 'Launched MVP'
    });

    assert.equal(entry.workHours, 0);
    assert.equal(entry.studyHours, 0);
    assert.equal(entry.sleepHours, 7);
    assert.equal(entry.mood, 'Average');
    assert.equal(entry.judgePersonality, 'Savage but Fair');
  });

  it('should accept all supported judge personalities', async () => {
    const dummyUserId = new mongoose.Types.ObjectId();
    const personas = ['Savage but Fair', 'Strict Professor', 'Supportive Mentor', 'Sarcastic Comedian'];

    for (const p of personas) {
      const entry = await DailyEntry.create({
        userId: dummyUserId,
        judgePersonality: p
      });
      assert.equal(entry.judgePersonality, p);
    }
  });
});

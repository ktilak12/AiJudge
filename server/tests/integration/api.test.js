process.env.NODE_ENV = 'test';
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { disconnectDB } from '../../src/config/db.js';
import app from '../../src/index.js';

describe('Full End-to-End REST API Integration Tests', () => {
  let authToken = '';
  let createdJudgementId = '';

  const testUser = {
    name: 'Integration Test Defendant',
    email: `integration_${Date.now()}@lifejudge.ai`,
    password: 'securetestpass123'
  };

  it('POST /api/auth/register - should register user and return JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.token);
    assert.equal(res.body.user.email, testUser.email.toLowerCase());
    authToken = res.body.token;
  });

  it('POST /api/auth/login - should authenticate with registered credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.token);
  });

  it('GET /api/auth/me - should return authenticated user profile', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${authToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.user.name, testUser.name);
  });

  it('POST /api/judge - should accept testimony and generate AI verdict', async () => {
    const testimony = {
      achievements: 'Implemented comprehensive test suite and CI pipeline',
      completedTasks: '8 pull requests completed and verified',
      postponedTasks: 'None',
      distractions: 'Minor check of notifications',
      workHours: 7,
      studyHours: 2,
      sleepHours: 8,
      exercise: 'Yes (40m weightlifting)',
      mood: 'Good',
      biggestMistake: 'Late lunch',
      tomorrowPlan: 'Verify staging deployment',
      judgePersonality: 'Savage but Fair'
    };

    const res = await request(app)
      .post('/api/judge')
      .set('Authorization', `Bearer ${authToken}`)
      .send(testimony);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.judgement);
    assert.ok(res.body.data.judgement.overallScore >= 0);
    assert.ok(res.body.data.judgement.verdict);
    createdJudgementId = res.body.data.judgement._id;
  });

  it('GET /api/judge/history - should retrieve user judgement archive', async () => {
    const res = await request(app)
      .get('/api/judge/history')
      .set('Authorization', `Bearer ${authToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.length >= 1);
  });

  it('GET /api/judge/stats/dashboard - should calculate updated court metrics', async () => {
    const res = await request(app)
      .get('/api/judge/stats/dashboard')
      .set('Authorization', `Bearer ${authToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.data.hasData, true);
    assert.ok(res.body.data.totalEvaluations >= 1);
  });

  it('POST /api/weekly-review - should synthesize 7-day cumulative audit', async () => {
    const res = await request(app)
      .post('/api/weekly-review')
      .set('Authorization', `Bearer ${authToken}`);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.averageScore >= 0);
    assert.ok(res.body.data.weeklyVerdict);
  });

  after(async () => {
    await disconnectDB();
  });
});

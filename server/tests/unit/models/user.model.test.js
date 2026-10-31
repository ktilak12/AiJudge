import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../src/models/User.js';

let mongoServer;

describe('User Model Unit Tests', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should hash the password before saving', async () => {
    const user = await User.create({
      name: 'Test Defendant',
      email: 'test@lifejudge.ai',
      password: 'plainpassword123'
    });

    assert.notEqual(user.password, 'plainpassword123');
    assert.ok(user.password.startsWith('$2'));
  });

  it('should accurately verify correct password and reject incorrect', async () => {
    const user = await User.findOne({ email: 'test@lifejudge.ai' }).select('+password');
    const valid = await user.matchPassword('plainpassword123');
    const invalid = await user.matchPassword('wrongpassword');

    assert.equal(valid, true);
    assert.equal(invalid, false);
  });

  it('should enforce required name and email', async () => {
    await assert.rejects(
      async () => {
        await User.create({ email: 'noname@lifejudge.ai' });
      },
      /Please provide your full name/
    );
  });
});

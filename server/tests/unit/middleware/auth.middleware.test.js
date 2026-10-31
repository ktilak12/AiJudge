import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { protect } from '../../../src/middleware/auth.js';
import User from '../../../src/models/User.js';

let mongoServer;

describe('Auth Middleware Unit Tests', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should return 401 when Authorization header is absent', async () => {
    let statusCode = 0;
    let jsonResponse = null;

    const req = { headers: {} };
    const res = {
      status: (code) => {
        statusCode = code;
        return {
          json: (data) => {
            jsonResponse = data;
          }
        };
      }
    };
    const next = () => {};

    await protect(req, res, next);
    assert.equal(statusCode, 401);
    assert.equal(jsonResponse.success, false);
  });

  it('should accept valid JWT token and attach user to req.user', async () => {
    const user = await User.create({
      name: 'Auth Middleware User',
      email: 'authmw@lifejudge.ai',
      password: 'password123'
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'super_secret_life_judge_jwt_key_9847129841249'
    );

    let nextCalled = false;
    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    const res = {};
    const next = () => {
      nextCalled = true;
    };

    await protect(req, res, next);
    assert.equal(nextCalled, true);
    assert.equal(req.user._id.toString(), user._id.toString());
  });
});

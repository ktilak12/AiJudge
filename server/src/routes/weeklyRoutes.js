import express from 'express';
import { generateWeeklyReview, getWeeklyReviews } from '../controllers/weeklyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(generateWeeklyReview)
  .get(getWeeklyReviews);

export default router;


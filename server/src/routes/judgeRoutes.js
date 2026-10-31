import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  judgeDay,
  getHistory,
  getJudgementById,
  deleteJudgement,
  getDashboardStats
} from '../controllers/judgeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const judgeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // limit each user/IP to 15 judgement requests per windowMs
  message: {
    success: false,
    message: 'The Judge requires patience. Too many requests submitted in a minute.'
  }
});

router.use(protect);

router.post('/', judgeLimiter, judgeDay);
router.get('/history', getHistory);
router.get('/stats/dashboard', getDashboardStats);
router.get('/:id', getJudgementById);
router.delete('/:id', deleteJudgement);

export default router;


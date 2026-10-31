import WeeklyReview from '../models/WeeklyReview.js';
import Judgement from '../models/Judgement.js';
import DailyEntry from '../models/DailyEntry.js';
import { evaluateWeeklyReview } from '../services/geminiService.js';

// @desc    Generate or compute a weekly review
// @route   POST /api/weekly-review
// @access  Private
export const generateWeeklyReview = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Fetch judgements in the last 7-10 days or up to 7 most recent
    let judgements = await Judgement.find({
      userId: req.user.id,
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ createdAt: 1 });

    if (judgements.length === 0) {
      // Fallback to the latest 7 judgements if not within strictly last 7 days
      judgements = await Judgement.find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .limit(7);
      judgements.reverse();
    }

    if (judgements.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient data for a Weekly Review. Submit at least one daily judgement first.'
      });
    }

    const entryIds = judgements.map(j => j.dailyEntryId);
    const entries = await DailyEntry.find({ _id: { $in: entryIds } });

    const reviewData = await evaluateWeeklyReview(judgements, entries);

    const weekStart = judgements[0].createdAt;
    const weekEnd = judgements[judgements.length - 1].createdAt;

    const weeklyReview = await WeeklyReview.create({
      userId: req.user.id,
      weekStart,
      weekEnd,
      averageScore: reviewData.averageScore,
      bestDay: reviewData.bestDay,
      worstDay: reviewData.worstDay,
      productivityTrend: reviewData.productivityTrend,
      disciplineTrend: reviewData.disciplineTrend,
      mostRepeatedDistraction: reviewData.mostRepeatedDistraction,
      mostCommonUnfinishedTask: reviewData.mostCommonUnfinishedTask,
      weeklyVerdict: reviewData.weeklyVerdict,
      improvementPlan: reviewData.improvementPlan,
      dailyScores: reviewData.dailyScores
    });

    res.status(201).json({
      success: true,
      data: weeklyReview
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get latest weekly review or history
// @route   GET /api/weekly-review
// @access  Private
export const getWeeklyReviews = async (req, res, next) => {
  try {
    const reviews = await WeeklyReview.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    const latest = reviews.length > 0 ? reviews[0] : null;

    res.status(200).json({
      success: true,
      latest,
      history: reviews
    });
  } catch (error) {
    next(error);
  }
};


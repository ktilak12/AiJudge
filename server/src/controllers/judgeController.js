import Judgement from '../models/Judgement.js';
import DailyEntry from '../models/DailyEntry.js';
import { evaluateDailyEntry } from '../services/geminiService.js';

// @desc    Submit day for AI Judgement
// @route   POST /api/judge
// @access  Private
export const judgeDay = async (req, res, next) => {
  try {
    const {
      achievements,
      completedTasks,
      postponedTasks,
      distractions,
      workHours,
      studyHours,
      sleepHours,
      exercise,
      mood,
      biggestMistake,
      tomorrowPlan,
      rawDayDescription,
      judgePersonality
    } = req.body;

    // Validate minimum required input
    if (
      !achievements &&
      !completedTasks &&
      !rawDayDescription &&
      !postponedTasks &&
      Number(workHours || 0) === 0 &&
      Number(studyHours || 0) === 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least some details about your day (tasks, focus hours or summary).'
      });
    }

    // 1. Create or save DailyEntry in MongoDB
    const dailyEntry = await DailyEntry.create({
      userId: req.user.id,
      achievements: achievements || '',
      completedTasks: completedTasks || '',
      postponedTasks: postponedTasks || '',
      distractions: distractions || '',
      workHours: Number(workHours) || 0,
      studyHours: Number(studyHours) || 0,
      sleepHours: Number(sleepHours) || 7,
      exercise: exercise || 'No',
      mood: mood || 'Average',
      biggestMistake: biggestMistake || '',
      tomorrowPlan: tomorrowPlan || '',
      rawDayDescription: rawDayDescription || '',
      judgePersonality: judgePersonality || 'Savage but Fair'
    });

    // 2. Call AI Judgement Engine (Gemini)
    const aiEvaluation = await evaluateDailyEntry({
      achievements: dailyEntry.achievements,
      completedTasks: dailyEntry.completedTasks,
      postponedTasks: dailyEntry.postponedTasks,
      distractions: dailyEntry.distractions,
      workHours: dailyEntry.workHours,
      studyHours: dailyEntry.studyHours,
      sleepHours: dailyEntry.sleepHours,
      exercise: dailyEntry.exercise,
      mood: dailyEntry.mood,
      biggestMistake: dailyEntry.biggestMistake,
      tomorrowPlan: dailyEntry.tomorrowPlan,
      rawDayDescription: dailyEntry.rawDayDescription,
      judgePersonality: dailyEntry.judgePersonality
    });

    // 3. Save Judgement in MongoDB
    const judgement = await Judgement.create({
      userId: req.user.id,
      dailyEntryId: dailyEntry._id,
      overallScore: aiEvaluation.overallScore,
      performanceLabel: aiEvaluation.performanceLabel,
      categoryScores: aiEvaluation.categoryScores,
      verdict: aiEvaluation.verdict,
      biggestMistake: aiEvaluation.biggestMistake,
      bestAchievement: aiEvaluation.bestAchievement,
      improvements: aiEvaluation.improvements,
      tomorrowChallenge: aiEvaluation.tomorrowChallenge,
      summary: aiEvaluation.summary,
      confidence: aiEvaluation.confidence || 'medium'
    });

    res.status(201).json({
      success: true,
      data: {
        judgement,
        entry: dailyEntry
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's judgement history
// @route   GET /api/judge/history
// @access  Private
export const getHistory = async (req, res, next) => {
  try {
    const { category, minScore, maxScore, sort } = req.query;

    const query = { userId: req.user.id };

    if (category) {
      query.performanceLabel = category;
    }

    if (minScore !== undefined || maxScore !== undefined) {
      query.overallScore = {};
      if (minScore !== undefined) query.overallScore.$gte = Number(minScore);
      if (maxScore !== undefined) query.overallScore.$lte = Number(maxScore);
    }

    const sortOption = sort === 'asc' ? { createdAt: 1 } : { createdAt: -1 };

    const history = await Judgement.find(query)
      .populate('dailyEntryId')
      .sort(sortOption);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single judgement by ID
// @route   GET /api/judge/:id
// @access  Private
export const getJudgementById = async (req, res, next) => {
  try {
    const judgement = await Judgement.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('dailyEntryId');

    if (!judgement) {
      return res.status(404).json({
        success: false,
        message: 'Judgement record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: judgement
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete judgement entry
// @route   DELETE /api/judge/:id
// @access  Private
export const deleteJudgement = async (req, res, next) => {
  try {
    const judgement = await Judgement.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!judgement) {
      return res.status(404).json({
        success: false,
        message: 'Judgement not found'
      });
    }

    // Also delete associated entry
    if (judgement.dailyEntryId) {
      await DailyEntry.findByIdAndDelete(judgement.dailyEntryId);
    }

    await judgement.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Judgement and activity log deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard metrics & summary
// @route   GET /api/judge/stats/dashboard
// @access  Private
export const getDashboardStats = async (req, res, next) => {
  try {
    const judgements = await Judgement.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('dailyEntryId');

    const totalDays = judgements.length;

    if (totalDays === 0) {
      return res.status(200).json({
        success: true,
        data: {
          hasData: false,
          todayScore: null,
          weeklyAverage: 0,
          totalEvaluations: 0,
          currentStreak: 0,
          latestJudgement: null,
          weeklyChart: [],
          categoryAverages: {
            productivity: 0,
            discipline: 0,
            health: 0,
            timeManagement: 0,
            consistency: 0
          }
        }
      });
    }

    // Check if there's a judgement from today
    const now = new Date();
    const isToday = (d) => {
      const date = new Date(d);
      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    };

    const latest = judgements[0];
    const todayJudgement = judgements.find(j => isToday(j.createdAt));
    const todayScore = todayJudgement ? todayJudgement.overallScore : null;

    // Last 7 days for weekly average
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const pastWeekJudgements = judgements.filter(j => new Date(j.createdAt) >= sevenDaysAgo);
    const weeklyPool = pastWeekJudgements.length > 0 ? pastWeekJudgements : judgements.slice(0, 7);
    const weeklyAverage = Math.round(
      weeklyPool.reduce((acc, curr) => acc + curr.overallScore, 0) / weeklyPool.length
    );

    // Calculate daily streak
    let streak = 0;
    const sortedDates = [...new Set(
      judgements.map(j => {
        const d = new Date(j.createdAt);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      })
    )].sort().reverse();

    if (sortedDates.length > 0) {
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      let checkDate = new Date();
      if (!sortedDates.includes(todayStr)) {
        // If haven't evaluated today yet, check if streak from yesterday is intact
        checkDate = yesterday;
      }

      for (let i = 0; i < 30; i++) {
        const dStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
        if (sortedDates.includes(dStr)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Category averages across recent entries (up to 14)
    const recentSample = judgements.slice(0, 14);
    const categoryTotals = {
      productivity: 0,
      discipline: 0,
      health: 0,
      timeManagement: 0,
      consistency: 0
    };

    recentSample.forEach(j => {
      categoryTotals.productivity += j.categoryScores?.productivity?.score || 0;
      categoryTotals.discipline += j.categoryScores?.discipline?.score || 0;
      categoryTotals.health += j.categoryScores?.health?.score || 0;
      categoryTotals.timeManagement += j.categoryScores?.timeManagement?.score || 0;
      categoryTotals.consistency += j.categoryScores?.consistency?.score || 0;
    });

    const categoryAverages = {
      productivity: Math.round(categoryTotals.productivity / recentSample.length),
      discipline: Math.round(categoryTotals.discipline / recentSample.length),
      health: Math.round(categoryTotals.health / recentSample.length),
      timeManagement: Math.round(categoryTotals.timeManagement / recentSample.length),
      consistency: Math.round(categoryTotals.consistency / recentSample.length)
    };

    // Weekly performance chart (chronological, last 7 entries)
    const weeklyChart = [...judgements]
      .slice(0, 7)
      .reverse()
      .map(j => {
        const d = new Date(j.createdAt);
        return {
          date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }),
          score: j.overallScore,
          productivity: j.categoryScores?.productivity?.score || 0,
          discipline: j.categoryScores?.discipline?.score || 0,
          label: j.performanceLabel
        };
      });

    res.status(200).json({
      success: true,
      data: {
        hasData: true,
        todayScore,
        weeklyAverage,
        totalEvaluations: totalDays,
        currentStreak: streak,
        latestJudgement: latest,
        weeklyChart,
        categoryAverages
      }
    });
  } catch (error) {
    next(error);
  }
};


import DailyEntry from '../models/DailyEntry.js';
import Judgement from '../models/Judgement.js';

// @desc    Create new daily activity entry
// @route   POST /api/entries
// @access  Private
export const createEntry = async (req, res, next) => {
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

    const entry = await DailyEntry.create({
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

    res.status(201).json({
      success: true,
      data: entry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all daily entries for current user
// @route   GET /api/entries
// @access  Private
export const getEntries = async (req, res, next) => {
  try {
    const entries = await DailyEntry.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single daily entry
// @route   GET /api/entries/:id
// @access  Private
export const getEntry = async (req, res, next) => {
  try {
    const entry = await DailyEntry.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Daily entry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: entry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete daily entry and associated judgement
// @route   DELETE /api/entries/:id
// @access  Private
export const deleteEntry = async (req, res, next) => {
  try {
    const entry = await DailyEntry.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Daily entry not found'
      });
    }

    // Delete associated judgements
    await Judgement.deleteMany({ dailyEntryId: entry._id });
    await entry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Entry and associated judgement deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};


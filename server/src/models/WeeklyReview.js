import mongoose from 'mongoose';

const dayPerformanceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    score: { type: Number, required: true },
    notes: { type: String, default: '' }
  },
  { _id: false }
);

const dailyScorePointSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    score: { type: Number, required: true },
    label: { type: String, default: '' }
  },
  { _id: false }
);

const weeklyReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    weekStart: {
      type: Date,
      required: true
    },
    weekEnd: {
      type: Date,
      required: true
    },
    averageScore: {
      type: Number,
      required: true
    },
    bestDay: {
      type: dayPerformanceSchema,
      required: true
    },
    worstDay: {
      type: dayPerformanceSchema,
      required: true
    },
    productivityTrend: {
      type: String,
      default: 'Stable'
    },
    disciplineTrend: {
      type: String,
      default: 'Stable'
    },
    mostRepeatedDistraction: {
      type: String,
      default: 'None reported'
    },
    mostCommonUnfinishedTask: {
      type: String,
      default: 'None reported'
    },
    weeklyVerdict: {
      type: String,
      required: true
    },
    improvementPlan: {
      type: [String],
      required: true
    },
    dailyScores: {
      type: [dailyScorePointSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

weeklyReviewSchema.index({ userId: 1, weekStart: -1 });

const WeeklyReview = mongoose.model('WeeklyReview', weeklyReviewSchema);
export default WeeklyReview;


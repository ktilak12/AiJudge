import mongoose from 'mongoose';

const categoryScoreSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    reason: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

const judgementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    dailyEntryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DailyEntry',
      required: true
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    performanceLabel: {
      type: String,
      required: true,
      enum: [
        'Exceptional Day',
        'Strong Performance',
        'Decent Progress',
        'Needs Improvement',
        'Serious Reflection Needed'
      ]
    },
    categoryScores: {
      productivity: { type: categoryScoreSchema, required: true },
      discipline: { type: categoryScoreSchema, required: true },
      health: { type: categoryScoreSchema, required: true },
      timeManagement: { type: categoryScoreSchema, required: true },
      consistency: { type: categoryScoreSchema, required: true }
    },
    verdict: {
      type: String,
      required: true,
      trim: true
    },
    biggestMistake: {
      type: String,
      required: true,
      trim: true
    },
    bestAchievement: {
      type: String,
      required: true,
      trim: true
    },
    improvements: {
      type: [String],
      required: true,
      validate: [val => val.length >= 1, 'Must include at least 1 improvement suggestion']
    },
    tomorrowChallenge: {
      type: String,
      required: true,
      trim: true
    },
    summary: {
      type: String,
      required: true,
      trim: true
    },
    confidence: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    }
  },
  {
    timestamps: true
  }
);

judgementSchema.index({ userId: 1, createdAt: -1 });

const Judgement = mongoose.model('Judgement', judgementSchema);
export default Judgement;


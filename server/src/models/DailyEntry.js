import mongoose from 'mongoose';

const dailyEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    date: {
      type: Date,
      default: Date.now,
      index: true
    },
    achievements: {
      type: String,
      trim: true,
      default: ''
    },
    completedTasks: {
      type: String,
      trim: true,
      default: ''
    },
    postponedTasks: {
      type: String,
      trim: true,
      default: ''
    },
    distractions: {
      type: String,
      trim: true,
      default: ''
    },
    workHours: {
      type: Number,
      min: 0,
      max: 24,
      default: 0
    },
    studyHours: {
      type: Number,
      min: 0,
      max: 24,
      default: 0
    },
    sleepHours: {
      type: Number,
      min: 0,
      max: 24,
      default: 7
    },
    exercise: {
      type: String,
      trim: true,
      default: 'No'
    },
    mood: {
      type: String,
      enum: ['Excellent', 'Good', 'Average', 'Bad', 'Terrible'],
      default: 'Average'
    },
    biggestMistake: {
      type: String,
      trim: true,
      default: ''
    },
    tomorrowPlan: {
      type: String,
      trim: true,
      default: ''
    },
    rawDayDescription: {
      type: String,
      trim: true,
      default: ''
    },
    judgePersonality: {
      type: String,
      enum: ['Savage but Fair', 'Strict Professor', 'Supportive Mentor', 'Sarcastic Comedian'],
      default: 'Savage but Fair'
    }
  },
  {
    timestamps: true
  }
);

dailyEntrySchema.index({ userId: 1, date: -1 });

const DailyEntry = mongoose.model('DailyEntry', dailyEntrySchema);
export default DailyEntry;


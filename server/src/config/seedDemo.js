import User from '../models/User.js';
import DailyEntry from '../models/DailyEntry.js';
import Judgement from '../models/Judgement.js';

export const seedDemoUser = async () => {
  try {
    const demoEmail = 'judge.demo@lifejudge.ai';
    const existing = await User.findOne({ email: demoEmail });

    if (existing) {
      return existing;
    }

    console.log('[Seed] Seeding demo user account: judge.demo@lifejudge.ai ...');
    const demoUser = await User.create({
      name: 'Marcus Aurelius (Demo)',
      email: demoEmail,
      password: 'demopass123'
    });

    // Create 3 historical evaluations for realistic charts
    const now = new Date();
    const daysAgo = (n) => {
      const d = new Date(now);
      d.setDate(d.getDate() - n);
      return d;
    };

    const sampleDays = [
      {
        daysAgo: 2,
        score: 82,
        label: 'Strong Performance',
        achievements: 'Drafted 3 architectural documents and shipped payment module',
        completedTasks: 'Review PRs, 5km run, team retro',
        postponedTasks: 'Refactor legacy billing loop',
        distractions: 'Checked tech news for 25 minutes after lunch',
        workHours: 7.5,
        studyHours: 1.5,
        sleepHours: 7.5,
        exercise: 'Yes (5km run)',
        verdict: 'A disciplined day with genuine high-leverage execution. Don’t let small interruptions erode tomorrow’s momentum.',
        mistake: 'Failing to timebox post-lunch relaxation period.',
        achievement: 'Architectural documentation completed on schedule.',
        challenge: 'Tackle the legacy billing loop within the first 90 minutes of waking.',
        improvements: ['Lock phone during morning sprint', 'Take structured 10m walking breaks', 'Maintain 8h sleep target']
      },
      {
        daysAgo: 1,
        score: 64,
        label: 'Decent Progress',
        achievements: 'Reviewed bug reports and cleaned database indices',
        completedTasks: 'Triaged 12 customer issues',
        postponedTasks: 'Drafting quarterly goals',
        distractions: 'Spent 75 minutes on Twitter debates',
        workHours: 6,
        studyHours: 1,
        sleepHours: 6.5,
        exercise: 'No',
        verdict: 'Mediocrity has a stealth tax. You performed adequate work, but surrendered valuable cognitive stamina to trivial arguments.',
        mistake: 'Engaging in internet discussions during productive windows.',
        achievement: 'Cleared backlog of customer tickets.',
        challenge: 'Place phone on Airplane Mode from 9:00 AM to 12:00 PM.',
        improvements: ['Eliminate social media during daylight hours', 'Incorporate 30m aerobic exercise', 'Prioritize quarterly goals before reactive email']
      },
      {
        daysAgo: 0,
        score: 88,
        label: 'Strong Performance',
        achievements: 'Shipped life judge AI engine and verified all test suites',
        completedTasks: 'Full stack integration, PWA caching, PDF export',
        postponedTasks: 'None',
        distractions: 'Minimal, stayed locked in focus',
        workHours: 8,
        studyHours: 2,
        sleepHours: 8,
        exercise: 'Yes (45m gym)',
        verdict: 'An exceptional display of intentional execution. You set explicit targets and met them without compromise.',
        mistake: 'Slight delay in starting morning routine.',
        achievement: 'Zero postponed tasks and comprehensive test coverage.',
        challenge: 'Replicate this level of rigor on tomorrow’s core priorities.',
        improvements: ['Begin morning focus block promptly at 8:30 AM', 'Stay properly hydrated during deep work', 'Wind down screen time 1h before sleep']
      }
    ];

    for (const s of sampleDays) {
      const entryDate = daysAgo(s.daysAgo);
      const entry = await DailyEntry.create({
        userId: demoUser._id,
        date: entryDate,
        createdAt: entryDate,
        achievements: s.achievements,
        completedTasks: s.completedTasks,
        postponedTasks: s.postponedTasks,
        distractions: s.distractions,
        workHours: s.workHours,
        studyHours: s.studyHours,
        sleepHours: s.sleepHours,
        exercise: s.exercise,
        mood: s.score >= 80 ? 'Good' : 'Average',
        biggestMistake: s.mistake,
        tomorrowPlan: s.challenge,
        judgePersonality: 'Savage but Fair'
      });

      await Judgement.create({
        userId: demoUser._id,
        dailyEntryId: entry._id,
        createdAt: entryDate,
        overallScore: s.score,
        performanceLabel: s.label,
        categoryScores: {
          productivity: { score: s.score + 2 > 100 ? 100 : s.score + 2, reason: 'High-leverage outputs produced.' },
          discipline: { score: s.score - 4 < 0 ? 0 : s.score - 4, reason: 'Controlled impulse deviations.' },
          health: { score: s.sleepHours >= 7 ? 85 : 60, reason: `Logged ${s.sleepHours}h sleep.` },
          timeManagement: { score: s.score, reason: 'Time allocations aligned with schedule.' },
          consistency: { score: s.score - 2, reason: 'Reflected day-to-day discipline.' }
        },
        verdict: s.verdict,
        biggestMistake: s.mistake,
        bestAchievement: s.achievement,
        improvements: s.improvements,
        tomorrowChallenge: s.challenge,
        summary: `Score: ${s.score}/100. Status: ${s.label}.`,
        confidence: 'high'
      });
    }

    console.log('[Seed] Demo account seeded with 3 historical court judgements.');
    return demoUser;
  } catch (err) {
    console.error('[Seed Error] Failed to seed demo user:', err.message);
  }
};

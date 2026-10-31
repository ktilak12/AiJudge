import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LoadingAnimation from '../components/LoadingAnimation';
import { judgeAPI } from '../services/api';
import {
  Gavel,
  Clock,
  Moon,
  Dumbbell,
  Smile,
  AlertOctagon,
  Calendar,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Flame,
  Award,
  BookOpen,
  Laugh
} from 'lucide-react';

const personalities = [
  {
    id: 'Savage but Fair',
    title: 'Savage but Fair',
    icon: Flame,
    color: 'text-accent-red',
    border: 'border-accent-red/40',
    bg: 'bg-accent-red/10',
    desc: 'Uncompromising truth, zero sugar-coating, witty roasts of excuses.'
  },
  {
    id: 'Strict Professor',
    title: 'Strict Professor',
    icon: BookOpen,
    color: 'text-blue-400',
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/10',
    desc: 'Rigorous academic evaluation, high standards, systematic critique.'
  },
  {
    id: 'Supportive Mentor',
    title: 'Supportive Mentor',
    icon: Award,
    color: 'text-accent-green',
    border: 'border-accent-green/40',
    bg: 'bg-accent-green/10',
    desc: 'Firm but empowering, focuses on constructive momentum and growth.'
  },
  {
    id: 'Sarcastic Comedian',
    title: 'Sarcastic Comedian',
    icon: Laugh,
    color: 'text-accent-orange',
    border: 'border-accent-orange/40',
    bg: 'bg-accent-orange/10',
    desc: 'Dark humor, theatrical roasts of procrastination, genuinely funny.'
  }
];

export const SubmitActivityPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [achievements, setAchievements] = useState('');
  const [completedTasks, setCompletedTasks] = useState('');
  const [postponedTasks, setPostponedTasks] = useState('');
  const [distractions, setDistractions] = useState('');
  const [workHours, setWorkHours] = useState(6);
  const [studyHours, setStudyHours] = useState(2);
  const [sleepHours, setSleepHours] = useState(7);
  const [exercise, setExercise] = useState('Yes (45m workout)');
  const [mood, setMood] = useState('Good');
  const [biggestMistake, setBiggestMistake] = useState('');
  const [tomorrowPlan, setTomorrowPlan] = useState('');
  const [rawDayDescription, setRawDayDescription] = useState('');
  const [judgePersonality, setJudgePersonality] = useState('Savage but Fair');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Input validation
    if (
      !achievements.trim() &&
      !completedTasks.trim() &&
      !rawDayDescription.trim() &&
      !postponedTasks.trim() &&
      workHours === 0 &&
      studyHours === 0
    ) {
      setError(
        'The Judge requires substance. Please describe your completed tasks, focus hours or day summary before submitting.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        achievements,
        completedTasks,
        postponedTasks,
        distractions,
        workHours: Number(workHours),
        studyHours: Number(studyHours),
        sleepHours: Number(sleepHours),
        exercise,
        mood,
        biggestMistake,
        tomorrowPlan,
        rawDayDescription,
        judgePersonality
      };

      const res = await judgeAPI.submitForJudgement(payload);
      const judgementId = res.data.data.judgement._id;

      // Small delay to allow user to experience the judicial transition
      setTimeout(() => {
        navigate(`/judge/result/${judgementId}`);
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message ||
          'The Court experienced an interruption while analyzing your decisions. Please try again.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrefillSample = () => {
    setAchievements('Shipped authentication module and drafted sprint architecture document.');
    setCompletedTasks('3 pull requests reviewed, 1 client meeting conducted, 40-minute run.');
    setPostponedTasks('Writing test coverage for billing service and cleaning up inbox.');
    setDistractions('Lost 90 minutes reading tech controversies on Twitter / X after lunch.');
    setWorkHours(7);
    setStudyHours(1.5);
    setSleepHours(6.5);
    setExercise('Yes (40-minute run + pushups)');
    setMood('Average');
    setBiggestMistake('Letting a minor Twitter argument distract me from deep-work sprint.');
    setTomorrowPlan('Finish billing test coverage first thing at 9:00 AM before reading email.');
    setRawDayDescription('High energy in the morning, crashed slightly post-lunch, recovered in the evening.');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-primary-text selection:bg-accent-red selection:text-white">
      <Sidebar />

      {loading && <LoadingAnimation />}

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-accent-red mb-1">
              <Gavel className="w-3.5 h-3.5" />
              <span>OFFICIAL COURT EVIDENCE SUBMISSION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Submit Your Day For Judgement
            </h1>
            <p className="text-xs text-secondary-text mt-1">
              Provide complete testimony. The algorithm will expose your excuses and evaluate your five life pillars.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrefillSample}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-secondary-bg hover:bg-card-hover border border-border-subtle text-secondary-text hover:text-white transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-orange" />
            <span>Load Realistic Day Example</span>
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2.5 p-4 rounded-xl bg-accent-red/10 border border-accent-red/30 text-accent-red text-xs">
            <AlertOctagon className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION A: JUDGE PERSONALITY SELECTION */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  STEP 1: SELECT PRESIDING JUDGE PERSONALITY
                </h3>
                <p className="text-xs text-secondary-text">
                  Choose how aggressively the Court addresses your daily excuses
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {personalities.map((p) => {
                const Icon = p.icon;
                const isSelected = judgePersonality === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setJudgePersonality(p.id)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      isSelected
                        ? `${p.border} ${p.bg} shadow-card ring-1 ring-accent-red/40`
                        : 'border-border-subtle bg-secondary-bg hover:border-border-highlight'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${p.color}`} />
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-accent-red animate-ping" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-white">{p.title}</p>
                    <p className="text-[11px] text-secondary-text mt-1 leading-snug">
                      {p.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION B: CORE FOCUS METRICS */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono pb-2 border-b border-border-subtle">
              STEP 2: TEMPORAL ALLOCATION & HEALTH LOG
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Work Hours */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-secondary-text flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>WORK HOURS</span>
                  </span>
                  <span className="text-white font-bold">{workHours}h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="0.5"
                  value={workHours}
                  onChange={(e) => setWorkHours(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <span className="text-[10px] text-secondary-text block">Dedicated professional focus</span>
              </div>

              {/* Study Hours */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-secondary-text flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    <span>STUDY / LEARNING</span>
                  </span>
                  <span className="text-white font-bold">{studyHours}h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={studyHours}
                  onChange={(e) => setStudyHours(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <span className="text-[10px] text-secondary-text block">Intentional skill building</span>
              </div>

              {/* Sleep Hours */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-secondary-text flex items-center space-x-1.5">
                    <Moon className="w-3.5 h-3.5 text-accent-green" />
                    <span>SLEEP DURATION</span>
                  </span>
                  <span className="text-white font-bold">{sleepHours}h</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  className="w-full accent-accent-green cursor-pointer"
                />
                <span className="text-[10px] text-secondary-text block">Biological recovery baseline</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Mood Dropdown */}
              <div>
                <label className="block text-xs font-mono font-medium text-secondary-text mb-1.5">
                  SELF-REPORTED MOOD
                </label>
                <div className="relative">
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="Excellent">Excellent — High energy, clear focus</option>
                    <option value="Good">Good — Productive, balanced</option>
                    <option value="Average">Average — Standard routine, manageable friction</option>
                    <option value="Bad">Bad — Low motivation, sluggish</option>
                    <option value="Terrible">Terrible — Exhausted, heavy friction</option>
                  </select>
                </div>
              </div>

              {/* Exercise Input */}
              <div>
                <label className="block text-xs font-mono font-medium text-secondary-text mb-1.5">
                  PHYSICAL ACTIVITY / EXERCISE
                </label>
                <input
                  type="text"
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                  placeholder="e.g. Yes (45m gym), or No"
                  className="w-full py-2.5 px-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-xs text-white placeholder-secondary-text/50 outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION C: DETAILED TESTIMONY */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono pb-2 border-b border-border-subtle">
              STEP 3: DETAILED DAILY EVIDENCE
            </h3>

            {/* Accomplishments */}
            <div>
              <label className="block text-xs font-mono font-medium text-secondary-text mb-1.5">
                1. WHAT DID YOU ACCOMPLISH TODAY?
              </label>
              <textarea
                rows={2}
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                placeholder="Highlight your high-leverage outputs, breakthroughs, or wins..."
                className="w-full p-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-xs text-white placeholder-secondary-text/50 outline-none resize-y"
              />
            </div>

            {/* Completed Tasks */}
            <div>
              <label className="block text-xs font-mono font-medium text-secondary-text mb-1.5">
                2. WHAT TASKS DID YOU COMPLETE?
              </label>
              <textarea
                rows={2}
                value={completedTasks}
                onChange={(e) => setCompletedTasks(e.target.value)}
                placeholder="Specific checklist items, pull requests, emails, meetings..."
                className="w-full p-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-xs text-white placeholder-secondary-text/50 outline-none resize-y"
              />
            </div>

            {/* Postponed Tasks */}
            <div>
              <label className="block text-xs font-mono font-medium text-accent-orange mb-1.5">
                3. WHAT DID YOU POSTPONE OR AVOID?
              </label>
              <textarea
                rows={2}
                value={postponedTasks}
                onChange={(e) => setPostponedTasks(e.target.value)}
                placeholder="Be brutally honest. What difficult task did you dodge?"
                className="w-full p-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-orange text-xs text-white placeholder-secondary-text/50 outline-none resize-y"
              />
            </div>

            {/* Distractions & Wasted Time */}
            <div>
              <label className="block text-xs font-mono font-medium text-accent-red mb-1.5">
                4. HOW MUCH TIME DID YOU WASTE & WHAT WERE YOUR DISTRACTIONS?
              </label>
              <textarea
                rows={2}
                value={distractions}
                onChange={(e) => setDistractions(e.target.value)}
                placeholder="Social media scrolling, mindless YouTube, unproductive debates..."
                className="w-full p-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-xs text-white placeholder-secondary-text/50 outline-none resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Biggest Mistake */}
              <div>
                <label className="block text-xs font-mono font-medium text-secondary-text mb-1.5">
                  5. WHAT WAS YOUR BIGGEST MISTAKE?
                </label>
                <input
                  type="text"
                  value={biggestMistake}
                  onChange={(e) => setBiggestMistake(e.target.value)}
                  placeholder="e.g. Breaking focus post-lunch, staying up late"
                  className="w-full p-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-xs text-white placeholder-secondary-text/50 outline-none"
                />
              </div>

              {/* Tomorrow's Plan */}
              <div>
                <label className="block text-xs font-mono font-medium text-secondary-text mb-1.5">
                  6. WHAT ARE YOU PLANNING TO DO TOMORROW?
                </label>
                <input
                  type="text"
                  value={tomorrowPlan}
                  onChange={(e) => setTomorrowPlan(e.target.value)}
                  placeholder="e.g. Complete billing unit tests by 11 AM"
                  className="w-full p-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-xs text-white placeholder-secondary-text/50 outline-none"
                />
              </div>
            </div>

            {/* Optional Free-form Journal */}
            <div>
              <label className="block text-xs font-mono font-medium text-secondary-text mb-1.5">
                OPTIONAL FREE-FORM DAILY CHRONICLE
              </label>
              <textarea
                rows={3}
                value={rawDayDescription}
                onChange={(e) => setRawDayDescription(e.target.value)}
                placeholder="Any additional nuances, context, or reflections for the Judge to consider..."
                className="w-full p-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-xs text-white placeholder-secondary-text/50 outline-none resize-y"
              />
            </div>
          </div>

          {/* SUBMISSION BUTTON */}
          <div className="pt-4 flex flex-col items-center justify-center space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-12 py-4 rounded-2xl font-extrabold text-sm tracking-wider uppercase bg-accent-red text-white hover:bg-red-600 transition duration-200 shadow-glow-red flex items-center justify-center space-x-3 group disabled:opacity-50"
            >
              <Gavel className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>SUBMIT FOR JUDGEMENT</span>
            </button>
            <p className="text-[11px] text-secondary-text font-mono text-center">
              TESTIMONY IS IRREVOCABLE • JUDICIAL VERDICT GENERATED BY GEMINI ENGINE
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SubmitActivityPage;


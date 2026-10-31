import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LifeScoreCard from '../components/LifeScoreCard';
import CategoryScoreCard from '../components/CategoryScoreCard';
import EmptyState from '../components/EmptyState';
import { judgeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Gavel,
  History,
  CalendarCheck,
  TrendingUp,
  Flame,
  Award,
  Clock,
  ArrowRight,
  ShieldAlert,
  Zap,
  Activity,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await judgeAPI.getDashboardStats();
      setStats(res.data.data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Unable to load courtroom records. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const todayDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (loading) {
    return (
      <div className="min-h-screen flex bg-background text-primary-text">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-card-bg border border-accent-red/30 flex items-center justify-center animate-spin mx-auto">
              <Gavel className="w-6 h-6 text-accent-red" />
            </div>
            <p className="text-xs font-mono text-secondary-text">Loading Judicial Records...</p>
          </div>
        </div>
      </div>
    );
  }

  const hasData = stats && stats.hasData;

  // Prepare radar/bar category breakdown data for Recharts
  const categoryBarData = stats?.categoryAverages
    ? [
        { name: 'Productivity', score: stats.categoryAverages.productivity, fill: '#3B82F6' },
        { name: 'Discipline', score: stats.categoryAverages.discipline, fill: '#EF4444' },
        { name: 'Health', score: stats.categoryAverages.health, fill: '#22C55E' },
        { name: 'Time Mgmt', score: stats.categoryAverages.timeManagement, fill: '#F97316' },
        { name: 'Consistency', score: stats.categoryAverages.consistency, fill: '#A855F7' }
      ]
    : [];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-primary-text selection:bg-accent-red selection:text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Top Welcome Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-secondary-text mb-1">
              <Calendar className="w-3.5 h-3.5 text-accent-red" />
              <span>{todayDateFormatted}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Court In Session, <span className="text-accent-red">{user?.name || 'Defendant'}</span>
            </h1>
            <p className="text-xs text-secondary-text mt-1">
              Every decision leaves a trace. The algorithm does not forget.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/judge"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red"
            >
              <Gavel className="w-4 h-4" />
              <span>Judge My Day</span>
            </Link>
            <Link
              to="/history"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-card-bg border border-border-subtle hover:border-border-highlight text-primary-text hover:bg-card-hover transition"
            >
              <History className="w-4 h-4 text-secondary-text" />
              <span>History</span>
            </Link>
            <Link
              to="/weekly-review"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-card-bg border border-border-subtle hover:border-border-highlight text-primary-text hover:bg-card-hover transition"
            >
              <CalendarCheck className="w-4 h-4 text-accent-orange" />
              <span>Weekly Review</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-accent-red/10 border border-accent-red/30 text-accent-red text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1: Today's Score */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle space-y-2 hover:border-accent-red/30 transition-all">
            <div className="flex items-center justify-between text-secondary-text">
              <span className="text-[11px] font-mono uppercase tracking-wider">Today's Score</span>
              <Activity className="w-4 h-4 text-accent-red" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className={`text-3xl font-extrabold font-mono ${stats?.todayScore !== null ? 'text-white' : 'text-secondary-text'}`}>
                {stats?.todayScore !== null ? `${stats?.todayScore}` : '—'}
              </span>
              {stats?.todayScore !== null && (
                <span className="text-xs text-secondary-text font-mono">/100</span>
              )}
            </div>
            <p className="text-[11px] text-secondary-text">
              {stats?.todayScore !== null ? 'Evaluated for today' : 'Pending submission today'}
            </p>
          </div>

          {/* 2: Weekly Average */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle space-y-2 hover:border-accent-orange/30 transition-all">
            <div className="flex items-center justify-between text-secondary-text">
              <span className="text-[11px] font-mono uppercase tracking-wider">7-Day Average</span>
              <TrendingUp className="w-4 h-4 text-accent-orange" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold font-mono text-accent-orange">
                {stats?.weeklyAverage || 0}
              </span>
              <span className="text-xs text-secondary-text font-mono">/100</span>
            </div>
            <p className="text-[11px] text-secondary-text">
              {stats?.weeklyAverage >= 70 ? 'Strong baseline maintained' : 'Requires tighter discipline'}
            </p>
          </div>

          {/* 3: Current Streak */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle space-y-2 hover:border-accent-red/30 transition-all">
            <div className="flex items-center justify-between text-secondary-text">
              <span className="text-[11px] font-mono uppercase tracking-wider">Court Streak</span>
              <Flame className="w-4 h-4 text-accent-red animate-pulse" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold font-mono text-white">
                {stats?.currentStreak || 0}
              </span>
              <span className="text-xs text-secondary-text font-mono">Days</span>
            </div>
            <p className="text-[11px] text-secondary-text">Consecutive daily evaluations</p>
          </div>

          {/* 4: Total Days Evaluated */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle space-y-2 hover:border-border-highlight transition-all">
            <div className="flex items-center justify-between text-secondary-text">
              <span className="text-[11px] font-mono uppercase tracking-wider">Total Trials</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold font-mono text-white">
                {stats?.totalEvaluations || 0}
              </span>
              <span className="text-xs text-secondary-text font-mono">Sessions</span>
            </div>
            <p className="text-[11px] text-secondary-text">Recorded judgements on file</p>
          </div>
        </div>

        {!hasData ? (
          <EmptyState
            title="The Docket is Empty"
            description="You haven't faced the Judge yet. Submit your daily log to calculate your life score, receive your verdict, and unlock real analytics."
            actionText="Submit Today For Judgement"
            actionLink="/judge"
          />
        ) : (
          <>
            {/* Today's or Latest Judgement Showcase */}
            {stats.latestJudgement && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold font-mono tracking-wider text-secondary-text uppercase">
                    MOST RECENT COURT RECORD
                  </h2>
                  <Link
                    to={`/judge/result/${stats.latestJudgement._id}`}
                    className="inline-flex items-center space-x-1 text-xs text-accent-red hover:underline font-semibold"
                  >
                    <span>Inspect Full Verdict</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <LifeScoreCard
                      score={stats.latestJudgement.overallScore}
                      label={stats.latestJudgement.performanceLabel}
                      title="Latest Trial Score"
                      subtitle={stats.latestJudgement.summary}
                    />
                  </div>

                  {/* Verdict & Biggest Mistake Quote */}
                  <div className="lg:col-span-2 rounded-2xl bg-card-bg border border-border-subtle p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-accent-red uppercase tracking-wider">
                          Official Judicial Verdict
                        </span>
                        <span className="text-[10px] font-mono text-secondary-text">
                          {new Date(stats.latestJudgement.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans italic border-l-2 border-accent-red/50 pl-3">
                        "{stats.latestJudgement.verdict}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border-subtle text-xs">
                      <div className="p-3 rounded-xl bg-secondary-bg border border-accent-red/20">
                        <span className="text-[10px] text-accent-red font-mono uppercase font-semibold block">
                          Biggest Mistake
                        </span>
                        <p className="text-gray-300 mt-1 line-clamp-2">
                          {stats.latestJudgement.biggestMistake}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-secondary-bg border border-accent-green/20">
                        <span className="text-[10px] text-accent-green font-mono uppercase font-semibold block">
                          Best Achievement
                        </span>
                        <p className="text-gray-300 mt-1 line-clamp-2">
                          {stats.latestJudgement.bestAchievement}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Weekly Performance Trend (2 cols) */}
              <div className="lg:col-span-2 rounded-2xl bg-card-bg border border-border-subtle p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      WEEKLY LIFE SCORE TRAJECTORY
                    </h3>
                    <p className="text-xs text-secondary-text">Chronological trend across recent evaluations</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary-bg border border-border-subtle text-accent-red">
                    0–100 SCALE
                  </span>
                </div>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={stats.weeklyChart}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                      <XAxis
                        dataKey="date"
                        stroke="#666"
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        stroke="#666"
                        fontSize={11}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#171717',
                          borderColor: '#333',
                          borderRadius: '0.75rem',
                          fontSize: '12px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#EF4444"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#scoreGlow)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 5-Pillar Average Performance (1 col) */}
              <div className="rounded-2xl bg-card-bg border border-border-subtle p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    PILLAR AVERAGES
                  </h3>
                  <p className="text-xs text-secondary-text">Cumulative ratings across 5 core categories</p>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryBarData}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} stroke="#666" fontSize={10} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        stroke="#888"
                        fontSize={11}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#171717',
                          borderColor: '#333',
                          borderRadius: '0.75rem',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {categoryBarData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-[11px] text-center text-secondary-text font-mono border-t border-border-subtle pt-2">
                  Aggregated from all verified trial entries
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;


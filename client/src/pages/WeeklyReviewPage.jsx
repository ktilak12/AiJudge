import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EmptyState from '../components/EmptyState';
import { weeklyAPI } from '../services/api';
import {
  CalendarCheck,
  TrendingUp,
  Award,
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  Clock,
  Zap,
  Target,
  ArrowRight,
  Gavel,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const WeeklyReviewPage = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const fetchWeeklyData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await weeklyAPI.getAll();
      setReview(res.data.latest);
    } catch (err) {
      console.error('Error fetching weekly review:', err);
      setError('Unable to load weekly audit records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError('');
      const res = await weeklyAPI.generate();
      setReview(res.data.data);
    } catch (err) {
      console.error('Error generating weekly review:', err);
      setError(
        err.response?.data?.message ||
          'Could not generate Weekly Review. Ensure you have evaluated at least 1 day.'
      );
    } finally {
      setGenerating(false);
    }
  };

  const chartData = review?.dailyScores?.map((point) => {
    const d = new Date(point.date);
    return {
      date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }),
      score: point.score,
      label: point.label
    };
  }) || [];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-primary-text selection:bg-accent-red selection:text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-accent-orange mb-1">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>7-DAY CUMULATIVE COURT AUDIT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Weekly Judicial Review
            </h1>
            <p className="text-xs text-secondary-text mt-1">
              A synthesis of your last seven days. Unmask systemic leaks and recalibrate for next week.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red disabled:opacity-50 w-fit"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${generating ? 'animate-spin' : ''}`} />
            <span>{generating ? 'Synthesizing Docket...' : 'Generate New Audit'}</span>
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-accent-red/10 border border-accent-red/30 text-accent-red text-xs">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-accent-red border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-secondary-text">Compiling Weekly Verdicts...</p>
          </div>
        ) : !review ? (
          <div className="rounded-2xl bg-card-bg border border-border-subtle p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary-bg border border-border-subtle flex items-center justify-center mx-auto text-accent-orange">
              <CalendarCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-bold text-white">Insufficient Data For Weekly Audit</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                The Court requires at least one evaluated day to calculate trends, identify repeated distractions, and assemble a 7-day review.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                to="/judge"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Today's Evidence</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top 4 Metrics Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Avg Score */}
              <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-secondary-text">
                  Weekly Average Score
                </span>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-3xl font-extrabold font-mono text-accent-orange">
                    {review.averageScore}
                  </span>
                  <span className="text-xs text-secondary-text font-mono">/100</span>
                </div>
                <p className="text-[11px] text-secondary-text">Across verified 7-day window</p>
              </div>

              {/* Best Day */}
              <div className="p-5 rounded-2xl bg-card-bg border border-accent-green/20 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-accent-green">
                  Highest Peak Day
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold font-mono text-accent-green">
                    {review.bestDay?.score || 0}
                  </span>
                  <span className="text-xs text-secondary-text font-mono">
                    {new Date(review.bestDay?.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
                <p className="text-[11px] text-secondary-text truncate">
                  {review.bestDay?.notes || 'Peak accountability'}
                </p>
              </div>

              {/* Worst Day */}
              <div className="p-5 rounded-2xl bg-card-bg border border-accent-red/20 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-accent-red">
                  Lowest Trough Day
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold font-mono text-accent-red">
                    {review.worstDay?.score || 0}
                  </span>
                  <span className="text-xs text-secondary-text font-mono">
                    {new Date(review.worstDay?.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
                <p className="text-[11px] text-secondary-text truncate">
                  {review.worstDay?.notes || 'Surrendered to friction'}
                </p>
              </div>

              {/* Trends */}
              <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-secondary-text">
                  Trajectory & Momentum
                </span>
                <div className="text-sm font-bold text-white pt-1">
                  Productivity: <span className="text-blue-400 font-mono">{review.productivityTrend}</span>
                </div>
                <div className="text-xs text-secondary-text">
                  Discipline: <span className="text-purple-400 font-mono">{review.disciplineTrend}</span>
                </div>
              </div>
            </div>

            {/* Weekly Verdict */}
            <div className="rounded-2xl bg-card-bg border border-accent-red/30 p-6 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-red to-accent-orange"></div>
              <div className="flex items-center space-x-2 text-accent-red">
                <Gavel className="w-4 h-4" />
                <h3 className="text-xs font-mono font-bold tracking-wider uppercase">
                  SUPREME COURT 7-DAY VERDICT
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans italic border-l-2 border-accent-red pl-3">
                "{review.weeklyVerdict}"
              </p>
            </div>

            {/* Daily Scores Chart */}
            <div className="rounded-2xl bg-card-bg border border-border-subtle p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    DAILY SCORE EVOLUTION
                  </h3>
                  <p className="text-xs text-secondary-text">Performance consistency across the audit timeframe</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary-bg text-secondary-text border border-border-subtle">
                  MIN: 0 • MAX: 100
                </span>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                    <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} />
                    <YAxis domain={[0, 100]} stroke="#666" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#171717',
                        borderColor: '#333',
                        borderRadius: '0.75rem',
                        fontSize: '12px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#F97316"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#EF4444' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distraction & Postponement Leak Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card-bg border border-accent-red/30 space-y-2">
                <div className="flex items-center space-x-2 text-accent-red">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    MOST REPEATED DISTRACTION
                  </span>
                </div>
                <p className="text-sm text-gray-200 font-medium">
                  {review.mostRepeatedDistraction || 'None reported'}
                </p>
                <p className="text-[11px] text-secondary-text">
                  This recurring pattern represents your highest cognitive tax of the week.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card-bg border border-accent-orange/30 space-y-2">
                <div className="flex items-center space-x-2 text-accent-orange">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    MOST COMMON UNFINISHED TASK
                  </span>
                </div>
                <p className="text-sm text-gray-200 font-medium">
                  {review.mostCommonUnfinishedTask || 'None reported'}
                </p>
                <p className="text-[11px] text-secondary-text">
                  Identified as the primary bottleneck postponed across multiple sessions.
                </p>
              </div>
            </div>

            {/* Next Week's Improvement Plan */}
            <div className="rounded-2xl bg-card-bg border border-border-subtle p-6 space-y-4">
              <div className="flex items-center space-x-2 text-blue-400">
                <Target className="w-4 h-4" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                  NEXT WEEK'S STRATEGIC CORRECTION PLAN
                </h3>
              </div>

              <div className="space-y-3">
                {review.improvementPlan?.map((planItem, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3.5 rounded-xl bg-secondary-bg border border-border-subtle"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="text-xs text-gray-300 pt-0.5 leading-relaxed">{planItem}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WeeklyReviewPage;


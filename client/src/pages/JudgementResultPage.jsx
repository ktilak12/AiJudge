import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LifeScoreCard from '../components/LifeScoreCard';
import CategoryScoreCard from '../components/CategoryScoreCard';
import VerdictCard from '../components/VerdictCard';
import ImprovementCard from '../components/ImprovementCard';
import TomorrowChallengeCard from '../components/TomorrowChallengeCard';
import AudioJudgeVoice from '../components/AudioJudgeVoice';
import ShareModal from '../components/ShareModal';
import { judgeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { exportVerdictPDF } from '../utils/pdfExport';
import confetti from 'canvas-confetti';
import {
  Gavel,
  History,
  Share2,
  Calendar,
  AlertTriangle,
  Award,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  PlusCircle,
  Download
} from 'lucide-react';

export const JudgementResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [judgement, setJudgement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const fetchJudgement = async () => {
      try {
        setLoading(true);
        const res = await judgeAPI.getById(id);
        setJudgement(res.data.data);

        // Fire celebratory or solemn confetti
        if (res.data.data?.overallScore >= 75) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      } catch (err) {
        console.error('Error loading judgement:', err);
        setError('Judgement record could not be retrieved from the archives.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJudgement();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex bg-background text-primary-text">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-card-bg border border-accent-red/30 flex items-center justify-center animate-spin mx-auto">
              <Gavel className="w-6 h-6 text-accent-red" />
            </div>
            <p className="text-xs font-mono text-secondary-text">Unsealing Court Documents...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !judgement) {
    return (
      <div className="min-h-screen flex bg-background text-primary-text">
        <Sidebar />
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-accent-red" />
          <h2 className="text-lg font-bold text-white">Record Not Found</h2>
          <p className="text-xs text-secondary-text max-w-sm">{error || 'This case has either been purged or does not exist.'}</p>
          <Link
            to="/history"
            className="px-4 py-2 rounded-xl bg-secondary-bg text-xs font-medium text-white hover:bg-card-hover border border-border-subtle"
          >
            Return to Case History
          </Link>
        </div>
      </div>
    );
  }

  const dateFormatted = new Date(judgement.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const entry = judgement.dailyEntryId || {};
  const personality = entry.judgePersonality || 'Savage but Fair';

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-primary-text selection:bg-accent-red selection:text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-8">
        {/* Top Court Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-accent-red mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OFFICIAL JUDICIAL DECREE • CASE #{judgement._id.slice(-6).toUpperCase()}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Daily Judgement Report
            </h1>
            <p className="text-xs text-secondary-text mt-1 flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{dateFormatted}</span>
            </p>
          </div>

          {/* Quick Result Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => exportVerdictPDF({ judgement, userName: user?.name })}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-secondary-bg hover:bg-card-hover border border-border-subtle text-primary-text transition"
              title="Download Official Supreme Court Decree"
            >
              <Download className="w-4 h-4 text-accent-red" />
              <span>Export PDF Decree</span>
            </button>
            <button
              onClick={() => setShareOpen(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-secondary-bg hover:bg-card-hover border border-border-subtle text-primary-text transition"
            >
              <Share2 className="w-4 h-4 text-accent-orange" />
              <span>Share My Verdict</span>
            </button>
            <Link
              to="/judge"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Judge Another Day</span>
            </Link>
            <Link
              to="/history"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-secondary-text hover:text-white bg-card-bg border border-border-subtle transition"
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </Link>
          </div>
        </div>

        {/* SECTION A: OVERALL SCORE & SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <LifeScoreCard
              score={judgement.overallScore}
              label={judgement.performanceLabel}
              title="Daily Life Score"
              subtitle={judgement.summary}
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <VerdictCard
              verdict={judgement.verdict}
              personality={personality}
              confidence={judgement.confidence}
            />
            <AudioJudgeVoice
              verdict={judgement.verdict}
              personality={personality}
              score={judgement.overallScore}
              label={judgement.performanceLabel}
            />
          </div>
        </div>

        {/* SECTION B: 5 PILLAR CATEGORY BREAKDOWN */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-secondary-text">
              PILLAR BY PILLAR CROSS-EXAMINATION
            </h3>
            <span className="text-[10px] font-mono text-secondary-text">WEIGHTED COMPOSITE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(judgement.categoryScores || {}).map(([key, value]) => (
              <CategoryScoreCard
                key={key}
                categoryKey={key}
                score={value.score}
                reason={value.reason}
              />
            ))}
          </div>
        </div>

        {/* SECTION C: HIGHLIGHTS & PITFALLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Biggest Mistake */}
          <div className="p-6 rounded-2xl bg-card-bg border border-accent-red/30 space-y-3">
            <div className="flex items-center space-x-2 text-accent-red">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                PRIMARY SYSTEMIC ERROR
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
              {judgement.biggestMistake}
            </p>
          </div>

          {/* Best Achievement */}
          <div className="p-6 rounded-2xl bg-card-bg border border-accent-green/30 space-y-3">
            <div className="flex items-center space-x-2 text-accent-green">
              <Award className="w-4 h-4" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                AUTHENTIC ACCOMPLISHMENT
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
              {judgement.bestAchievement}
            </p>
          </div>
        </div>

        {/* SECTION D: IMPROVEMENTS & TOMORROW'S CHALLENGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImprovementCard improvements={judgement.improvements} />
          <TomorrowChallengeCard challenge={judgement.tomorrowChallenge} />
        </div>

        {/* BOTTOM NAV BAR */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-xs text-secondary-text hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Courtroom Dashboard</span>
          </Link>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShareOpen(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card-bg border border-border-subtle hover:border-accent-orange text-white transition"
            >
              <Share2 className="w-3.5 h-3.5 text-accent-orange" />
              <span>Share Verdict</span>
            </button>
            <Link
              to="/judge"
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red"
            >
              <span>Submit Next Day</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        judgement={judgement}
      />
    </div>
  );
};

export default JudgementResultPage;


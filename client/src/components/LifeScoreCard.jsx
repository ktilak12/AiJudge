import React, { useEffect, useState } from 'react';
import { ShieldAlert, Award, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export const LifeScoreCard = ({ score = 0, label = 'Evaluating...', title = 'Today\'s Life Score', subtitle }) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Smooth counter animation
  useEffect(() => {
    let start = 0;
    const end = Math.min(100, Math.max(0, Number(score) || 0));
    if (end === 0) {
      setDisplayScore(0);
      return;
    }
    const duration = 1200;
    const increment = end / (duration / 25);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [score]);

  const getColorConfig = (s) => {
    if (s >= 90) {
      return {
        text: 'text-accent-green',
        border: 'border-accent-green/40',
        bg: 'bg-accent-green/10',
        glow: 'shadow-glow-green',
        icon: Award,
        stroke: '#22c55e'
      };
    }
    if (s >= 75) {
      return {
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/10',
        glow: 'shadow-glow-green',
        icon: CheckCircle,
        stroke: '#10b981'
      };
    }
    if (s >= 60) {
      return {
        text: 'text-accent-orange',
        border: 'border-accent-orange/40',
        bg: 'bg-accent-orange/10',
        glow: 'shadow-glow-orange',
        icon: TrendingUp,
        stroke: '#f97316'
      };
    }
    if (s >= 40) {
      return {
        text: 'text-amber-500',
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/10',
        glow: 'shadow-glow-orange',
        icon: AlertTriangle,
        stroke: '#f59e0b'
      };
    }
    return {
      text: 'text-accent-red',
      border: 'border-accent-red/40',
      bg: 'bg-accent-red/10',
      glow: 'shadow-glow-red',
      icon: ShieldAlert,
      stroke: '#ef4444'
    };
  };

  const style = getColorConfig(score);
  const Icon = style.icon;

  // SVG circular gauge calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-card-bg border ${style.border} p-6 transition-all duration-300 ${style.glow}`}>
      {/* Background ambient lighting */}
      <div className={`absolute -right-10 -bottom-10 w-44 h-44 rounded-full ${style.bg} blur-3xl pointer-events-none -z-0`}></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Score Gauge */}
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="9"
              fill="transparent"
              className="text-[#202020]"
            />
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke={style.stroke}
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-3xl font-extrabold font-mono tracking-tighter ${style.text}`}>
              {displayScore}
            </span>
            <span className="text-[10px] uppercase font-mono text-secondary-text">/ 100</span>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-secondary-text block">
            {title}
          </span>
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text} border ${style.border}`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </span>
          </div>
          <p className="text-xs text-secondary-text leading-relaxed max-w-md">
            {subtitle || (
              score >= 75
                ? 'Your decisions today aligned with long-term discipline. Keep raising the baseline.'
                : score >= 50
                ? 'Mediocrity has a high cost. Several hours were surrendered to friction and procrastination.'
                : 'A day marked by surrender to impulse and avoidance. Serious course correction required.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LifeScoreCard;


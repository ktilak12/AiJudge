import React from 'react';
import { Briefcase, Zap, HeartPulse, Clock, Repeat } from 'lucide-react';

const categoryMeta = {
  productivity: {
    label: 'Productivity',
    icon: Briefcase,
    color: '#3B82F6',
    border: 'border-blue-500/20'
  },
  discipline: {
    label: 'Discipline',
    icon: Zap,
    color: '#EF4444',
    border: 'border-red-500/20'
  },
  health: {
    label: 'Health & Recovery',
    icon: HeartPulse,
    color: '#22C55E',
    border: 'border-emerald-500/20'
  },
  timeManagement: {
    label: 'Time Management',
    icon: Clock,
    color: '#F97316',
    border: 'border-orange-500/20'
  },
  consistency: {
    label: 'Consistency',
    icon: Repeat,
    color: '#A855F7',
    border: 'border-purple-500/20'
  }
};

export const CategoryScoreCard = ({ categoryKey, score = 0, reason = '' }) => {
  const meta = categoryMeta[categoryKey] || {
    label: categoryKey,
    icon: Zap,
    color: '#EF4444',
    border: 'border-border-subtle'
  };

  const Icon = meta.icon;

  const getScoreColor = (s) => {
    if (s >= 80) return 'text-accent-green';
    if (s >= 60) return 'text-accent-orange';
    return 'text-accent-red';
  };

  return (
    <div className={`p-4 rounded-xl bg-card-bg border ${meta.border} hover:border-border-highlight transition-all space-y-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${meta.color}15`, color: meta.color }}
          >
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-primary-text">{meta.label}</span>
        </div>
        <span className={`text-sm font-mono font-bold ${getScoreColor(score)}`}>
          {score}<span className="text-[10px] text-secondary-text">/100</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-[#202020] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(100, Math.max(0, score))}%`,
            backgroundColor: meta.color
          }}
        />
      </div>

      {/* Reason */}
      <p className="text-[11px] text-secondary-text leading-relaxed">
        {reason || 'No breakdown available.'}
      </p>
    </div>
  );
};

export default CategoryScoreCard;


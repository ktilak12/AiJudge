import React from 'react';
import { Target, ArrowRightCircle } from 'lucide-react';

export const ImprovementCard = ({ improvements = [] }) => {
  return (
    <div className="rounded-2xl bg-card-bg border border-border-subtle p-6 space-y-4">
      <div className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Target className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-primary-text">3-POINT CORRECTION PROTOCOL</h3>
          <span className="text-[10px] text-secondary-text font-mono">NON-NEGOTIABLE REFINEMENTS</span>
        </div>
      </div>

      <div className="space-y-3">
        {improvements.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3.5 rounded-xl bg-secondary-bg/80 border border-border-subtle hover:border-blue-500/30 transition-colors"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-mono text-xs font-bold flex items-center justify-center">
              0{index + 1}
            </span>
            <p className="text-xs text-gray-300 leading-relaxed pt-0.5">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImprovementCard;


import React, { useState } from 'react';
import { Flame, CheckCircle2, Circle } from 'lucide-react';

export const TomorrowChallengeCard = ({ challenge }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-card-bg to-[#1c1414] border border-accent-orange/30 p-6 space-y-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center">
            <Flame className="w-4 h-4 text-accent-orange animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary-text">TOMORROW'S MANDATORY CHALLENGE</h3>
            <span className="text-[10px] text-accent-orange font-mono">EXECUTION MANDATE</span>
          </div>
        </div>

        <button
          onClick={() => setAccepted(!accepted)}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
            accepted
              ? 'bg-accent-green/20 text-accent-green border border-accent-green/40'
              : 'bg-card-bg text-secondary-text hover:text-white border border-border-subtle'
          }`}
        >
          {accepted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Accepted</span>
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5" />
              <span>Accept Challenge</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 rounded-xl bg-secondary-bg/90 border border-accent-orange/20">
        <p className="text-sm text-primary-text font-medium leading-relaxed">
          {challenge || 'Complete your highest-leverage postponed task within the first 90 minutes of your workday.'}
        </p>
      </div>
    </div>
  );
};

export default TomorrowChallengeCard;


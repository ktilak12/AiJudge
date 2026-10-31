import React from 'react';
import { Gavel, Quote } from 'lucide-react';

export const VerdictCard = ({ verdict, personality = 'Savage but Fair', confidence = 'medium' }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card-bg border border-accent-red/30 p-6 shadow-card hover:border-accent-red/50 transition-all">
      {/* Decorative red accent top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-red via-accent-orange to-accent-red"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent-red/10 border border-accent-red/20 flex items-center justify-center">
            <Gavel className="w-4 h-4 text-accent-red" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide text-primary-text">SUPREME COURT VERDICT</h3>
            <span className="text-[10px] font-mono text-secondary-text">PRESIDING JUDGE: {personality.toUpperCase()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-secondary-text">
            CONFIDENCE: {confidence.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="relative pl-4 border-l-2 border-accent-red/40 py-1 my-2">
        <Quote className="w-5 h-5 text-accent-red/20 absolute -top-2 -left-2.5 -z-0" />
        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans font-medium italic">
          "{verdict}"
        </p>
      </div>
    </div>
  );
};

export default VerdictCard;


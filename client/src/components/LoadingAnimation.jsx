import React, { useState, useEffect } from 'react';
import { Scale, BrainCircuit, ShieldAlert, Cpu } from 'lucide-react';

const messages = [
  'Analysing your excuses...',
  'Calculating productivity...',
  'Reviewing your decisions...',
  'Cross-examining reported hours...',
  'Measuring distraction drag...',
  'Preparing your verdict...'
];

export const LoadingAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md px-4">
      <div className="relative flex items-center justify-center mb-8">
        {/* Radar concentric glow circles */}
        <div className="absolute w-44 h-44 rounded-full border border-accent-red/20 animate-ping"></div>
        <div className="absolute w-32 h-32 rounded-full border border-accent-red/40 animate-pulse"></div>
        <div className="absolute w-24 h-24 rounded-full bg-accent-red/10 blur-xl"></div>

        {/* Center Icon */}
        <div className="relative w-20 h-20 rounded-2xl bg-card-bg border border-accent-red flex items-center justify-center shadow-glow-red z-10">
          <Scale className="w-10 h-10 text-accent-red animate-bounce" />
        </div>
      </div>

      <div className="text-center space-y-3 max-w-md">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-wider text-white">
          THE JUDGE IS REVIEWING YOUR DECISIONS...
        </h2>
        
        {/* Rotating status pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-secondary-bg border border-border-subtle shadow-card">
          <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse"></span>
          <span className="text-xs font-mono text-accent-red font-medium tracking-wide min-h-[1.25rem]">
            {messages[currentIndex]}
          </span>
        </div>

        <p className="text-xs text-secondary-text font-mono pt-2">
          EVIDENCE HASH VERIFIED • DO NOT CLOSE COURT
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;


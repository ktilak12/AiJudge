import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Copy, Check, Share2, Send, Scale } from 'lucide-react';

export const ShareModal = ({ isOpen, onClose, judgement }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !judgement) return null;

  const score = judgement.overallScore;
  const label = judgement.performanceLabel;
  const verdict = judgement.verdict;

  const shareText = `⚖️ LIFE JUDGE AI VERDICT:
Today's Life Score: ${score}/100 (${label})
Verdict: "${verdict}"

Think you can score higher? Face the Judge: https://lifejudge.ai`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-card-bg border border-border-subtle p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-accent-red" />
            <h3 className="text-base font-bold text-white">Share Your Verdict</h3>
          </div>
          <button
            onClick={onClose}
            className="text-secondary-text hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Preview Card */}
        <div className="p-4 rounded-xl bg-secondary-bg border border-border-subtle space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-secondary-text pb-2 border-b border-border-subtle">
            <span>OFFICIAL LIFE JUDGE SUMMARY</span>
            <span className="text-accent-red font-bold">{score}/100</span>
          </div>
          <p className="text-primary-text italic font-sans leading-relaxed">
            "{verdict}"
          </p>
          <div className="text-[11px] text-accent-orange font-semibold">
            Status: {label}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-accent-red text-white text-xs font-semibold hover:bg-red-600 transition shadow-glow-red"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Shareable Text'}</span>
          </button>

          <button
            onClick={handleTwitterShare}
            className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold transition"
          >
            <Send className="w-4 h-4" />
            <span>Post to X</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Sparkles } from 'lucide-react';
import { speakVerdict, stopVerdictSpeech } from '../utils/speech';

export const AudioJudgeVoice = ({ verdict, personality = 'Savage but Fair', score, label }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSupported(false);
    }
    return () => {
      stopVerdictSpeech();
    };
  }, []);

  const handleToggleVoice = () => {
    if (isPlaying) {
      stopVerdictSpeech();
      setIsPlaying(false);
    } else {
      const fullSpeechText = `Court is in session. The Judge has evaluated your decisions. Your life score is ${score} out of 100, categorized as ${label}. Official verdict: ${verdict}`;
      speakVerdict({
        text: fullSpeechText,
        personality,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false)
      });
    }
  };

  if (!supported) return null;

  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-secondary-bg/90 border border-border-subtle hover:border-accent-red/30 transition-all">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleToggleVoice}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
            isPlaying
              ? 'bg-accent-red text-white shadow-glow-red animate-pulse'
              : 'bg-card-bg text-secondary-text hover:text-white border border-border-subtle'
          }`}
          title={isPlaying ? 'Mute Judge Voice' : 'Listen to Supreme Verdict'}
        >
          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-white">Audio Court Transcript</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-accent-red/10 text-accent-red border border-accent-red/20">
              {personality.toUpperCase()}
            </span>
          </div>
          <p className="text-[11px] text-secondary-text">
            {isPlaying ? 'Synthesizing voice playback...' : 'Listen to the Judge pronounce your verdict'}
          </p>
        </div>
      </div>

      {/* Waveform graphic */}
      {isPlaying ? (
        <div className="flex items-end space-x-1 h-5 px-2">
          <span className="w-1 bg-accent-red rounded-full animate-bounce h-3"></span>
          <span className="w-1 bg-accent-red rounded-full animate-bounce h-5 delay-75"></span>
          <span className="w-1 bg-accent-red rounded-full animate-bounce h-2 delay-150"></span>
          <span className="w-1 bg-accent-red rounded-full animate-bounce h-4 delay-100"></span>
        </div>
      ) : (
        <button
          onClick={handleToggleVoice}
          className="text-xs font-mono text-accent-red hover:underline flex items-center space-x-1 font-semibold"
        >
          <span>Play Voice</span>
          <Radio className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default AudioJudgeVoice;

// Audio synthesis engine using the Web Speech API with persona-tuned modulation

export const getPersonaVoiceSettings = (personality) => {
  switch (personality) {
    case 'Strict Professor':
      return { pitch: 0.9, rate: 0.95 };
    case 'Supportive Mentor':
      return { pitch: 1.05, rate: 1.0 };
    case 'Sarcastic Comedian':
      return { pitch: 1.2, rate: 1.15 };
    case 'Savage but Fair':
    default:
      return { pitch: 0.85, rate: 0.98 };
  }
};

export const speakVerdict = ({ text, personality, onStart, onEnd, onError }) => {
  if (!('speechSynthesis' in window)) {
    if (onError) onError('Speech synthesis is not supported on this browser.');
    return;
  }

  // Cancel any running speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const settings = getPersonaVoiceSettings(personality);

  utterance.pitch = settings.pitch;
  utterance.rate = settings.rate;

  // Attempt to select a clear English voice if available
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(
    (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David'))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    if (onError) onError(e.error);
  };

  window.speechSynthesis.speak(utterance);
};

export const stopVerdictSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

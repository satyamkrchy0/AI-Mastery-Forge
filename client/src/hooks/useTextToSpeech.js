import { useState, useEffect, useCallback } from 'react';

export default function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  // Simple markdown stripper for better speech
  const stripMarkdown = (text) => {
    if (!text) return '';
    return text
      .replace(/```[\s\S]*?```/g, ' Code snippet omitted. ') // Remove code blocks
      .replace(/`.*?`/g, '') // Remove inline code
      .replace(/[#*_~\[\]>|]/g, '') // Remove formatting characters
      .replace(/https?:\/\/\S+/g, 'link') // Remove URLs
      .trim();
  };

  const speak = useCallback((text) => {
    if (!isSupported) return;

    // Stop anything currently speaking
    window.speechSynthesis.cancel();

    const cleanText = stripMarkdown(text);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Pick an English voice, preferably a natural sounding one
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Female')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return { isSpeaking, speak, stop, isSupported };
}

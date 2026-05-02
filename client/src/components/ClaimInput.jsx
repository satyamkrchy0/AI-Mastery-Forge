import React, { useState, useCallback } from 'react';
import styles from './ClaimInput.module.css';
import useVoiceRecognition from '../hooks/useVoiceRecognition';

const EXAMPLE_CLAIMS = [
  "Explain the difference between A* and Best-first search with Python examples",
  "How do I implement a simple MLP using PyTorch?",
  "What is the mathematical intuition behind cross-validation?",
  "Explain Attention mechanism in Transformers like I am 5",
  "How do Diffusion models generate images compared to GANs?"
];

export default function ClaimInput({ onVerify, isLoading }) {
  const [claim, setClaim] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    setClaim(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleVoiceResult = useCallback((text) => {
    setClaim((prev) => {
      const newText = prev ? `${prev} ${text}` : text;
      setCharCount(newText.length);
      return newText;
    });
  }, []);

  const { isListening, toggleListening, isSupported } = useVoiceRecognition(handleVoiceResult);

  const handleSubmit = () => {
    if (claim.trim().length >= 10 && !isLoading) onVerify({ claim: claim.trim() });
  };

  const handleExample = (example) => {
    setClaim(example);
    setCharCount(example.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputHeader}>
          <label className={styles.label} htmlFor="claim-input">
            <span className={styles.labelIcon}>🐍</span>
            AI Concept or Python Challenge
          </label>
          <span className={`${styles.charCount} ${charCount > 800 ? styles.charCountWarn : ''}`}>
            {charCount}/1000
          </span>
        </div>

        <div className={styles.textareaContainer}>
          <textarea
            id="claim-input"
            className={styles.textarea}
            value={claim}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about AI concepts, search algorithms, deep neural networks, generative AI, or Python implementations...&#10;&#10;e.g. &quot;How does a CNN capture spatial features in an image?&quot;"
            rows={6}
            maxLength={1000}
            disabled={isLoading}
          />
          {isSupported && (
            <button 
              className={`${styles.micButton} ${isListening ? styles.listening : ''}`} 
              onClick={toggleListening}
              title={isListening ? "Stop listening" : "Start voice input"}
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
          )}
        </div>

        <div className={styles.inputFooter}>
          <span className={styles.hint}>Press Ctrl+Enter to optimize</span>
          <button
            id="verify-claim-btn"
            className="btn-primary"
            onClick={handleSubmit}
            disabled={isLoading || claim.trim().length < 10}
          >
            {isLoading ? (
              <>
                <span className={styles.spinnerSmall}/>
                Synthesizing...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Generate Code & Strategy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Example pills */}
      <div className={styles.examples}>
        <span className={styles.examplesLabel}>Try an example:</span>
        <div className={styles.examplePills}>
          {EXAMPLE_CLAIMS.map((ex, i) => (
            <button
              key={i}
              className={styles.pill}
              onClick={() => handleExample(ex)}
              disabled={isLoading}
              title={ex}
            >
              {ex.length > 42 ? ex.slice(0, 42) + '…' : ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

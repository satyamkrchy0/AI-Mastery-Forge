import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './ResultCard.module.css';
import useVoiceRecognition from '../hooks/useVoiceRecognition';
import useTextToSpeech from '../hooks/useTextToSpeech';

export default function ResultCard({ result, onReset, onFollowUp, isLoading }) {
  const [ocrExpanded, setOcrExpanded] = useState(false);
  const [followUpText, setFollowUpText] = useState('');
  const [pendingMessage, setPendingMessage] = useState('');
  const chatEndRef = useRef(null);

  const handleVoiceResult = useCallback((text) => {
    setFollowUpText((prev) => {
      return prev ? `${prev} ${text}` : text;
    });
  }, []);

  const { isListening, toggleListening, isSupported: isMicSupported } = useVoiceRecognition(handleVoiceResult);
  const { isSpeaking, speak, stop, isSupported: isTtsSupported } = useTextToSpeech();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [result, isLoading]);

  const handleFollowUpSubmit = (e) => {
    e.preventDefault();
    if (!followUpText.trim() || isLoading) return;
    onFollowUp({ claim: followUpText });
    setPendingMessage(followUpText);
    setFollowUpText('');
  };

  if (!result) return null;

  const history = result.verdict?.history || [];
  const hasHistory = history.length > 0;
  
  // If no history, fallback to the latest markdown
  const fallbackMarkdown = result.verdict?.markdown || '*No strategy generated.*';

  return (
    <div className={styles.card} id="result-card">
      {/* ── Chat Header ── */}
      <div
        className={styles.verdictBanner}
        style={{ background: 'rgba(155, 126, 248, 0.06)', border: '1px solid rgba(155, 126, 248, 0.2)', boxShadow: '0 0 40px rgba(155, 126, 248, 0.1)' }}
      >
        <div className={styles.verdictLeft}>
          <div className={styles.verdictIconWrap} style={{ background: '#9b7ef820', border: '1px solid rgba(155, 126, 248, 0.2)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9b7ef8" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <div>
            <div className={styles.verdictLabel} style={{ color: '#9b7ef8' }}>
              🤖 AI MASTERY TUTOR
            </div>
            <div className={styles.verdictHeadline}>
              Your interactive Python AI learning session.
            </div>
          </div>
        </div>
      </div>

      {/* ── Chat History ── */}
      <div className={styles.chatContainer}>
        {hasHistory ? (
          history.map((msg, idx) => {
            const isUser = msg.role === 'user';
            const text = msg.parts?.[0]?.text || '';
            return (
              <div key={idx} className={`${styles.chatMessage} ${isUser ? styles.userMessage : styles.modelMessage}`}>
                <div className={styles.chatAvatar}>
                  {isUser ? '👤' : '🧠'}
                </div>
                <div className={styles.chatBubble}>
                  {isUser ? (
                    <p>{text}</p>
                  ) : (
                    <div className={styles.modelContentWrapper}>
                      {isTtsSupported && (
                        <button 
                          className={styles.ttsButton} 
                          onClick={() => speak(text)}
                          title="Read aloud"
                          type="button"
                        >
                          🔊
                        </button>
                      )}
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => <h1 className={styles.mdH1} {...props} />,
                          h2: ({node, ...props}) => <h2 className={styles.mdH2} {...props} />,
                          h3: ({node, ...props}) => <h3 className={styles.mdH3} {...props} />,
                          p: ({node, ...props}) => <p className={styles.mdP} {...props} />,
                          ul: ({node, ...props}) => <ul className={styles.mdUl} {...props} />,
                          li: ({node, ...props}) => <li className={styles.mdLi} {...props} />,
                        }}
                      >
                        {text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className={`${styles.chatMessage} ${styles.modelMessage}`}>
            <div className={styles.chatAvatar}>🧠</div>
            <div className={styles.chatBubble}>
              <div className={styles.modelContentWrapper}>
                {isTtsSupported && (
                  <button 
                    className={styles.ttsButton} 
                    onClick={() => speak(fallbackMarkdown)}
                    title="Read aloud"
                    type="button"
                  >
                    🔊
                  </button>
                )}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{fallbackMarkdown}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
        
        {/* ── Pending Message & Typing Indicator ── */}
        {isLoading && pendingMessage && (
          <div className={`${styles.chatMessage} ${styles.userMessage}`}>
            <div className={styles.chatAvatar}>👤</div>
            <div className={styles.chatBubble}>
              <p>{pendingMessage}</p>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className={`${styles.chatMessage} ${styles.modelMessage}`}>
            <div className={styles.chatAvatar}>🧠</div>
            <div className={styles.chatBubble}>
              <p className={styles.typingIndicator}>AI Tutor is thinking...</p>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* ── Footer / Meta ── */}
      <div className={`${styles.footer} no-print`}>
        <div className={styles.metaInfo}>
          ⚡ Synthesized in {(result.meta?.processingTimeMs / 1000).toFixed(1)}s
        </div>
        <div className={styles.footerButtons}>
          <button
            id="verify-another-btn"
            className="btn-secondary"
            onClick={onReset}
          >
            ↺ Restart Session
          </button>
        </div>
      </div>

      {/* ── Follow Up Question (Chat Input) ── */}
      <div className={`${styles.followUpSection} no-print`}>
        <form onSubmit={handleFollowUpSubmit} className={styles.followUpForm}>
          <div className={styles.inputContainer}>
            <input 
              type="text" 
              placeholder="Type your reply to the AI tutor..." 
              value={followUpText}
              onChange={(e) => setFollowUpText(e.target.value)}
              className={styles.followUpInput}
              disabled={isLoading}
            />
            {isMicSupported && (
              <button 
                type="button"
                className={`${styles.micButton} ${isListening ? styles.listening : ''}`} 
                onClick={toggleListening}
                title={isListening ? "Stop listening" : "Start voice input"}
                disabled={isLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
            )}
          </div>
          <button type="submit" className={styles.followUpBtn} disabled={isLoading}>
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

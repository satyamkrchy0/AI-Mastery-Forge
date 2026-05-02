import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="30" height="30" rx="6" fill="url(#grad1)"/>
              <path d="M12 20l6 6 10-10" stroke="#050b1f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9b7ef8"/>
                  <stop offset="1" stopColor="#4fa3ff"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>AI<span className={styles.logoDash}>-</span>Mastery</span>
            <span className={styles.logoSub}>Forge Python Engine</span>
          </div>
        </div>

        <div className={styles.badges}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} style={{background:'#9b7ef8'}}/>
            Gemini AI
          </span>
          <span className={styles.badge}>
            <span className={styles.badgeDot} style={{background:'#ffba3b'}}/>
            Python ML/DL
          </span>
        </div>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroTag}>🧠 Domain-Specific Intelligence for Python & AI Mastery</div>
        <h1 className={styles.heroTitle}>
          Advanced AI Course<br/>
          <span className={styles.heroGradient}>Mastery System</span>
        </h1>
        <p className={styles.heroDesc}>
          Transform your understanding of Foundations of AI, Machine Learning, Deep Neural Networks, and Generative AI into practical Python code.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>Python</span>
            <span className={styles.statLabel}>Centric</span>
          </div>
          <div className={styles.statDivider}/>
          <div className={styles.stat}>
            <span className={styles.statNum}>Neural</span>
            <span className={styles.statLabel}>Architectures</span>
          </div>
          <div className={styles.statDivider}/>
          <div className={styles.stat}>
            <span className={styles.statNum}>Gemini</span>
            <span className={styles.statLabel}>AI Reasoning</span>
          </div>
        </div>
      </div>
    </header>
  );
}

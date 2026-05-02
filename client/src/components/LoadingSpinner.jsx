import React from 'react';
import styles from './LoadingSpinner.module.css';

const STEPS = [
  { id: 1, icon: '👁', label: 'OCR Processing', sublabel: 'Gemini Vision extracting text from document...' },
  { id: 2, icon: '⚙️', label: 'Constraint Mapping', sublabel: 'Analyzing temporal and cognitive limitations...' },
  { id: 3, icon: '🧠', label: 'Strategic Synthesis', sublabel: 'Generating and evaluating multiple pathways...' },
  { id: 4, icon: '🏆', label: 'Blueprint Assembly', sublabel: 'Gemini AI finalizing optimal strategy...' },
];

export default function LoadingSpinner({ hasImage = false }) {
  return (
    <div className={styles.container} role="status" aria-label="Optimizing challenge...">
      <div className={styles.orb}>
        <div className={styles.orbInner}>
          <div className={styles.orbCore}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="url(#orbGrad)" strokeWidth="1.5"/>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="url(#orbGrad)" strokeWidth="2" strokeLinecap="round"/>
              <defs>
                <linearGradient id="orbGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9b7ef8"/>
                  <stop offset="1" stopColor="#4fa3ff"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className={styles.ring1}/>
        <div className={styles.ring2}/>
        <div className={styles.ring3}/>
      </div>

      <div className={styles.text}>
        <h3 className={styles.title}>Synthesizing Academic Strategy</h3>
        <p className={styles.subtitle}>Calculating optimal learning pathways...</p>
      </div>

      <div className={styles.steps}>
        {STEPS.filter(s => hasImage || s.id !== 1).map((step, i) => (
          <div key={step.id} className={styles.step} style={{ animationDelay: `${i * 0.15}s` }}>
            <div className={styles.stepIconWrap}>
              <span className={styles.stepIcon}>{step.icon}</span>
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepLabel}>{step.label}</div>
              <div className={styles.stepSublabel}>{step.sublabel}</div>
              <div className={styles.stepBar}>
                <div className={styles.stepBarFill} style={{ animationDelay: `${i * 0.4}s` }}/>
              </div>
            </div>
            <div className={styles.stepStatus}>
              <div className={styles.statusDot}/>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.disclaimer}>
        🔒 Your data is processed securely · Results are for educational optimization
      </div>
    </div>
  );
}

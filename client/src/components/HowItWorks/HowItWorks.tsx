import type { ReactNode } from "react";
import styles from "./HowItWorks.module.css";

interface Step {
  title: string;
  text: string;
  icon: ReactNode;
}


const BookIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
    <path d="M4 21V5" />
    <path d="M9 8h6M9 12h4" />
  </svg>
);

const QuizIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M7 9l2 2 3-3" />
    <path d="M7 15h10" />
  </svg>
);

const SearchIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.5-4.5" />
    <path d="M9 11h4" />
  </svg>
);

const STEPS: Step[] = [
  {
    title: "Read a short lesson",
    text: "About three minutes each, with real-looking examples and the red flags to watch for.",
    icon: BookIcon,
  },
  {
    title: "Take the quiz",
    text: "Pick the trustworthy headline, spot the edited photo, decide what to share.",
    icon: QuizIcon,
  },
  {
    title: "See what you missed",
    text: "Every answer comes with an explanation, and your best score goes on the leaderboard.",
    icon: SearchIcon,
  },
];

// Three-step explainer on the home page
export default function HowItWorks() {
  return (
    <section className={styles.band} aria-labelledby="how-it-works">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>3 simple steps</span>
          <h2 id="how-it-works" className={styles.heading}>
            How it works
          </h2>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className={styles.step}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className={styles.top}>
                <span className={styles.icon} aria-hidden="true">
                  {step.icon}
                </span>
                <span className={styles.number}>Step {i + 1}</span>
              </div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
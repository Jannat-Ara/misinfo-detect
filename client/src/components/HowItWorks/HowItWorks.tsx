import styles from "./HowItWorks.module.css";

interface Step {
  title: string;
  text: string;
}


const STEPS: Step[] = [
  {
    title: "Read a short lesson",
    text: "About three minutes each, with real-looking examples and the red flags to watch for.",
  },
  {
    title: "Take the quiz",
    text: "Pick the trustworthy headline, spot the edited photo, decide what to share.",
  },
  {
    title: "See what you missed",
    text: "Every answer comes with an explanation, and your best score goes on the leaderboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.band} aria-labelledby="how-it-works">
      <div className={styles.inner}>
        <h2 id="how-it-works" className={styles.heading}>
          How it works
        </h2>
        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.number}>{i + 1}</span>
              <div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
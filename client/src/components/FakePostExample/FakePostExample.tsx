import Highlight from "../Highlight/Highlight";
import styles from "./FakePostExample.module.css";


export default function FakePostExample() {
  return (
    <figure className={styles.figure}>
      <div className={styles.post}>
        <div className={styles.account}>
          <div className={styles.avatar} aria-hidden="true" />
          <div className={styles.accountText}>
            <span className={styles.handle}>@truth_alerts_247</span>
            <span className={styles.meta}>
              <Highlight animate delay={1.5}>
                Joined 2 days ago<sup>4</sup>
              </Highlight>
            </span>
          </div>
        </div>

        <p className={styles.text}>
          <Highlight animate delay={0.3}>
            BREAKING<sup>1</sup>
          </Highlight>
          : Scientists{" "}
          <Highlight animate delay={0.7}>
            CONFIRM<sup>2</sup>
          </Highlight>{" "}
          your phone is secretly recording{" "}
          <Highlight animate delay={1.1}>
            EVERYTHING you say!!!<sup>3</sup>
          </Highlight>
        </p>

        <div className={styles.stats}>
          <span>41.2K shares</span>
          <span>Share before they delete this</span>
        </div>
      </div>

      <figcaption>
        <ol className={styles.flags}>
          <li>Urgent label, but no date or link to a real report</li>
          <li>“Scientists” with no name, university or study</li>
          <li>Absolute words and shouting instead of evidence</li>
          <li>A brand-new account with a huge reach</li>
        </ol>
      </figcaption>
    </figure>
  );
}
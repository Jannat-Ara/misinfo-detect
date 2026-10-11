import { useNavigate } from "react-router-dom";
import NameForm from "../components/NameForm/NameForm";
import FakePostExample from "../components/FakePostExample/FakePostExample";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import styles from "./Home.module.css";


export default function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <h1 className={styles.title}>Learn to spot the fake before you share it.</h1>
          <p className={styles.lead}>
            Twelve short lessons on clickbait, edited photos, deepfakes and more. Each one ends with a quiz that
            shows you what you missed and why.
          </p>
         
          <NameForm buttonLabel="Start learning" onSaved={() => navigate("/lessons")} />
        </div>
        <FakePostExample />
      </section>

      <HowItWorks />
    </main>
  );
}
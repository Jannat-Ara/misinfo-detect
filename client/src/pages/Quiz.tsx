import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../components/Page/Page";
import NameForm from "../components/NameForm/NameForm";
import QuizRunner from "../components/QuizRunner/QuizRunner";
import StatusMessage from "../components/StatusMessage/StatusMessage";
import { api } from "../api";
import { usePlayer } from "../hooks/usePlayer";
import type { Lesson } from "../types";
import styles from "./Quiz.module.css";


export default function Quiz() {
  const lessonNumber = Number(useParams().number);
  const { playerName } = usePlayer();

  const [loaded, setLoaded] = useState<Lesson | null>(null);
  const [failed, setFailed] = useState<{ lessonNumber: number; message: string } | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .getLesson(lessonNumber)
      .then((data) => {
        if (!cancelled) setLoaded(data);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Something went wrong.";
        if (!cancelled) setFailed({ lessonNumber, message });
      });

    return () => {
      cancelled = true;
    };
  }, [lessonNumber]);

  const lesson = loaded?.lessonNumber === lessonNumber ? loaded : null;
  const error = failed?.lessonNumber === lessonNumber ? failed.message : null;
  const loading = !lesson && !error;

  if (loading) {
    return (
      <Page narrow>
        <StatusMessage kind="loading">Loading quiz…</StatusMessage>
      </Page>
    );
  }

  if (error || !lesson) {
    return (
      <Page narrow>
        <StatusMessage kind="error">{error}</StatusMessage>
      </Page>
    );
  }

  if (!playerName) {
    return (
      <Page narrow>
        <h1 className={styles.title}>Before you start</h1>
        <p className={styles.lead}>Your score is saved under this name.</p>
        <NameForm buttonLabel="Start the quiz" />
      </Page>
    );
  }

  if (lesson.questions.length === 0) {
    return (
      <Page narrow>
        <StatusMessage kind="empty">This lesson has no questions yet.</StatusMessage>
      </Page>
    );
  }


  return (
    <Page narrow>
      <QuizRunner key={lesson._id} lesson={lesson} playerName={playerName} />
    </Page>
  );
}
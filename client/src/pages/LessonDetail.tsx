import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Page from "../components/Page/Page";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import LessonIllustration from "../components/LessonIllustration/LessonIllustration";
import LessonSteps from "../components/LessonSteps/LessonSteps";
import RedFlagChecklist from "../components/RedFlagChecklist/RedFlagChecklist";
import StatusMessage from "../components/StatusMessage/StatusMessage";
import { api } from "../api";
import type { Lesson } from "../types";
import styles from "./LessonDetail.module.css";

export default function LessonDetail() {
  const lessonNumber = Number(useParams().number);

  const [loaded, setLoaded] = useState<Lesson | null>(null);
  const [failed, setFailed] = useState<{ lessonNumber: number; message: string } | null>(null);
  // Which lesson the player finished reading (so it resets on a new lesson)
  const [finishedFor, setFinishedFor] = useState<number | null>(null);

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
      <Page>
        <StatusMessage kind="loading">Loading lesson…</StatusMessage>
      </Page>
    );
  }

  if (error || !lesson) {
    return (
      <Page>
        <StatusMessage kind="error">{error}</StatusMessage>
        <div>
          <Button variant="ghost" to="/lessons">
            Back to all lessons
          </Button>
        </div>
      </Page>
    );
  }

  const questionCount = lesson.questions.length;
  const finishedReading = finishedFor === lesson.lessonNumber || lesson.content.length <= 1;

  return (
    <Page>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <Link to="/lessons" className={styles.backLink}>
          ← All lessons
        </Link>
        <span aria-hidden="true">/</span>
        <span>Lesson {lesson.lessonNumber}</span>
      </nav>

      <header className={styles.hero}>
        <LessonIllustration lessonNumber={lesson.lessonNumber} size={120} framed />
        <div className={styles.heading}>
          <h1 className={styles.title}>{lesson.title}</h1>
          <p className={styles.summary}>{lesson.summary}</p>
        </div>
      </header>

      <div className={styles.body}>
        {/* key resets the steps when the player moves to another lesson */}
        <LessonSteps
          key={lesson.lessonNumber}
          paragraphs={lesson.content}
          onFinish={() => setFinishedFor(lesson.lessonNumber)}
        />

        <Card as="aside" className={styles.aside} aria-labelledby="red-flags">
          <h2 id="red-flags" className={styles.asideTitle}>
            Red flags to look for
          </h2>
          <RedFlagChecklist key={lesson.lessonNumber} tips={lesson.tips} />
          <div className={finishedReading ? `${styles.quizBox} ${styles.ready}` : styles.quizBox}>
            <p className={styles.count}>
              {questionCount} {questionCount === 1 ? "question" : "questions"}
            </p>
            <Button to={`/lessons/${lesson.lessonNumber}/quiz`}>Take the quiz</Button>
          </div>
        </Card>
      </div>
    </Page>
  );
}
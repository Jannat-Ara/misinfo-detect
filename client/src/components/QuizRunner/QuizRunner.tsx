import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import ProgressBar from "../ProgressBar/ProgressBar";
import QuestionView from "../QuestionView/QuestionView";
import FeedbackPanel from "../FeedbackPanel/FeedbackPanel";
import HintBox from "../HintBox/HintBox";
import StatusMessage from "../StatusMessage/StatusMessage";
import { useQuiz } from "../../hooks/useQuiz";
import type { Lesson, ResultsState } from "../../types";
import styles from "./QuizRunner.module.css";

interface QuizRunnerProps {
  lesson: Lesson;
  playerName: string;
}


export default function QuizRunner({ lesson, playerName }: QuizRunnerProps) {
  const navigate = useNavigate();
  const quiz = useQuiz(lesson);


  const handleFinish = async () => {
    const result = await quiz.submit(playerName);
    if (!result) return; 
    const state: ResultsState = {
      result,
      questions: lesson.questions,
      lessonTitle: lesson.title,
      tips: lesson.tips,
      hintsUsed: quiz.hintsUsed,
    };
    navigate(`/lessons/${lesson.lessonNumber}/results`, { state });
  };

  return (
    <div className={styles.runner}>
      <div className={styles.top}>
        <Link to={`/lessons/${lesson.lessonNumber}`} className={styles.back}>
          Back to the lesson
        </Link>
        <span className={styles.lessonName}>
          Lesson {lesson.lessonNumber}: {lesson.title}
        </span>
      </div>

      <div className={styles.progress}>
        <span className={styles.count}>
          Question {quiz.index + 1} of {quiz.total}
        </span>
        <ProgressBar value={quiz.index + 1} max={quiz.total} label="Quiz progress" segmented />
      </div>

      <QuestionView question={quiz.question} picked={quiz.picked} feedback={quiz.feedback} onPick={quiz.pick} />


      {quiz.question.hint && (!quiz.feedback || quiz.hintShown) && (
        <HintBox
          hint={quiz.question.hint}
          shown={quiz.hintShown}
          disabled={quiz.feedback !== null}
          onShow={quiz.showHint}
        />
      )}


      <div aria-live="polite" className={styles.messages}>
        {quiz.feedback && <FeedbackPanel feedback={quiz.feedback} questionIndex={quiz.index} />}
        {quiz.error && <StatusMessage kind="error">{quiz.error}</StatusMessage>}
      </div>

      <div className={styles.actions}>
        {!quiz.feedback && (
          <Button onClick={quiz.check} disabled={!quiz.picked || quiz.busy}>
            {quiz.busy ? "Checking…" : "Check answer"}
          </Button>
        )}
        {quiz.feedback && !quiz.isLast && <Button onClick={quiz.next}>Next question</Button>}
        {quiz.feedback && quiz.isLast && (
          <Button onClick={handleFinish} disabled={quiz.busy}>
            {quiz.busy ? "Saving your score…" : "See your results"}
          </Button>
        )}
      </div>
    </div>
  );
}
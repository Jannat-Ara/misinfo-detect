import { useState } from "react";
import { api } from "../api";
import type { CheckResult, Lesson, SubmitResult } from "../types";

interface Answer {
  questionId: string;
  selected: string;
}



export function useQuiz(lesson: Lesson) {
  const [index, setIndex] = useState(0);                         
  const [picked, setPicked] = useState<string | null>(null);     
  const [feedback, setFeedback] = useState<CheckResult | null>(null); 
  const [answers, setAnswers] = useState<Answer[]>([]);          
  const [busy, setBusy] = useState(false);                       
  const [error, setError] = useState("");
  const [hintShown, setHintShown] = useState(false);             
  const [hintsUsed, setHintsUsed] = useState(0);  

  const question = lesson.questions[index];
  const total = lesson.questions.length;
  const isLast = index === total - 1;


  const pick = (optionId: string) => {
    if (!feedback) setPicked(optionId);
  };

    const showHint = () => {
    if (hintShown || feedback) return;
    setHintShown(true);
    setHintsUsed((n) => n + 1);
  };


  const check = async () => {
    if (!picked || busy) return;
    setBusy(true);
    setError("");
    try {
      const result = await api.checkAnswer(lesson.lessonNumber, question._id, picked);
      setFeedback(result);
      setAnswers((prev) => [...prev, { questionId: question._id, selected: picked }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn’t check your answer.");
    } finally {
      setBusy(false);
    }
  };

  
  const next = () => {
   setIndex((i) => i + 1);
    setPicked(null);
    setFeedback(null);
    setHintShown(false);
  };


  const submit = async (playerName: string): Promise<SubmitResult | null> => {
    setBusy(true);
    setError("");
    try {
      return await api.submitQuiz(lesson.lessonNumber, playerName, answers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn’t save your score.");
      return null;
    } finally {
      setBusy(false);
    }
  };

  
  return {
    question, index, total, isLast, picked, feedback, busy, error,
    hintShown, hintsUsed,
    pick, showHint, check, next, submit,
  }
}
import { Router } from "express";
import {
  getAllLessons, getLessonByNumber, getLessonWithAnswers,
  createLesson, updateLesson, deleteLesson,
  addQuestion, updateQuestion, deleteQuestion,
  checkAnswer, submitQuiz,
} from "../controller/lessonController.js";

const router = Router();

// Lessons
router.get("/", getAllLessons);
router.post("/", createLesson);
router.get("/:number", getLessonByNumber);
router.get("/:number/full", getLessonWithAnswers);
router.patch("/:number", updateLesson);
router.delete("/:number", deleteLesson);

// Questions inside a lesson
router.post("/:number/questions", addQuestion);
router.patch("/:number/questions/:questionId", updateQuestion);
router.delete("/:number/questions/:questionId", deleteQuestion);

// Quiz
router.post("/:number/questions/:questionId/check", checkAnswer);
router.post("/:number/submit", submitQuiz);

export default router;
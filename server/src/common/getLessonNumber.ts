import type { Request, Response } from "express";
import { sendResponse } from "./sendResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// Reads :number from the URL; sends a 400 and returns null if it's not a number
export function getLessonNumber(req: Request, res: Response): number | null {
  const n = Number(req.params.number);
  if (Number.isNaN(n)) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Lesson number must be a number.");
    return null;
  }
  return n;
}
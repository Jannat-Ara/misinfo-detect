import type { Response } from "express";


interface ApiResponse<T> {
  success: boolean;
  message: string;
  result?: T | null;
  error?: unknown;
}


export const sendResponse = <T>(
  res: Response,
  status: number,
  message?: string,
  result: T | null = null
): void => {
  const isError = status >= 400;

  const body: ApiResponse<T> = isError
    ? { success: false, message: message ?? "Internal Server Error", error: result }
    : { success: true, message: message ?? "Successfully completed the operation.", result };

  res.status(status).json(body);
};
import type { ErrorRequestHandler, RequestHandler } from "express";
import { sendResponse } from "../common/sendResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// Catches any request that didn't match a route
export const notFound: RequestHandler = (_req, res) => {
  sendResponse(res, HTTP_STATUS.NOT_FOUND, "Wrong URL, please re-check your URL.");
};

// Central error handler: Express knows it's an error handler because it takes 4 arguments
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof SyntaxError && "body" in err) {
    sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Invalid JSON format!");
    return;
  }
  console.error(err);
  sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Something went wrong.");
};
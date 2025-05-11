import { Response } from "express";

interface ResponsePayload {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  payload: ResponsePayload
) => {
  const responsePayload = { ...payload };
  if (responsePayload.error) {
    responsePayload.error = responsePayload.error.message;
  }
  return res.status(statusCode).json(responsePayload);
};

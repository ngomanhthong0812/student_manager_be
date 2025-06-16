import { fetchAllClasses } from "../services/class.service";
import { sendResponse } from "../utils/response-handler";
import { Request, Response } from "express";

export const getAllClasses = async (_req: Request, res: Response) => {
  try {
    const classes = await fetchAllClasses();
    sendResponse(res, 200, {
      success: true,
      message: "successfully",
      data: classes,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, {
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

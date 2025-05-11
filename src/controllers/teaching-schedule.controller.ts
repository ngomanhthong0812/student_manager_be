import { Request, Response } from "express";
import { sendResponse } from "../utils/response-handler";
import { fetchTeachingScheduleByTeacher } from "../services/teaching-schedule.service";

export const getTeachingScheduleByTeacher = async (
  req: Request,
  res: Response
) => {
  const id_gv = parseInt(req.query.id_gv as string, 10);
  const date = req.query.date ? new Date(req.query.date as string) : new Date();

  if (isNaN(id_gv)) {
    throw new Error("Invalid teacher ID");
  }

  try {
    const data = await fetchTeachingScheduleByTeacher(date, id_gv);
    sendResponse(res, 200, {
      success: true,
      message: "Attendance records retrieved successfully.",
      data: data,
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

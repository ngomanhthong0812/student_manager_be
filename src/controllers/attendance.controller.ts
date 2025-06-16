import { Request, Response } from "express";
import {
  fetchAttendancesBySchedule,
  fetchTeacherBySchedule,
  updateAttendanceStatus,
} from "../services/attendance.service";
import { sendResponse } from "../utils/response-handler";

export const getAttendancesBySchedule = async (req: Request, res: Response) => {
  const id_lichday = parseInt(req.params.id_lichday, 10);
  if (isNaN(id_lichday)) {
    throw new Error("Invalid schedule ID");
  }

  try {
    const data = await fetchAttendancesBySchedule(id_lichday);
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

export const getTeacherBySchedule = async (req: Request, res: Response) => {
  const id_lichday = parseInt(req.params.id_lichday, 10);
  if (isNaN(id_lichday)) {
    throw new Error("Invalid schedule ID");
  }

  try {
    const data = await fetchTeacherBySchedule(id_lichday);
    sendResponse(res, 200, {
      success: true,
      message: "Teacher record retrieved successfully.",
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

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const id_lichday = parseInt(req.params.id_lichday, 10);
    const { trangthai, masv } = req.body;

    if (!["present", "absent", "late"].includes(trangthai)) {
      throw new Error("Invalid status value");
    }

    if (!masv) {
      throw new Error("Student ID (masv) is required");
    }

    const result = await updateAttendanceStatus(id_lichday, masv, trangthai);

    sendResponse(res, 200, {
      success: true,
      message: "Attendance status updated",
      data: result,
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

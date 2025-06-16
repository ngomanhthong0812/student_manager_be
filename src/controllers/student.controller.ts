import { Request, Response } from "express";
import {
  create,
  update,
  fetchGetAllStudents,
  remove,
} from "../services/student.service";
import { sendResponse } from "../utils/response-handler";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await fetchGetAllStudents();
    sendResponse(res, 200, {
      success: true,
      message: "User registered successfully",
      data: students,
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

export const createStudent = async (req: Request, res: Response) => {
  try {
    const students = await create(req.body);
    sendResponse(res, 200, {
      success: true,
      message: "Student updated successfully",
      data: students,
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

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const students = await update(Number(id), req.body);
    sendResponse(res, 200, {
      success: true,
      message: "Student updated successfully",
      data: students,
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

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const students = await remove(Number(id));
    sendResponse(res, 200, {
      success: true,
      message: "Student deleted successfully",
      data: students,
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

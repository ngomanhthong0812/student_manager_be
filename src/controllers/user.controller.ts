import { Request, Response } from "express";
import { sendResponse } from "../utils/response-handler";
import { User } from "../models";
import { omit } from "lodash";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.findAll();
    const usersData = users.map((user) =>
      omit(user.toJSON(), ["password_hash"])
    );
    sendResponse(res, 200, {
      success: true,
      message: "Fetched all users successfully",
      data: usersData,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, {
      success: false,
      message: "Internal Server Error",
      error
    });
  }
};

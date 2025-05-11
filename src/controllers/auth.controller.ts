import {
  createUser,
  findOneUser,
  userExists,
  validatePassword,
} from "../services/user.service";
import { Request, Response } from "express";
import { omit } from "lodash";
import { sign } from "../utils/jwt";
import { sendResponse } from "../utils/response-handler";
const omitData = ["password_hash"];

export const register = async (req: Request, res: Response) => {
  try {
    let user = req.body;
    const userExist = await userExists({
      email: user.email,
    });
    if (userExist) {
      throw new Error("Email is alredy used");
    }
    user = await createUser(user);
    const userData = omit(user?.toJSON(), omitData);
    const accessToken = sign({ ...userData });

    sendResponse(res, 200, {
      success: true,
      message: "User registered successfully",
      data: {
        userData,
        accessToken,
      },
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findOneUser({ email });
    if (!user) {
      throw new Error("Password is incorrect");
    }

    const validPassword = await validatePassword(user.email, password);
    if (!validPassword) {
      throw new Error("Password is incorrect");
    }
    const userData = omit(user?.toJSON(), omitData);
    const accessToken = sign({ ...userData });

    sendResponse(res, 200, {
      success: true,
      message: "Login successfully",
      data: accessToken, 
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

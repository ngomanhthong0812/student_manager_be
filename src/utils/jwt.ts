import { jwtConfig } from "../config/config";
import jwt from "jsonwebtoken";
import { StringValue } from "ms";

export const sign = (
  payload: any,
  options = { expiresIn: jwtConfig.expiry as StringValue }
) => {
  return jwt.sign(payload, jwtConfig.secret, options);
};

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    console.log("token", token, { error });
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    } else {
      msg = error;
    }
    return {
      valid: false,
      expired: msg === "jwt expired",
      msg: msg,
      decoded: null as null,
    };
  }
};

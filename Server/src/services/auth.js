import jwt from "jsonwebtoken";
import keys from "../config/key";

export const generateToken = (payload, expired) => {
  return jwt.sign(
    payload, keys.TOKEN_SECRET ,{
        expiresIn : expired
      });
    };
import { Request } from "express";
import { verify } from "jsonwebtoken";
import dbConfig from "../config/mongo";
export const decodeJwt = (request: Request | any) => {
  const token = request.headers.authorization?.split("Bearer ")[1]
  let data:any = {};
  if (token) {
    data = verify(token, dbConfig.key);
  }
  return data;
};

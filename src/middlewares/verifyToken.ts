import { NextFunction, Request, Response } from "express";
import {LoginController} from "../controller/loginController";
const verify =(req:Request, res:Response, next:NextFunction) => {
    if (
      req.url
    ) {
      var token = req.headers["authorization"] as string;
      if (!token)
        return res
          .status(401)
          .send({ auth: false, message: "No token provided." });
      LoginController.verifyAuthentication(
        token.split("Bearer ")[1],
        () => {
          next();
        },
        (desc: string) => {
          return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token. " + desc,
          });
        }
      );
    } else {
      next();
    }
  }
  export default verify;
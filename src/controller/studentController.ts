import { Request, Response } from "express";
import StudentService from "../service/studentService";
import { errorHandle} from "../middlewares/error";
import { IPostStudentDetail } from "../models/StudentModel";
import { decodeJwt } from "../HelperFunction/jwtHelper"
import dbConfig from "../config/mongo";


export class StudentController {
  static postStudentDetail(request:Request,response:Response) {
    try {
      let bodyContent :IPostStudentDetail= request.body;
      StudentService.postStudentDetail(bodyContent)
        .then((data:any) => {
          response.status(200).json(data);
        })
        .catch((e: any) => {
            errorHandle.writeLog(
              "Exception in StudentController - PostStudentDetail",
              e
            );
            response.status(500).send(dbConfig.message.serverError);
          });
      } catch (e:any) {
        errorHandle.writeLog(
          "Exception in StudentController - PostStudentDetail",
          e
        );
        }
  }

  static postManyStudentDetail(request:Request,response:Response) {
    try {
      let bodyContent :IPostStudentDetail= request.body;
      StudentService.postManyStudentDetail(bodyContent)
        .then((data:any) => {
          response.status(200).json(data);
        })
        .catch((e: any) => {
            errorHandle.writeLog(
              "Exception in StudentController - postManyStudentDetail",
              e
            );
            response.status(500).send(dbConfig.message.serverError);
          });
      } catch (e:any) {
        errorHandle.writeLog(
          "Exception in StudentController - postManyStudentDetail",
          e
        );
        }
  }

  static getStudentlist(request: Request, response: Response) {
    try {
        const jwtPayload = decodeJwt(request);
        const queryData= request.query;
        if(jwtPayload && jwtPayload.id){
            StudentService.getStudentlist(jwtPayload.id,queryData)
            .then((data: any) => {
              response.status(200).json(data);
            })
            .catch((e: any) => {
                errorHandle.writeLog(
                "Exception in StudentController - getStudentlist",
                e
              );
              response.status(500).send(dbConfig.message.serverError);
            });
        }else {
                response.status(500).json({ message: "Invalid JWT" })
            }
    } catch (e:any) {
        errorHandle.writeLog(
            "Exception in StudentController - getStudentlist",
            e
          );
          response.status(500).send(dbConfig.message.serverError);
    }
  }

  static getSpecificUser(request: Request, response: Response) {
    try {
        const jwtPayload = decodeJwt(request);
        if(jwtPayload && jwtPayload.id){
            StudentService.getSpecificUser(jwtPayload.id)
            .then((data: any) => {
              response.status(200).json(data);
            })
            .catch((e: any) => {
                errorHandle.writeLog(
                "Exception in StudentController - getSpecificStudent",
                e
              );
              response.status(500).send(dbConfig.message.serverError);
            });
        }else {
                response.status(500).json({ message: "Invalid JWT" })
            }
    } catch (e:any) {
        errorHandle.writeLog(
            "Exception in StudentController - getSpecificStudent",
            e
          );
          response.status(500).send(dbConfig.message.serverError);
    }
  }
  
}

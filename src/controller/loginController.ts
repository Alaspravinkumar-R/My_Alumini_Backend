import { Request, Response } from "express";
import LoginService from "../service/loginService";
import { errorHandle} from "../middlewares/error";

export class LoginController {
  static getLoginDetails(request:Request,response:Response) {
    try {
      let bodyContent = request.body;
      console.log(bodyContent)
      LoginService.getLoginDetails(bodyContent.userName, bodyContent.password)
        .then((data:any) => {
          response.status(200).json(data);
        })
        .catch((e) =>{
          errorHandle.writeLog(
            "Exception in LoginController",
            e
          );
          response.status(500).send(e);

        });
    }catch(e){
      errorHandle.errorConverter;
    };
  }

  static verifyAuthentication(
    token: string,
    successCallback: Function,
    failiureCallback: Function
  ) {
    try {
      LoginService.verifyToken(token, successCallback, failiureCallback);
    } catch(e){
      errorHandle.errorConverter;
    };
  }

  
}

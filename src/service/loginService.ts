import {MongoService} from "../mongo/index";
import dbConfig from "../config/mongo";
import pkg from "jsonwebtoken";
const {sign,verify} = pkg;

import btoa from "btoa";


class LoginService {


  static async getLoginDetails(userName:any, password:string) {
    let flag= true;
    return await MongoService.collectionDetails("user").then((obj) => {
      return obj?.connection
        .findOne({
          $or: [{ rollNumber: userName }, { email: userName },{mobileNumber:parseInt(userName)},{registerNumber:parseInt(userName)}]
        })
        .then((data) => {
          if (!data) {
            flag = false;
          }
          if (data?.password) {
            if (data.password != password) {
              return Promise.reject({
                  auth: false,
                  message: "Password not correct",
                  data: {
                    token: ""
                  },
                });
            }
          }
          let token = "";
          if (flag) {
            token = sign({ id: data?._id }, dbConfig.key , 
            //   {
            //   expiresIn: dbConfig.expire, // expires in 24 hours
            // }
            );
          } else {
            flag = false;
          }
          return new Promise((resolve, reject) => {
            if (flag) {
              resolve({
                auth: true,
                message: "Valid user",
                data: {
                  token: token,
                  name: data?.name,
                  _id: data?._id,
                  email: data?.email,
                  mobileNumber: data?.mobileNumber,
                  rollNumber:data?.rollNumber,
                  registerNumber:data?.registerNumber,
                  userGroup: btoa(JSON.stringify({ group: data?.userGroup }))
                },
              });
            } else {
              reject({
                auth: false,
                message: "Not a valid user",
                data: {
                  token: "",
                },
              });
            }
          });
        })
        .catch((e) => {
          return Promise.reject(e);
        })
        .finally(() => {
          obj?.client.close();
        });
    });
  }

  static verifyToken(
    token: string,
    successCallback: Function,
    failiureCallback: Function
  ) {
    try {
      verify(token, dbConfig.key, function (err) {
        if (err) {
          failiureCallback(err.name);
        } else {
          successCallback();
        }
      });
    } catch (e) {
      failiureCallback();
    }
  }
 
}
export default LoginService;

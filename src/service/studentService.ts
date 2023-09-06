import {MongoService} from "../mongo/index";
import { ObjectId } from "mongodb";
import UserGroup from "../config/roles";

class StudentService {

    static async postStudentDetail(bodyContent:any) {
        return await MongoService.collectionDetails("user").then((obj) => {
            return obj?.connection.insertOne(bodyContent).finally(() => {
              obj?.client.close();
            });
          });
    }

    static async postManyStudentDetail(bodyContent:any) {
        return await MongoService.collectionDetails("user").then((obj) => {
            return obj?.connection.insertMany(bodyContent).finally(() => {
              obj?.client.close();
            });
          });
    }
 
    static async getStudentlist(id:string,queryData:any){
        return await MongoService.collectionDetails("user").then((userobj)=>{
            const projecter: any = { password: 0, userGroup: 0}
            return userobj?.connection.findOne({_id:new ObjectId(id)}).then((data)=>{
              const query: any = {}
              if (queryData.id) {
                query["_id"] =new ObjectId(queryData.id)
              }
              if (queryData.rollNumber) {
                query["rollNumber"] =queryData.rollNumber
              }
              if (queryData.email) {
                query["email"] =queryData.email
              }
              if (queryData.startingYear) {
                query["startingYear"] =parseInt(queryData.startingYear)
              }
              if (queryData.endingYear) {
                query["endingYear"] =parseInt(queryData.endingYear)
              }
              if (queryData.degree) {
                query["degree"] =queryData.degree
              }
              if (queryData.department) {
                query["department"] =queryData.department
              }
              if (queryData.mobileNumber) {
                query["mobileNumber"] =parseInt(queryData.mobileNumber)
              }
              if(data){
                let userGroup = data.userGroup;
                query["userGroup"] =UserGroup.student
                if(userGroup === UserGroup.admin){
                        return userobj?.connection
                          .find(query).project(projecter)
                          .toArray()
                          .finally(() => {
                            userobj?.client.close();
                          });
                     
                }
              }
            })
          })
        }
  
 

  static async getSpecificUser(id:any){
    return await MongoService.collectionDetails("user").then((userobj)=>{
        return userobj?.connection.findOne({_id:new ObjectId(id)}).finally(() => {
            userobj?.client.close();
          });
        }
    )
    }
}

  
export default StudentService;

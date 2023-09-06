import express from "express";
import {StudentController} from "../../controller/studentController";
import validate from "../../middlewares/validate";
import studentValidation from "../../validations/student.validation";
import verify from "../../middlewares/verifyToken";


const route = express.Router();


route.post("/create", validate(studentValidation.studentPostPayload), (request, response) => {
    StudentController.postStudentDetail(request, response);
})
route.post("/many/create", validate(studentValidation.studentManyPostPayload), (request, response) => {
    StudentController.postManyStudentDetail(request, response);
})

route.get("/getStudent",verify, (request, response) => {
    StudentController.getStudentlist(request, response);
})

route.get("/specificUser",verify, (request, response) => {
    StudentController.getSpecificUser(request, response);
})
export default route

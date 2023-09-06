import express from "express";
import {LoginController} from "../../controller/loginController";
import validate from "../../middlewares/validate";
import authValidation from "../../validations/auth.validation";


const route = express.Router();


route.post("/login", validate(authValidation.loginPayload), (request, response) => {
    LoginController.getLoginDetails(request, response);
})

export default route
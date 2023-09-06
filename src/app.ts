import express from "express";
import helmet from "helmet";
import cors from 'cors';
import httpStatus from 'http-status';
import { errorHandle } from "./middlewares/error";
import ApiError from "./utils/ApiError";
import routes from "./routes/v1/index";
import path from "path";

const app = express();

// // set security HTTP headers
app.use(helmet());

// // parse json request body
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

// // parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// // enable cors
app.use(cors());
app.options('*', cors());

// // v1 api routes
app.use('/v1', routes);

// token check

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorHandle.errorConverter);

// handle error
app.use(errorHandle.errorHandler);

export default app;

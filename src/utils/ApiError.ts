class ApiError extends Error {
    constructor(statusCode:any, message:any, isOperational = true, stack = '') {
        super(message);
        statusCode = statusCode;
        isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError

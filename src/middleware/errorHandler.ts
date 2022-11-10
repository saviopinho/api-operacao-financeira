import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helper/ApiError';

class ErrorHandler {
    errorMiddleware = (
        error: Error & ApiError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const statusCode = error.statusCode || 500;
        const message = error.statusCode ? error.message : 'Not Found';

        const error_data = {
            error: { statusCode, message },
        };

        return res.status(statusCode).json(error_data);
    };
}

export default new ErrorHandler();

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICustomError } from '../interfaces/customError.interface';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
    error: ICustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(error.status ?? 500).json({
        error: {
            message: error.message,
            stack: process.env.NODE_ENV === 'dev' ? error.stack : {},
            reqBody: req.body,
            reqHeaders: req.headers,
        },
    });
};

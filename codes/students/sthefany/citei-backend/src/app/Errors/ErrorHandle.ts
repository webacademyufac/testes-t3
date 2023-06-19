import { NextFunction, Request, Response } from 'express';
import { AppError, HttpCode } from './AppError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    console.error(err);
    const { httpCode, message } = err;
    res.status(httpCode).json({ error: message });
  } else {
    console.error(err);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    });
  }
};

export default errorHandler;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import { ValidationError } from 'joi';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message, status: err.status });
  } else if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message, status: 400 });
  } else if (err instanceof JsonWebTokenError) {
    return res.status(err.message === 'jwt expired' ? 401 : 500).json({ message: err.message, status: err.message === 'jwt expired' ? 401 : 500 });
  } else if (err instanceof TokenExpiredError) {
    return res.status(401).json({ message: err.message, status: 401 });
  } else {
    return res.status(500).json({ message: err.toString(), status: 500 });
  }
};

export default errorHandler;

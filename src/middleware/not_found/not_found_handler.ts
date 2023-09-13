import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound());
};

export default notFoundHandler;

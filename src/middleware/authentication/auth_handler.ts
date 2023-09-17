import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from 'http-errors';
import { JWTUtils } from '../../utils';

const authHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw Unauthorized();

    JWTUtils.verifyAccessToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

export default authHandler;

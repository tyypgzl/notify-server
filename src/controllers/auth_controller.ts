import { Request, Response, NextFunction } from 'express';
import { BadRequest, Conflict, NotFound, Unauthorized } from 'http-errors';
import { User } from '../models';

import { ValidationUtils, JWTUtils } from '../utils';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ValidationUtils.auth.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) throw NotFound('User not registered');

    const isPasswordMatch = await user.isValidPassword(result.password);
    if (!isPasswordMatch) throw Unauthorized('Username/Password not valid');

    const accessToken = JWTUtils.signAccessToken(user.id);

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ValidationUtils.auth.validateAsync(req.body);
    if (!result.email || !result.password) throw BadRequest();

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist) throw Conflict(result.email + ' is already exist');

    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = JWTUtils.signAccessToken(savedUser.id);

    res.status(201).json({
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return next(Unauthorized());
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[bearerToken.length - 1];
    const data = JWTUtils.verifyAccessToken(token);
    const deletedUser = await User.findByIdAndDelete(data.aud);

    if (!deletedUser) res.status(404).json({ message: 'User not found', status: 404 });
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};
export default { login, register, remove };

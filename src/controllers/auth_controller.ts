import { Request, Response, NextFunction } from 'express';
import { BadRequest, Conflict, NotFound, Unauthorized } from 'http-errors';
import { User } from '../models';

import { ValidationUtils, JWTUtils } from '../utils';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = ValidationUtils.auth.validate(req.body);
    const { error } = result;
    if (error) throw BadRequest();
    const user = await User.findOne({ email: result.value.email });
    if (!user) throw NotFound('User not registered');

    const isPasswordMatch = await user.isValidPassword(result.value.password);
    if (!isPasswordMatch) throw Unauthorized('Username/Password not valid');

    const accessToken = JWTUtils.signAccessToken(user.id);

    res.status(200).json({
      accessToken: accessToken,
      message: 'success',
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = ValidationUtils.auth.validate(req.body);
    const { value, error } = result;
    if (error) throw BadRequest();

    const doesExist = await User.findOne({ email: value.email });
    if (doesExist) throw Conflict(value.email + ' is already exist');

    const user = new User(value);
    const savedUser = await user.save();
    const accessToken = JWTUtils.signAccessToken(savedUser.id);

    res.status(201).json({
      accessToken,
      message: 'success',
      status: 201,
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

    console.log({ message: 'success', status: 200 });
    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};
export default { login, register, remove };

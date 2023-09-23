import { Request, Response, NextFunction } from 'express';
import { BadRequest, Conflict, NotFound } from 'http-errors';
import { JWTUtils, ValidationUtils } from '../utils';
import { Todo } from '../models';
import { JwtPayload } from 'jsonwebtoken';

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = ValidationUtils.todo.validate(req.body);
    const { value, error } = result;
    if (error) throw BadRequest();

    const doesExist = await Todo.findOne({ id: value.id });
    if (doesExist) throw Conflict('Id:' + value.id + ' is already exist');

    const userId = reqToToken(req);

    const todo = new Todo({ ...value, userId: userId });
    await todo.save();

    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getTodos = async (req: Request, res: Response) => {
  const userId = reqToToken(req);

  const queryActivity = req.query.activity;
  const activityInt = parseInt(queryActivity.toString());
  let activity: number | null = null;

  switch (activityInt) {
    case 0:
      activity = null;
      break;
    case 1:
      activity = 0;
      break;
    case 2:
      activity = 1;
      break;

    default:
      break;
  }

  const result = activity !== null ? await Todo.find({ activity, userId: userId }) : await Todo.find({ userId: userId });
  const todos = result.map(value => {
    const todo = {
      id: value.id,
      title: value.title,
      description: value.description,
      colorNumber: value.colorNumber,
      activity: value.activity,
      createdTime: value.createdTime,
    };
    return todo;
  });

  res.status(200).json({ todos, message: 'success', status: 200 });
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) BadRequest();

    const userId = reqToToken(req);

    const deletedTodo = await Todo.deleteOne({ id, userId });
    if (deletedTodo.deletedCount > 0) {
      res.status(200).json({ message: 'success', status: 200 });
    } else {
      throw NotFound();
    }
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = ValidationUtils.todo.validate(req.body);
    const { value, error } = result;
    if (error) throw BadRequest();

    const doesExist = await Todo.findOne({ id: value.id });
    if (!doesExist) throw Conflict('Id:' + value.id + ' is not already exist');

    const userId = reqToToken(req);

    await Todo.findOneAndUpdate({ id: value.id, userId: userId }, value);
    res.status(200).json({ message: 'success', status: 200 });
  } catch (error) {
    next(error);
  }
};

const reqToToken = (req: Request) => {
  const token = req.headers.authorization.split(' ')[1];
  const jwtPayload: JwtPayload = JWTUtils.verifyAccessToken(token);
  return jwtPayload.aud;
};
export default { getTodos, addTodo, deleteTodo, updateTodo };

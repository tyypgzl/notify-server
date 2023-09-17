import { Request, Response, NextFunction } from 'express';
import { BadRequest, Conflict } from 'http-errors';
import { ValidationUtils } from '../utils';
import { Todo } from '../models';

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = ValidationUtils.todo.validate(req.body);
    const { value, error } = result;
    if (error) throw BadRequest();

    const doesExist = await Todo.findOne({ id: value.id });
    if (doesExist) throw Conflict(value.id + ' is already exist');

    const todo = new Todo(value);
    const savedTodo = await todo.save();
    console.log('Todo:', savedTodo);

    res.status(200).json({
      message: 'success',
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getTodos = (req: Request, res: Response) => {
  console.log('Request: ', req);
  res.status(200).json({});

  console.log('test');
};

const deleteTodo = (req: Request, res: Response) => {
  console.log('Request: ', req);
  res.status(200).json({});

  console.log('test');
};

const updateTodo = (req: Request, res: Response) => {
  console.log('Request: ', req);
  res.status(200).json({});

  console.log('test');
};
export default { getTodos, addTodo, deleteTodo, updateTodo };

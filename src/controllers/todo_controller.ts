import { Request, Response, NextFunction } from 'express';
import { BadRequest, Conflict, NotFound } from 'http-errors';
import { ValidationUtils } from '../utils';
import { Todo } from '../models';

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = ValidationUtils.todo.validate(req.body);
    const { value, error } = result;
    if (error) throw BadRequest();

    const doesExist = await Todo.findOne({ id: value.id });
    if (doesExist) throw Conflict('Id:' + value.id + ' is already exist');

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

const getTodos = async (req: Request, res: Response) => {
  const activity = req.query.activity;

  const result = await Todo.find(activity ? { activity } : null);
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

    const deletedTodo = await Todo.deleteOne({ id });
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

    await Todo.findOneAndUpdate({ id: value.id }, value);
    res.status(200).json({ message: 'success', status: 200 });
  } catch (error) {
    next(error);
  }
};
export default { getTodos, addTodo, deleteTodo, updateTodo };

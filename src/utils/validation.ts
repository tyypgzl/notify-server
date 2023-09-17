import Joi from 'joi';

export const auth = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

export const todo = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().min(2).required(),
  description: Joi.string().optional().allow(null),
  colorNumber: Joi.number().required(),
  activity: Joi.number().min(0).max(1).required(),
  createdTime: Joi.date().required(),
});

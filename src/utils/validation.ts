import Joi from 'joi';

export namespace ValidationUtils {
  export const auth = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
  });
}

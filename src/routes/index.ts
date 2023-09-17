import express from 'express';
import authRoute from './auth/auth_route';
import todoRoute from './todo/todo_route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/todo', todoRoute);

export default router;

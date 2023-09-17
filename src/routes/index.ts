import express from 'express';
import authRoute from './auth/auth_route';
import todoRoute from './todo/todo_route';
import { authHandler } from '../middleware';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/todo', authHandler, todoRoute);

export default router;

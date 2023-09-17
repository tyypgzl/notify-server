import express from 'express';
import TodoController from '../../controllers/todo_controller';

const router = express.Router();

router.get('/all', TodoController.getTodos);
router.post('/add', TodoController.addTodo);
router.put('/', TodoController.updateTodo);
router.delete('/', TodoController.deleteTodo);

export default router;

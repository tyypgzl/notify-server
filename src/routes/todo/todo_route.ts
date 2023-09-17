import express from 'express';
import TodoController from '../../controllers/todo_controller';

const router = express.Router();

router.get('/all', TodoController.getTodos);
router.post('/add', TodoController.addTodo);
router.put('/update', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

export default router;

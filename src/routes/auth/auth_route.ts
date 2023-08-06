import express from 'express';
import AuthController from '../../controllers/auth_controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.delete('/delete', AuthController.remove);

export default router;

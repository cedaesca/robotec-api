import { Router } from 'express';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import auth from './middlewares/auth';

const router = Router();

// Auth endpont
router.post('/auth/login', AuthController.login);

// User endpoints
router.post('/users', UserController.store);
router.get('/users/me', [auth], UserController.show);
router.put('/users/me', [auth], UserController.update);
router.delete('/users/me', [auth], UserController.delete);

export default router;

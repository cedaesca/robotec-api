import { Router } from 'express';
import UserController from './controllers/UserController';
const router = Router();

// User endpoints
router.post('/users', UserController.store);

router
    .route('/users/me')
    .get(UserController.show)
    .put(UserController.update)
    .delete(UserController.delete);

export default router;

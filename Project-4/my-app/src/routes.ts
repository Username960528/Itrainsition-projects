// src/routes.ts
import { Router } from 'express';
import {
  register,
  login,
  getAllUsers,
  blockUsers,
  unblockUsers,
  deleteUsers,
} from './controllers/userController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.put('/users/block', blockUsers);
router.put('/users/unblock', unblockUsers);
router.delete('/users/delete', deleteUsers);

export default router;

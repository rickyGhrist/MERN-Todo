import express from 'express';
import taskRoutes from './tasks.js';
import authRoutes from './auth.js';
import userRoutes from './user.js';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/tasks', taskRoutes);

export default router;

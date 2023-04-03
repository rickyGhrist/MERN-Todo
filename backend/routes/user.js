import express from 'express';
import { getUserInfo, updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/info', getUserInfo);
router.put('/update', updateUser);

export default router;

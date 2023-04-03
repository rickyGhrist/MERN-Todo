import express from 'express';
import {
  createTask, getAll, currentTasks, update, deleteTask,
} from '../controllers/task.js';

const router = express.Router();

router.post('/create', createTask);
router.get('/getAll', getAll);
router.get('/current', currentTasks);
router.put('/:taskId', update);
router.delete('/:taskId', deleteTask);
export default router;

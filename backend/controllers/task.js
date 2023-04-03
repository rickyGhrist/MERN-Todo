import Task from '../models/Task.js';
import { createError } from '../utils/createError.js';

export const createTask = async (req, res, next) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      user: req.user.id,
      completed: req.body.completed,
    });

    const savedTask = await newTask.save();
    return res.status(201).json(savedTask);
  } catch (err) {
    return next(createError({ message: 'Could not save task', status: 400 }));
  }
};

export const getAll = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (err) {
    return next(createError({ message: 'Could not save task', status: 400 }));
  }
};

export const currentTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    return res.status(200).json(tasks);
  } catch (err) {
    return next(createError({ message: 'Could not get tasks', status: 400 }));
  }
};

export const update = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if (!task) {
      return next(createError({ message: 'could not find task to update', status: 404 }));
    }
    if (task.user.toString() !== req.user.id) {
      return next(createError({ message: 'unauthorized', status: 401 }));
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
      title: req.body.title,
      completed: req.body.completed,
    }, {
      new: true,
    });
    return res.status(200).json(updatedTask);
  } catch (err) {
    return next(createError({ message: 'Could not update task', status: 400 }));
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if (!task) {
      return next(createError({ message: 'could not find task to update', status: 404 }));
    }
    if (task.user.toString() !== req.user.id) {
      return next(createError({ message: 'unauthorized', status: 401 }));
    }

    await Task.findByIdAndDelete(req.params.taskId);
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    return next(createError({ message: 'Could not delete task', status: 400 }));
  }
};

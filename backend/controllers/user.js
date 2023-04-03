import User from '../models/User.js';
import { createError } from '../utils/createError.js';

export const getUserInfo = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id).select('name email');
    return res.status(200).json(data);
  } catch (err) {
    return next(createError({ message: 'Could not load user data', status: 404 }));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      name: req.body.name,
      email: req.body.email,
    }, {
      new: true,
    }).select('name email');
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(createError({ message: 'Could not update user', status: 400 }));
  }
};

import jwt from 'jsonwebtoken';
import { createError } from './createError.js';

export const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError({ message: 'no token available', status: 401 }));
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError({ message: 'invalid token', status: 401 }));
    }

    req.user = decoded;
    return next();
  });
};

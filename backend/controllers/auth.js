import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User.js';

export const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.json('Required fields are name, email and password');
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json('New User Created');
  } catch (err) {
    console.log(err);
    return res.json('Server error');
  }
};

export const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.json('Required fields are email and password');
  }

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      'name email password',
    );

    if (!user) {
      return res.status(404).json('No User Found');
    }
    const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);

    if (!isPasswordCorrect) {
      return res.json('invalid action');
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.cookie('access_token', token, {
      httpOnly: true,
    }).status(200).json({ message: 'Login Success' });
  } catch (err) {
    console.log(err);
    return res.json(err.message);
  }
};

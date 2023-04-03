import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const PORT = process.env.PORT || 8000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';
const app = express();

// middleware

app.use(cors());
app.use(morgan('tiny')); // will log routes in terminal
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', allRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(status).json({ message });
});

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log('mongodb connected');
  } catch {
    console.log(`Bad connection string for ${DB_CONNECTION_STRING}`);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`port is running at port ${PORT}`);
});

import express from 'express';

const router = express.Router();

router.get('/auth', (req, res) => {
  res.json('hello auth');
});

export default router;

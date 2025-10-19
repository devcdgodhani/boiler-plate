import { Router } from 'express';
const router = Router();

import authRoute from './authRoute';
import userRoutes from './userRoutes';

router.get('/healthCheck', (req, res) => {
  const now = new Date();
  res.status(200).json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: now.toTimeString().split(' ')[0],
    date: now.toISOString().split('T')[0],
  });
});

router.use('/auth', authRoute);

router.use('/user', userRoutes);

export default router;

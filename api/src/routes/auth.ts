import { Router } from 'express';
import authModuleRoutes from '../modules/auth/route';

const router = Router();

// Use modular auth routes
router.use('/auth', authModuleRoutes);

export default router;

import { Router } from 'express';
import userModuleRoutes from '../modules/user/route';

const router = Router();

// Use modular user routes
router.use('/users', userModuleRoutes);

export default router;

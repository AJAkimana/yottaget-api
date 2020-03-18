import { Router } from 'express';
import userRoutes from './userRoutes';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);

export default apiRoutes;

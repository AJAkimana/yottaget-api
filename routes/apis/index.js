import { Router } from 'express';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import locationRoutes from './locationRoutes';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/products', productRoutes);
apiRoutes.use('/locations', locationRoutes);

export default apiRoutes;

import { Router } from 'express';
import userRoutes from './userRoutes';
import houseRoutes from './houseRoutes';
import locationRoutes from './locationRoutes';
import utilityRoutes from './utilityRoutes';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/houses', houseRoutes);
apiRoutes.use('/locations', locationRoutes);
apiRoutes.use('/utilities', utilityRoutes);

export default apiRoutes;

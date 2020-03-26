import { Router } from 'express';
import { isAdmin, areNewUtilitiesValid, catchErrors } from '../../middlewares';
import { createUtility } from '../../controllers/utilityControllers';

const utilityRoutes = Router();

utilityRoutes.post(
  '/',
  isAdmin,
  areNewUtilitiesValid,
  catchErrors(createUtility)
);

export default utilityRoutes;

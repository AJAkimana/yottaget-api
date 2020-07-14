import { Router } from 'express';
import { isAdmin, areNewUtilitiesValid, catchErrors } from '../../middlewares';
import {
  createUtility,
  getUtilities,
} from '../../controllers/utilityControllers';

const utilityRoutes = Router();

utilityRoutes.post(
  '/',
  isAdmin,
  areNewUtilitiesValid,
  catchErrors(createUtility)
);
utilityRoutes.get('/', catchErrors(getUtilities));

export default utilityRoutes;

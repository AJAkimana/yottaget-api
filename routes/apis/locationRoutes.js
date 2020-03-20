import { Router } from 'express';
import { isAdmin, isLocationValid, catchErrors } from '../../middlewares';
import {
  createLocation,
  getLocations
} from '../../controllers/locationController';

const locationRoutes = Router();

locationRoutes.post('/', isAdmin, isLocationValid, catchErrors(createLocation));
locationRoutes.get('/', catchErrors(getLocations));

export default locationRoutes;

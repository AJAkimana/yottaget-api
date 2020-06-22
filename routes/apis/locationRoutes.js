import { Router } from 'express';
import {
  isAdmin,
  isLocationValid,
  catchErrors,
  doesLocationExist
} from '../../middlewares';
import {
  createLocation,
  getLocations,
  getOneLocation
} from '../../controllers/locationController';

const locationRoutes = Router();

locationRoutes.post('/', isAdmin, isLocationValid, catchErrors(createLocation));
locationRoutes.get('', catchErrors(getLocations));
locationRoutes.get(
  '/:locationId',
  catchErrors(doesLocationExist),
  catchErrors(getOneLocation)
);

export default locationRoutes;

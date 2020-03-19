import { Router } from 'express';
import { isAdmin, isLocationValid, catchErrors } from '../../middlewares';
import { createLocation } from '../../controllers/locationController';

const locationRoutes = Router();

locationRoutes.post('/', isAdmin, isLocationValid, catchErrors(createLocation));

export default locationRoutes;

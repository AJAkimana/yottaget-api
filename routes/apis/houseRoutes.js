import { Router } from 'express';
import {
  createHouse,
  getHouses,
  getOneHouse
} from '../../controllers/houseController';
import {
  catchErrors,
  isOwnOrAdmin,
  isHouseValid,
  doesHouseExist
} from '../../middlewares';

const houseRoutes = Router();

houseRoutes.post('/', isOwnOrAdmin, isHouseValid, catchErrors(createHouse));
houseRoutes.get('/', catchErrors(getHouses));
houseRoutes.get(
  '/:houseId',
  catchErrors(doesHouseExist),
  catchErrors(getOneHouse)
);

export default houseRoutes;

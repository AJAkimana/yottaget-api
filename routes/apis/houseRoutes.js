import { Router } from 'express';
import {
  createHouse,
  getHouses,
  getOneHouse,
  updateHouse,
  addHouseImages
} from '../../controllers/houseController';
import {
  catchErrors,
  isOwnOrAdmin,
  isHouseValid,
  doesHouseExist,
  isHouseUpdateValid,
  areImagesValid
} from '../../middlewares';

const houseRoutes = Router();

houseRoutes.post('/', isOwnOrAdmin, isHouseValid, catchErrors(createHouse));
houseRoutes.get('/', catchErrors(getHouses));
houseRoutes.get(
  '/:houseId',
  catchErrors(doesHouseExist),
  catchErrors(getOneHouse)
);
houseRoutes.patch(
  '/:houseId',
  isOwnOrAdmin,
  catchErrors(doesHouseExist),
  isHouseUpdateValid,
  catchErrors(updateHouse)
);
houseRoutes.patch(
  '/:houseId/add-images',
  isOwnOrAdmin,
  catchErrors(doesHouseExist),
  areImagesValid,
  catchErrors(addHouseImages)
);
export default houseRoutes;

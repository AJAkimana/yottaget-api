import { Router } from 'express';
import {
  createHouse,
  getHouses,
  getOneHouse,
  updateHouse,
  addHouseImages,
  addHouseUtilities
} from '../../controllers/houseController';
import {
  catchErrors,
  isOwnOrAdmin,
  isHouseValid,
  doesHouseExist,
  isHouseUpdateValid,
  areImagesValid,
  areUtilitiesValid,
  doesLocationExist
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
  catchErrors(areImagesValid),
  catchErrors(addHouseImages)
);
houseRoutes.patch(
  '/:houseId/add-utilities',
  isOwnOrAdmin,
  catchErrors(doesHouseExist),
  catchErrors(areUtilitiesValid),
  catchErrors(addHouseUtilities)
);
houseRoutes.get(
  '/locations/:locationId',
  catchErrors(doesLocationExist),
  catchErrors(getHouses)
);
export default houseRoutes;

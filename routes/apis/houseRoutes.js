import { Router } from 'express';
import {
  createHouse,
  getHouses,
  getOneHouse,
  updateHouse,
  addHouseImages,
  addHouseUtilities,
  bookHouse,
} from '../../controllers/houseController';
import {
  catchErrors,
  isOwnOrAdmin,
  isHouseValid,
  doesHouseExist,
  isHouseUpdateValid,
  areImagesValid,
  areUtilitiesValid,
  getQueryLocation,
} from '../../middlewares';

const houseRoutes = Router();

houseRoutes.post('/', isOwnOrAdmin, isHouseValid, catchErrors(createHouse));
houseRoutes.get('/', catchErrors(getQueryLocation), catchErrors(getHouses));
houseRoutes.get(
  '/:houseIdOrSlug',
  catchErrors(doesHouseExist),
  catchErrors(getOneHouse)
);
houseRoutes.patch(
  '/:houseIdOrSlug',
  isOwnOrAdmin,
  catchErrors(doesHouseExist),
  isHouseUpdateValid,
  catchErrors(updateHouse)
);
houseRoutes.patch(
  '/:houseIdOrSlug/add-images',
  isOwnOrAdmin,
  catchErrors(doesHouseExist),
  catchErrors(areImagesValid),
  catchErrors(addHouseImages)
);
houseRoutes.patch(
  '/:houseIdOrSlug/add-utilities',
  isOwnOrAdmin,
  catchErrors(doesHouseExist),
  catchErrors(areUtilitiesValid),
  catchErrors(addHouseUtilities)
);
houseRoutes.patch(
  '/:houseIdOrSlug/book',
  catchErrors(doesHouseExist),
  catchErrors(bookHouse)
);
export default houseRoutes;

import {
  serverResponse,
  QueryHelper,
  msgs,
  ConstantHelper,
  generateSlug
} from '../helpers';
import { House, Image, Utility, HouseUtility } from '../models';

const houseDb = new QueryHelper(House);
const imageDb = new QueryHelper(Image);
const hUtilityDb = new QueryHelper(HouseUtility);
const constHelper = new ConstantHelper();
export const createHouse = async (req, res) => {
  req.body.slug = generateSlug(req.body.name);
  const newHouse = await houseDb.create(req.body);
  const msg = msgs.CRUD_ACTION('House', 'created');
  return serverResponse(res, 200, msg, newHouse);
};

export const getHouses = async (req, res) => {
  const houses = await houseDb.findAll();
  return serverResponse(res, 200, 'msg', houses);
};

export const getOneHouse = async (req, res) => {
  const { houseId: id } = req.params;
  const house = await houseDb.findOne({ id }, constHelper.houseIncludes());
  return serverResponse(res, 200, 'msg', house);
};

export const updateHouse = async (req, res) => {
  const { houseId: id } = req.params;
  if (req.body.name) {
    req.body.slug = generateSlug(req.body.name);
  }
  houseDb.update(req.body, { id });
  const msg = msgs.CRUD_ACTION('House', 'updated');
  return serverResponse(res, 200, msg);
};

export const addHouseImages = async (req, res) => {
  let { theImages: images } = req.body;
  await imageDb.bulkCreate(images);
  const msg = `${images.length} images added`;
  return serverResponse(res, 201, msg);
};

export const addHouseUtilities = async (req, res) => {
  let { houseUtilities } = req.body;
  await hUtilityDb.bulkCreate(houseUtilities);
  const msg = `${houseUtilities.length} utilities added`;
  return serverResponse(res, 201, msg);
};

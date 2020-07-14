import {
  serverResponse,
  QueryHelper,
  msgs,
  ConstantHelper,
  generateSlug,
  paginator,
} from '../helpers';
import { House, Image, HouseUtility, Sequelize, Location } from '../models';
import { sendSms } from '../config/smsService';

const houseDb = new QueryHelper(House);
const imageDb = new QueryHelper(Image);
const hUtilityDb = new QueryHelper(HouseUtility);
const locationDb = new QueryHelper(Location);
const constHelper = new ConstantHelper();
const { Op } = Sequelize;
export const createHouse = async (req, res) => {
  req.body.slug = generateSlug(req.body.name);
  const newHouse = await houseDb.create(req.body);
  if (req.body.utilities.length) {
    const utilities = req.body.utilities.map((util) => ({
      houseId: newHouse.id,
      utilityId: util,
    }));
    await hUtilityDb.bulkCreate(utilities);
  }
  const msg = msgs.CRUD_ACTION('House', 'created');
  return serverResponse(res, 200, msg, newHouse);
};

export const getHouses = async (req, res) => {
  const { locationId } = req.body;
  const { limit, offset } = paginator(req.query);
  let query = req.query.area ? { locationId } : null;
  let includeType = '';
  if (req.query.forAdmin && req.isAuthenticated()) {
    if (parseInt(req.user.a_level) === 2) {
      query = { ...query, userId: req.user.id };
    }
    if (parseInt(req.user.a_level) < 3) includeType = 'all';
  }

  const includes = constHelper.houseIncludes(includeType);
  let houses = await houseDb.findAll(query, includes, null, offset, limit, [
    'name',
    'ASC',
  ]);
  if (!req.query.forAdmin)
    houses = houses.filter((house) => house.images.length >= 3);
  return serverResponse(res, 200, 'Success', houses);
};

export const getOneHouse = async (req, res) => {
  const { houseId: id } = req.params;
  const house = await houseDb.findOne({ id }, constHelper.houseIncludes());
  return serverResponse(res, 200, 'Success', house);
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

export const bookHouse = async (req, res) => {
  const { sender, receiver, message } = req.body;
  const info = { sender, receiver, message };
  sendSms(info, (error, response) => {
    if (error) return serverResponse(res, 500, error);
    return serverResponse(res, 200, response);
  });
};
/**
 * @param {*} req Express request
 * @param {*} res Express response
 */
export const searchInfo = async (req, res) => {
  const condition = {
    [Op.substring]: req.query.searchKey,
  };
  const houseConditions = {
    description: condition,
  };
  const locationConditions = {
    name: condition,
  };
  let houses = await houseDb.findAll(
    houseConditions,
    constHelper.houseIncludes(''),
    ['id', 'name', 'description', 'slug'],
    null,
    null,
    [['description', 'ASC']]
  );
  const locations = await locationDb.findAll(
    locationConditions,
    null,
    ['id', 'name', 'slug'],
    null,
    null,
    [['name', 'ASC']]
  );
  houses = houses.filter((house) => house.images.length >= 3);
  const searched = { houses, locations };
  return serverResponse(res, 200, 'Success', searched);
};

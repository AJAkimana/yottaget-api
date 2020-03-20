import { serverResponse, QueryHelper, msgs, ConstantHelper } from '../helpers';
import { House } from '../models';

const houseDb = new QueryHelper(House);
const constHelper = new ConstantHelper();
export const createHouse = async (req, res) => {
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

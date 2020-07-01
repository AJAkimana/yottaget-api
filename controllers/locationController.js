import {
  serverResponse,
  QueryHelper,
  msgs,
  ConstantHelper,
  generateSlug,
} from '../helpers';
import { Location, Sequelize } from '../models';

const locationDb = new QueryHelper(Location);
const constHelper = new ConstantHelper();
const { Op } = Sequelize;
export const createLocation = async (req, res) => {
  req.body.slug = generateSlug(req.body.name);
  const newLocation = await locationDb.create(req.body);
  const msg = msgs.CRUD_ACTION('Location', 'created');
  return serverResponse(res, 200, msg, newLocation);
};
export const getLocations = async (req, res) => {
  const { search } = req.query;
  const whereLikeName = {
    name: { [Op.like]: `%${search}%` },
  };
  const whereConditions = search ? whereLikeName : null;
  const locations = await locationDb.findAll(
    whereConditions,
    null,
    ['id', 'name'],
    null,
    null,
    ['name', 'ASC']
  );
  return serverResponse(res, 200, 'Success', locations);
};
export const getOneLocation = async (req, res) => {
  const location = await locationDb.findOne(
    null,
    constHelper.locationIncludes()
  );
  return serverResponse(res, 200, 'Success', location);
};

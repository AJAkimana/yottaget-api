import { serverResponse, QueryHelper, msgs, ConstantHelper } from '../helpers';
import { Location } from '../models';

const locationDb = new QueryHelper(Location);
const constHelper = new ConstantHelper();
export const createLocation = async (req, res) => {
  const newLocation = await locationDb.create(req.body);
  const msg = msgs.CRUD_ACTION('Location', 'created');
  return serverResponse(res, 200, msg, newLocation);
};
export const getLocations = async (req, res) => {
  const locations = await locationDb.findAll(
    {},
    constHelper.locationIncludes()
  );
  return serverResponse(res, 200, 'Success', locations);
};

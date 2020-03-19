import { serverResponse, QueryHelper, msgs } from '../helpers';
import { Location } from '../models';

const locationDb = new QueryHelper(Location);
export const createLocation = async (req, res) => {
  const newLocation = await locationDb.create(req.body);
  const msg = msgs.CRUD_ACTION('Location', 'created');
  return serverResponse(res, 200, msg, newLocation);
};

import { QueryHelper, serverResponse, msgs } from '../helpers';
import { Utility } from '../models';

const utilityDb = new QueryHelper(Utility);
export const createUtility = async (req, res) => {
  const { utilities } = req.body;
  await utilityDb.bulkCreate(utilities);
  const msg = msgs.CRUD_ACTION(`${utilities.length} utilities`, 'created');
  return serverResponse(res, 201, msg);
};
export const getUtilities = async (req, res) => {
  const { locationId } = req.query;
  const query = locationId ? { locationId } : null;
  const utilities = await utilityDb.findAll(query);
  return serverResponse(res, 200, 'Success', utilities);
};

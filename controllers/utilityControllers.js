import { QueryHelper, serverResponse, msgs } from '../helpers';
import { Utility } from '../models';

const utilityDb = new QueryHelper(Utility);
export const createUtility = async (req, res) => {
  const { utilities } = req.body;
  await utilityDb.bulkCreate(utilities);
  const msg = msgs.CRUD_ACTION(`${utilities.length} utilities`, 'created');
  return serverResponse(res, 201, msg);
};

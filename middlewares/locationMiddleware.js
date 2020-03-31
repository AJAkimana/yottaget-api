import {
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  serverResponse,
  msgs
} from '../helpers';
import { Location } from '../models';

const locationDb = new QueryHelper(Location);
export const isLocationValid = async (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('location', 'new');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
export const doesLocationExist = async (req, res, next) => {
  if (req.params.locationId) {
    const { locationId: id } = req.params;
    const location = await locationDb.findOne({ id });
    if (location) return next();
  }
  return serverResponse(res, 404, msgs.NOT_FOUND('Location'));
};

import {
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  msgs
} from '../helpers';
import { House } from '../models';

export const isHouseValid = async (req, res, next) => {
  req.body.userId = req.user.a_level === 2 ? req.user.id : req.body.userId;
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('house', 'new');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  req.body.type = 'house';
  req.body.status = 'Pending';
  return next();
};
export const doesHouseExist = async (req, res, next) => {
  let houseDb = new QueryHelper(House);
  if (req.params.houseId) {
    const { houseId: id } = req.params;
    const house = await houseDb.findOne({ id });
    if (house) return next();
  }
  return serverResponse(res, 404, msgs.NOT_FOUND('House'));
};

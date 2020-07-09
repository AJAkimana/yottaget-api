import {
  serverResponse,
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
} from '../helpers';
import { User, Sequelize } from '../models';

const { Op } = Sequelize;
export const isLoginInfoValid = (req, res, next) => {
  if (req.isAuthenticated()) {
    return serverResponse(res, 422, 'You are already authenticatred');
  }
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('user', 'login');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
export const isSignUpInfoValid = (req, res, next) => {
  if (req.isAuthenticated()) {
    return serverResponse(res, 422, 'You are already authenticatred');
  }
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('user', 'signup');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
export const isUserValid = async (req, res, next) => {
  let userDb = new QueryHelper(User);
  const { email, phone, username, a_level } = req.body;
  let validator = new ValidatorHelper(req.body);

  const errorBody = validator.validateInput('user', 'signup');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);

  if ([2, 3].includes(a_level)) {
    console.log('Access level', a_level);

    return serverResponse(res, 400, 'The access is not allowed');
  }
  const userPhoneParams = [{ username }, { phone }];
  const withEmailParams = [...userPhoneParams, { email }];
  const params = email ? withEmailParams : userPhoneParams;
  const isExit = await userDb.findOne({ [Op.or]: params });
  if (isExit) {
    return serverResponse(res, 400, 'User with this information exists');
  }
  return next();
};

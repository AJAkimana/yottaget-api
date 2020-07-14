import {
  serverResponse,
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  unHashPassword,
  hashPassword,
  allowedLevels,
} from '../helpers';
import { User, Sequelize } from '../models';

const { Op } = Sequelize;
const userDb = new QueryHelper(User);
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
  delete req.body.confirmPassword;
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('user', 'signup');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
export const isUserValid = async (req, res, next) => {
  const { email, phone, username, a_level } = req.body;
  let validator = new ValidatorHelper(req.body);

  const errorBody = validator.validateInput('user', 'signup');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);

  if (allowedLevels.includes(a_level)) {
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
export const isUpdateUserValid = (req, res, next) => {
  const { isPassword, current } = req.body;
  let validator = new ValidatorHelper(req.body);
  const validAction = isPassword ? 'updatePass' : 'updateUserInfo';
  const errorBody = validator.validateInput('updateUser', validAction);
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  const currentUser = req.user.toJSON();
  if (isPassword && !unHashPassword(current, currentUser.password)) {
    return serverResponse(res, 400, 'Oops, passwords do not match');
  }
  req.body.userId = currentUser.id;
  return next();
};
export const isPasswordValid = async (req, res, next) => {
  const { phone, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return serverResponse(res, 400, 'Passwords are not the same');
  const thePhoneOwner = await userDb.findOne({ phone });
  if (thePhoneOwner && thePhoneOwner.id) {
    req.body.userId = thePhoneOwner.id;
    req.body.password = hashPassword(password);
    return next();
  }
  return serverResponse(res, 400, 'Sorry you cannot change the password');
};

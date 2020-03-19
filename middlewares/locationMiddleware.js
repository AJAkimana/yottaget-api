import { ValidatorHelper, joiValidatorMsg } from '../helpers';

export const isLocationValid = async (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('location', 'new');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};

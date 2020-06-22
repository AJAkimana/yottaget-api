import { ValidatorHelper, joiValidatorMsg } from '../helpers';

export const areNewUtilitiesValid = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('utilities', 'new');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};

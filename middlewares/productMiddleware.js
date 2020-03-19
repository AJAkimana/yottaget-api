import { ValidatorHelper, joiValidatorMsg } from '../helpers';

export const isProductValid = async (req, res, next) => {
  req.body.user_id = req.user.a_level === 2 ? req.user.id : req.body.user_id;
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('product', 'new');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  req.body.type = 'house';
  req.body.status = 'Pending';
  return next();
};

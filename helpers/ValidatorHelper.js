import Joi from 'joi';
import { ConstantHelper } from './ConstantHelper';

export class ValidatorHelper extends ConstantHelper {
  constructor(data) {
    super();
    this.data = data;
  }

  validateInput(type, action) {
    let validateKeys = null;
    switch (type) {
      case 'user':
        validateKeys = Joi.object().keys(this.getAuthKeys(action));
        break;
      default:
        break;
    }
    return Joi.validate(this.data, validateKeys);
  }
}

import Joi from 'joi';
import { User, Product, Location, Utility } from '../models';

export const msgs = {
  NOT_AUTH: 'Ooh, the system does not know you',
  NOT_ADMIN: 'This action is for admin',
  NOT_OWNER: 'This action is for owner',
  ADMIN_OR_OWNER: 'This action is for admin or owner',
  CRUD_ACTION: (item, action) => `${item} has successfully ${action}`,
  NOT_FOUND: item => `${item} is not found`,
  ROUTE_NOT_FOUND: 'Oops, you seem lost'
};
export class ConstantHelper {
  constructor() {
    this.hour = 3600000;
    this.day = this.hour * 24;
    this.week = this.day * 7;
  }
  static serverUploadError = 'Unknown upload';
  getAuthKeys(action) {
    const login = {
      email: Joi.string().email(),
      phone: Joi.string(),
      email: Joi.string(),
      password: Joi.string().required()
    };
    const signUp = {
      ...login,
      phone: Joi.string().required(),
      username: Joi.string().required(),
      a_level: Joi.number().required(),
      names: Joi.string().required()
    };
    return action === 'login' ? login : signUp;
  }
  getProductKeys(actionType) {
    const newProduct = {
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      location_id: Joi.number().required(),
      user_id: Joi.number().required()
    };
    if (actionType === 'new') return newProduct;
  }
  getLocationKeys(actionType) {
    const newLocation = {
      name: Joi.string().required()
    };
    if (actionType === 'new') return newLocation;
  }
}

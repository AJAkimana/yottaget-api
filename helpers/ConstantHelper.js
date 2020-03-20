import Joi from 'joi';
import { User, House, Location, Utility, Image } from '../models';

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
  getHouseKeys(actionType) {
    const newHouse = {
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      locationId: Joi.number().required(),
      userId: Joi.number().required()
    };
    if (actionType === 'new') return newHouse;
  }
  getLocationKeys(actionType) {
    const newLocation = {
      name: Joi.string().required()
    };
    if (actionType === 'new') return newLocation;
  }
  locationIncludes() {
    return [
      {
        model: Utility,
        as: 'utilities',
        include: [{ model: Location, as: 'location', attributes: ['name'] }],
        attributes: ['name']
      },
      {
        model: House,
        as: 'houses',
        attributes: ['name', 'price', 'description']
      }
    ];
  }
  houseIncludes() {
    return [
      {
        model: Utility,
        as: 'utilities',
        attributes: ['name']
      },
      {
        model: Location,
        as: 'location',
        attributes: ['name']
      },
      {
        model: User,
        as: 'landlord',
        attributes: ['names']
      },
      {
        model: Image,
        as: 'images',
        attributes: ['link']
      }
    ];
  }
}

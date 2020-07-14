import Joi from 'joi';
import { User, House, Location, Utility, Image } from '../models';

export const msgs = {
  NOT_AUTH: 'Ooh, the system does not know you',
  NOT_ADMIN: 'This action is for admin',
  NOT_OWNER: 'This action is for owner',
  ADMIN_OR_OWNER: 'This action is for admin or owner',
  CRUD_ACTION: (item, action) => `${item} has successfully ${action}`,
  NOT_FOUND: (item) => `${item} is not found`,
  ROUTE_NOT_FOUND: 'Oops, you seem lost',
};
export const localConstants = {
  TOTAL_IMAGES: 3,
};
export const allowedLevels = [2, 3];
export class ConstantHelper {
  constructor() {
    this.hour = 3600000;
    this.day = this.hour * 24;
    this.week = this.day * 7;
  }
  static serverUploadError = 'Unknown upload';
  getAuthKeys(action) {
    const login = {
      phone: Joi.string(),
      email: Joi.string().email(),
      username: Joi.string(),
      password: Joi.string().required(),
    };
    const signUp = {
      ...login,
      phone: Joi.string().required(),
      username: Joi.string().required(),
      a_level: Joi.number().required(),
      names: Joi.string().required(),
    };
    return action === 'login' ? login : signUp;
  }
  getUserUpdateKeys(action) {
    const thePassword = {
      isPassword: Joi.boolean().required(),
      current: Joi.string().required(),
      password: Joi.string().required(),
    };
    const userInfo = {
      isPassword: Joi.boolean().required(),
      phone: Joi.string().required(),
      email: Joi.string().email(),
      username: Joi.string(),
      names: Joi.string().required(),
    };
    return action === 'updatePass' ? thePassword : userInfo;
  }
  getHouseKeys(actionType) {
    const newHouse = {
      description: Joi.string().required(),
      price: Joi.number().required(),
      coverImage: Joi.string().required(),
      name: Joi.string().required(),
      locationId: Joi.number().required(),
      userId: Joi.number().required(),
      utilities: Joi.array().required(),
    };
    const { userId, ...withNoUserId } = newHouse;
    const generalUpdate = {
      status: Joi.string()
        .valid('Pending', 'Booked', 'Available', 'Canceled')
        .required(),
      ...withNoUserId,
    };
    if (actionType === 'new') return newHouse;
    if (actionType === 'genUpdate') return generalUpdate;
  }
  getImagesKeys() {
    return {
      images: Joi.array().items(Joi.string().required()).required(),
      houseId: Joi.number(),
    };
  }
  getUtilitiesKeys(actionType) {
    const utilities = {
      utilities: Joi.array().items(Joi.number().required()),
    };
    const newUtilities = {
      utilities: Joi.array().items({
        name: Joi.string().required(),
        locationId: Joi.number().required(),
      }),
    };
    if (actionType === 'forHouse') return utilities;
    if (actionType === 'new') return newUtilities;
  }
  getLocationKeys(actionType) {
    const newLocation = {
      name: Joi.string().required(),
    };
    if (actionType === 'new') return newLocation;
  }
  locationIncludes() {
    return [
      {
        model: Utility,
        as: 'utilities',
        include: [{ model: Location, as: 'location', attributes: ['name'] }],
        attributes: ['name'],
      },
      {
        model: House,
        as: 'houses',
        attributes: ['name', 'price', 'description'],
      },
    ];
  }
  houseIncludes(type = '') {
    const baseInclude = [
      {
        model: Utility,
        as: 'utilities',
        through: { attributes: [] },
        attributes: ['name'],
      },
      {
        model: Location,
        as: 'location',
        attributes: ['name'],
      },
      {
        model: Image,
        as: 'images',
        attributes: ['link'],
      },
    ];
    const detailedInclude = [
      {
        model: User,
        as: 'landlord',
        attributes: ['names', 'phone'],
      },
    ];

    return type === 'all' ? [...baseInclude, ...detailedInclude] : baseInclude;
  }
  houseLocationIncludes() {
    return [
      {
        model: Location,
        as: 'location',
        attributes: ['name'],
      },
    ];
  }
}

import Joi from 'joi';
import { User, Product, Location, Utility } from '../models';

export class ConstantHelper {
  static hour = 3600000;
  static day = this.hour * 24;
  static week = this.day * 7;
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
}

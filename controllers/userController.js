import passport from 'passport';
import { serverResponse, QueryHelper } from '../helpers';
import { ConstantHelper } from '../helpers/ConstantHelper';
import { generatJWT, hashPassword } from '../helpers/util';
import { User, Sequelize } from '../models';

const constants = new ConstantHelper();
const userDb = new QueryHelper(User);
const { Op } = Sequelize;
export const userSignin = async (req, res, next) => {
  passport.authenticate('local.login', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    req.logIn(user, (err) => {
      if (err) return next(err);
      delete user.password;
      delete user.updatedAt;

      user.token = generatJWT({ id: user.id });
      req.session.cookie.maxAge = constants.week;
      req.session.save();
      return serverResponse(res, 200, `Welcome ${user.names}`, user);
    });
  })(req, req, next);
};
export const userSignUp = async (req, res, next) => {
  passport.authenticate('local.signup', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    const successMsg = `Thank you, ${user.names}, for registering`;
    delete user.password;
    return serverResponse(res, 200, successMsg, user);
  })(req, req, next);
};
export const logoutUser = (req, res) => {
  req.session.destroy();
  req.logout();
  res.status(200).json({ status: 200, message: 'Successfully logged out' });
};
export const getUsers = async (req, res) => {
  const { type } = req.query;
  let query = { a_level: 3 };
  const isSuperAdmin = Number(req.user.a_level) === 1;
  switch (type) {
    case 'landload':
      query = { a_level: 2 };
      break;
    case 'all':
      query = { a_level: { [Op.gte]: 2 } };
      break;
    default:
      break;
  }
  let attributes = isSuperAdmin
    ? ['id', 'names', 'username', 'email', 'phone', 'a_level', 'createdAt']
    : ['names'];
  const users = await userDb.findAll(query, null, attributes, null, null, [
    'names',
    'ASC',
  ]);
  return serverResponse(res, 200, 'Success', users);
};
export const createNewUser = async (req, res) => {
  req.body.password = hashPassword(req.body.password);
  const newUser = await userDb.create(req.body);
  return serverResponse(res, 200, 'Created', newUser);
};

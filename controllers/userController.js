import passport from 'passport';
import { serverResponse, QueryHelper } from '../helpers';
import { ConstantHelper } from '../helpers/ConstantHelper';
import { generatJWT, hashPassword } from '../helpers/util';
import { User, House, Sequelize, Payment } from '../models';

const constants = new ConstantHelper();
const userDb = new QueryHelper(User);
const houseDb = new QueryHelper(House);
const paymentDb = new QueryHelper(Payment);
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
export const updateUser = async (req, res) => {
  const { isPassword, userId: id, password } = req.body;
  const updatingBody = isPassword
    ? { password: hashPassword(password) }
    : req.body;
  await userDb.update(updatingBody, { id });
  return serverResponse(res, 200, 'Updated successfully');
};
export const getAdminCounts = async (req, res) => {
  const counts = [];

  const housesConditions =
    parseInt(req.user.a_level) !== 2 ? { userId: req.user.id } : null;
  const myTenats =
    parseInt(req.user.a_level) !== 2
      ? null
      : await houseDb.count({
          userId: req.user.id,
          status: 'booked',
        });
  const landLoads =
    parseInt(req.user.a_level) === 2
      ? null
      : await userDb.count({ a_level: 2 });
  const tenants =
    parseInt(req.user.a_level) === 2
      ? null
      : await userDb.count({ a_level: 3 });
  const houses = await houseDb.count(housesConditions);
  const paid =
    parseInt(req.user.a_level) !== 2 ? await paymentDb.count() : myTenats;
  counts.push(
    { type: 'Tenants', count: tenants },
    { type: 'My Tenants', count: myTenats },
    { type: 'Landlord', count: landLoads },
    { type: 'Houses', count: houses },
    { type: 'Paid', count: paid }
  );
  return serverResponse(res, 200, 'Success', counts);
};

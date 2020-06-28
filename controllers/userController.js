import passport from 'passport';
import { serverResponse } from '../helpers';
import { ConstantHelper } from '../helpers/ConstantHelper';
import { generatJWT } from '../helpers/util';

const constants = new ConstantHelper();
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

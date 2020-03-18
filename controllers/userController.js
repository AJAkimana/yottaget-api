import passport from 'passport';
import { serverResponse } from '../helpers';
import { ConstantHelper } from '../helpers/ConstantHelper';

const constants = new ConstantHelper();
export const userSignin = async (req, res, next) => {
  passport.authenticate('local.login', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    req.logIn(user, err => {
      if (err) return next(err);

      req.session.cookie.maxAge = constants.week;
      req.session.save();
      return serverResponse(res, 200, `Welcome ${user.names}`, user);
    });
  })(req, req, next);
};
export const userSignUp = async (req, res, next) => {
  passport.authenticate('local.signup', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    return serverResponse(
      res,
      200,
      `Thank you, ${user.names}, for register`,
      user
    );
  })(req, req, next);
};
export const logoutUser = (req, res) => {
  req.session.destroy();
  req.logout();
  res.status(200).json({ status: 200, message: 'Successfully logged out' });
};

import { serverResponse, msgs } from '../helpers';

export const isAuthanticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return serverResponse(res, 401, msgs.NOT_AUTH);
};

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.a_level == 1) return next();
    return serverResponse(res, 401, msgs.NOT_ADMIN);
  }
  return serverResponse(res, 401, msgs.NOT_AUTH);
};

export const isOwner = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.a_level === 2) return next();
    return serverResponse(res, 401, msgs.NOT_OWNER);
  }
  return serverResponse(res, 401, msgs.NOT_AUTH);
};

export const isOwnOrAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.a_level <= 2) return next();
    return serverResponse(res, 401, msgs.ADMIN_OR_OWNER);
  }
  return serverResponse(res, 401, msgs.NOT_AUTH);
};

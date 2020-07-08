import { Router } from 'express';
import {
  catchErrors,
  isLoginInfoValid,
  isSignUpInfoValid,
  isAuthanticated,
} from '../../middlewares';
import {
  userSignin,
  userSignUp,
  logoutUser,
  getUsers,
} from '../../controllers/userController';

const userRoutes = Router();

userRoutes.get('/', isAuthanticated, catchErrors(getUsers));
userRoutes.post('/login', isLoginInfoValid, catchErrors(userSignin));
userRoutes.post('/signup', isSignUpInfoValid, catchErrors(userSignUp));
userRoutes.use('/logout', logoutUser);

export default userRoutes;

import { Router } from 'express';
import {
  catchErrors,
  isLoginInfoValid,
  isSignUpInfoValid
} from '../../middlewares';
import {
  userSignin,
  userSignUp,
  logoutUser
} from '../../controllers/userController';

const userRoutes = Router();
userRoutes.post('/login', isLoginInfoValid, catchErrors(userSignin));
userRoutes.post('/signup', isSignUpInfoValid, catchErrors(userSignUp));
userRoutes.use('/logout', logoutUser);

export default userRoutes;

import { Router } from 'express';
import {
  catchErrors,
  isLoginInfoValid,
  isSignUpInfoValid,
  isAuthanticated,
  isUserValid,
  isUpdateUserValid,
  isOwnOrAdmin,
  isPasswordValid,
  isAdmin,
} from '../../middlewares';
import {
  userSignin,
  userSignUp,
  logoutUser,
  getUsers,
  createNewUser,
  updateUser,
  getAdminCounts,
  forgetPassword,
} from '../../controllers/userController';

const userRoutes = Router();

userRoutes.get('/', isAdmin, catchErrors(getUsers));
userRoutes.post(
  '/',
  isAdmin,
  catchErrors(isUserValid),
  catchErrors(createNewUser)
);
userRoutes.patch(
  '/',
  isAuthanticated,
  isUpdateUserValid,
  catchErrors(updateUser)
);
userRoutes.get('/dashboard', isOwnOrAdmin, catchErrors(getAdminCounts));
userRoutes.post('/login', isLoginInfoValid, catchErrors(userSignin));
userRoutes.post('/signup', isSignUpInfoValid, catchErrors(userSignUp));
userRoutes.post(
  '/forget-password',
  catchErrors(isPasswordValid),
  catchErrors(forgetPassword)
);
userRoutes.use('/logout', logoutUser);

export default userRoutes;

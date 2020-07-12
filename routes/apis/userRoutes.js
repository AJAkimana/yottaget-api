import { Router } from 'express';
import {
  catchErrors,
  isLoginInfoValid,
  isSignUpInfoValid,
  isAuthanticated,
  isUserValid,
  isUpdateUserValid,
  isOwnOrAdmin,
} from '../../middlewares';
import {
  userSignin,
  userSignUp,
  logoutUser,
  getUsers,
  createNewUser,
  updateUser,
  getAdminCounts,
} from '../../controllers/userController';

const userRoutes = Router();

userRoutes.get('/', isAuthanticated, catchErrors(getUsers));
userRoutes.post(
  '/',
  isAuthanticated,
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
userRoutes.use('/logout', logoutUser);

export default userRoutes;

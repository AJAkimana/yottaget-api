import { Router } from 'express';
import { createProduct } from '../../controllers/productController';
import { catchErrors, isOwnOrAdmin, isProductValid } from '../../middlewares';

const productRoutes = Router();

productRoutes.post(
  '/',
  isOwnOrAdmin,
  isProductValid,
  catchErrors(createProduct)
);

export default productRoutes;

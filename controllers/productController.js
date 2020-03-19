import { serverResponse, QueryHelper } from '../helpers';
import { Product } from '../models';

const productDb = new QueryHelper(Product);
export const createProduct = async (req, res) => {
  const newProduct = await productDb.create(req.body);
  return serverResponse(res, 200, 'Product created', newProduct);
};

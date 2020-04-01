import { Router } from 'express';
import validate from 'express-validation';
import * as ProductController from './controller';
import ProductValidation from './validation';

const routes = new Router();

// Add product
routes.post(
  '/',
  validate(ProductValidation.createProduct),
  ProductController.addProduct,
);

// Update Product
routes.patch(
  '/:id',
  validate(ProductValidation.updateProduct),
  ProductController.updateProduct,
);

// Delete Product
routes.delete(
  '/:id',
  validate(ProductValidation.deleteProduct),
  ProductController.deleteProduct,
);
// List Product
routes.get('/', ProductController.getProducts);

export default routes;

import { Router } from 'express';
import validate from 'express-validation';
import * as ReceiptsController from './controller';
import ReceiptsValidation from './validation';

const routes = new Router();

routes.post(
  '/',
  validate(ReceiptsValidation.addReceipt),
  ReceiptsController.addReceipt,
);
routes.post(
  '/get-sales',
  validate(ReceiptsValidation.getSalesByMonth),
  ReceiptsController.getSalesByMonth,
);
routes.post(
  '/get-monthly-sales',
  validate(ReceiptsValidation.getMonthlySalesByProduct),
  ReceiptsController.getMonthlySalesByProduct,
);

export default routes;

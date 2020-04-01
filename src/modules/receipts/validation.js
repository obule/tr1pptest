import Joi from 'joi';
import JoiExtension from 'joi-date-extensions';
const ExtendededJoi = Joi.extend(JoiExtension);

const receipt = Joi.object()
  .keys({
    productId: Joi.string().required(),
    quantity: Joi.number()
      .integer()
      .required(),
    amount: Joi.number().required(),
  })
  .required();

export default {
  addReceipt: {
    body: {
      receipts: Joi.array()
        .items(receipt)
        .required(),
    },
  },
  getSalesByMonth: {
    body: {
      monthYear: ExtendededJoi.date()
        .format('MMMM YYYY')
        .raw()
        .required(),
    },
  },
  getMonthlySalesByProduct: {
    body: {
      name: Joi.string().required(),
    },
  },
};

import Joi from 'joi';

export default {
  createProduct: {
    body: {
      name: Joi.string()
        .required()
        .min(3),
      quantityInStock: Joi.number().required(),
      price: Joi.number().required(),
    },
  },
  updateProduct: {
    body: {
      name: Joi.string()
        .optional()
        .min(3),
      quantityInStock: Joi.number().optional(),
      price: Joi.number().optional(),
    },
  },
  deleteProduct: {
    param: {
      id: Joi.string().required(),
    },
  },
};

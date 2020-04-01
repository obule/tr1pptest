module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost/tr1ppdb',
  JWT_SECRET: 'promiseizuagbala'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/tr1ppdb-test'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/tr1ppdb-prod'
};

const defaultConfig = {
  PORT: process.env.PORT || 4000
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;

    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductSchema = new _mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Product name is required']
  },
  quantityInStock: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

ProductSchema.statics = {
  createProduct(args) {
    return this.create(Object.assign({}, args));
  },

  AllProducts({ skip = 0, limit = 5 } = {}) {
    return this.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
  }
};

exports.default = _mongoose2.default.model('Products', ProductSchema);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Remove the warning with Promises
/* eslint-disable no-console */
_mongoose2.default.Promise = global.Promise;

// Connect the db with the Url provided


try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (error) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', () => console.log('Mongodb Running')).on('error', e => {
  throw e;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(22);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(18);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(19);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(20);

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded());

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _route = __webpack_require__(12);

var _route2 = _interopRequireDefault(_route);

var _route3 = __webpack_require__(16);

var _route4 = _interopRequireDefault(_route3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/api/v1/products', _route2.default);
  app.use('/api/v1/receipts', _route4.default);
  app.use((err, req, res, next) => {
    if (err) {
      let appmessage;
      if (err.errors && err.errors[0].messages[0]) {
        appmessage = err.errors[0].messages[0];
      } else if (err.message) {
        appmessage = err.message;
      } else if (typeof err === 'string') {
        appmessage = err;
      } else {
        appmessage = 'Something went wrong';
      }
      res.status(400).json({ message: appmessage });
    } else {
      res.status(404).json({ message: 'Requested route not found' });
    }
  });
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(7);

var _middleware = __webpack_require__(8);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(9);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); /* eslint-disable no-console */

(0, _middleware2.default)(app);

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
        Server running on port: ${_constants2.default.PORT}
        -------
        Running on ${process.env.NODE_ENV}
        ------
        Make something great
        `);
  }
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProduct = addProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProducts = getProducts;

var _httpStatus = __webpack_require__(5);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _model = __webpack_require__(3);

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add Products
async function addProduct(req, res) {
  try {
    const { name } = req.body;
    // Check if product exist
    const product = await _model2.default.findOne({ name });
    if (product) {
      return res.status(_httpStatus2.default.BAD_REQUEST).json({
        success: false,
        data: 'Product already exist'
      });
    }
    // Add product
    return res.status(_httpStatus2.default.CREATED).json((await _model2.default.createProduct(req.body)));
  } catch (error) {
    return res.status(_httpStatus2.default.INTERNAL_SERVER_ERROR).json(error);
  }
}

// Update Products
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await _model2.default.findById(id);
    if (!product) return res.status(_httpStatus2.default.NOT_FOUND).json({ message: 'Product not found' });
    // Update the product
    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });
    return res.status(_httpStatus2.default.OK).json((await product.save()));
  } catch (error) {
    return res.status(_httpStatus2.default.INTERNAL_SERVER_ERROR).json(error);
  }
}

// Delete Products
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await _model2.default.findById(id);
    if (!product) return res.status(_httpStatus2.default.NOT_FOUND).json({ message: 'Product not found' });
    // Delete product
    await product.remove();
    return res.status(_httpStatus2.default.OK).json({ message: 'Product deleted' });
  } catch (error) {
    return res.status(_httpStatus2.default.INTERNAL_SERVER_ERROR).json(error);
  }
}

// Get all products
async function getProducts(req, res) {
  try {
    const limit = parseInt(req.query.limit, 0);
    const skip = parseInt(req.query.skip, 0);
    const products = await _model2.default.AllProducts({ skip, limit });
    return res.status(_httpStatus2.default.OK).json(products);
  } catch (error) {
    console.log('Error', error);
    return res.status(_httpStatus2.default.INTERNAL_SERVER_ERROR).json(error);
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _controller = __webpack_require__(11);

var ProductController = _interopRequireWildcard(_controller);

var _validation = __webpack_require__(13);

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

// Add product
routes.post('/', (0, _expressValidation2.default)(_validation2.default.createProduct), ProductController.addProduct);

// Update Product
routes.patch('/:id', (0, _expressValidation2.default)(_validation2.default.updateProduct), ProductController.updateProduct);

// Delete Product
routes.delete('/:id', (0, _expressValidation2.default)(_validation2.default.deleteProduct), ProductController.deleteProduct);
// List Product
routes.get('/', ProductController.getProducts);

exports.default = routes;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(6);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createProduct: {
    body: {
      name: _joi2.default.string().required().min(3),
      quantityInStock: _joi2.default.number().required(),
      price: _joi2.default.number().required()
    }
  },
  updateProduct: {
    body: {
      name: _joi2.default.string().optional().min(3),
      quantityInStock: _joi2.default.number().optional(),
      price: _joi2.default.number().optional()
    }
  },
  deleteProduct: {
    param: {
      id: _joi2.default.string().required()
    }
  }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addReceipt = addReceipt;
exports.getSalesByMonth = getSalesByMonth;
exports.getMonthlySalesByProduct = getMonthlySalesByProduct;

var _httpStatus = __webpack_require__(5);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _model = __webpack_require__(15);

var _model2 = _interopRequireDefault(_model);

var _model3 = __webpack_require__(3);

var _model4 = _interopRequireDefault(_model3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addReceipt(req, res) {
  try {
    const { receipts } = req.body;
    const errors = [];
    // Check if productIds exist in product table
    for (let index = 0; index < receipts.length; index++) {
      const { productId } = receipts[index];
      const doesProductExists = await productExist(productId);
      if (!doesProductExists) {
        errors.push('Exist');
      }
    }
    // Check for errors
    if (errors.length > 0) {
      return res.status(_httpStatus2.default.BAD_REQUEST).json({ message: 'Invalid Product Id' });
    }
    // Add Receipts to DB
    for (let index = 0; index < receipts.length; index++) {
      const receipt = receipts[index];
      const { quantity, amount } = receipt;
      const price = (parseInt(amount, 0) || 0) * quantity;
      receipt.totalPrice = price;
      await _model2.default.create(receipt);
    }
    return res.status(_httpStatus2.default.CREATED).json({ message: receipts });
  } catch (error) {
    return res.status(_httpStatus2.default.INTERNAL_SERVER_ERROR).json(error);
  }
}

/**
 * Check if product exist
 * @param {number} productId
 * @returns {Boolean}
 */
async function productExist(productId) {
  try {
    const product = await _model4.default.findById(productId);
    if (!product) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function getSalesByMonth(req, res) {
  try {
    const { monthYear } = req.body;
    // Get start and end Date
    const { startDate, endDate } = getStartAndEndDate(monthYear);
    // get Total
    const receipts = await _model2.default.find({
      createdAt: { $gte: startDate, $lt: endDate }
    });
    if (!receipts) {
      return res.status(_httpStatus2.default.NOT_FOUND).json({ message: 'No Receipt found' });
    }
    const totalPrice = receipts.reduce((acc, obj) => acc + obj.totalPrice, 0);
    return res.status(_httpStatus2.default.OK).json({ totalPrice });
  } catch (error) {
    console.log('Error', error);
    return res.status(_httpStatus2.default.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function getMonthlySalesByProduct(req, res) {
  try {
    // Get product name
    const { name } = req.body;
    const getProductByName = await _model4.default.find({ name });

    if (!getProductByName) {
      return res.status(_httpStatus2.default.NOT_FOUND).json({ message: 'Product not found' });
    }
    const { _id: productId, name: newName } = getProductByName[0];
    const products = await _model2.default.aggregate([{ $match: { productId } }, {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        results: { $push: '$$ROOT' }
      }
    }, { $project: { _id: 0, createdAt: 0 } }]).exec(res => console.log('Res', res));
    return res.status(_httpStatus2.default.OK).json({ products });
  } catch (error) {
    console.log('Error', error);
    return res.status(_httpStatus2.default.INTERNAL_SERVER_ERROR).json(error);
  }
}

function formatDate(timestamp) {
  // get offset
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  return new Date(timestamp - timeZoneOffset).toISOString().split('T')[0];
}

function getStartAndEndDate(monthYear) {
  // Convert to Date
  const formatedDate = formatDate(new Date(monthYear).getTime());
  const startDate = new Date(formatedDate);
  const endDateTimeStamp = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).setHours(23, 59, 59);
  const endDate = new Date(endDateTimeStamp);
  return { startDate, endDate };
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ReceiptSchema = new _mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Amount is required']
  },
  productId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  }
}, { timestamps: true });

exports.default = _mongoose2.default.model('Receipts', ReceiptSchema);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _controller = __webpack_require__(14);

var ReceiptsController = _interopRequireWildcard(_controller);

var _validation = __webpack_require__(17);

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

routes.post('/', (0, _expressValidation2.default)(_validation2.default.addReceipt), ReceiptsController.addReceipt);
routes.post('/get-sales', (0, _expressValidation2.default)(_validation2.default.getSalesByMonth), ReceiptsController.getSalesByMonth);
routes.post('/get-monthly-sales', (0, _expressValidation2.default)(_validation2.default.getMonthlySalesByProduct), ReceiptsController.getMonthlySalesByProduct);

exports.default = routes;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(6);

var _joi2 = _interopRequireDefault(_joi);

var _joiDateExtensions = __webpack_require__(21);

var _joiDateExtensions2 = _interopRequireDefault(_joiDateExtensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ExtendededJoi = _joi2.default.extend(_joiDateExtensions2.default);

const receipt = _joi2.default.object().keys({
  productId: _joi2.default.string().required(),
  quantity: _joi2.default.number().integer().required(),
  amount: _joi2.default.number().required()
}).required();

exports.default = {
  addReceipt: {
    body: {
      receipts: _joi2.default.array().items(receipt).required()
    }
  },
  getSalesByMonth: {
    body: {
      monthYear: ExtendededJoi.date().format('MMMM YYYY').raw().required()
    }
  },
  getMonthlySalesByProduct: {
    body: {
      name: _joi2.default.string().required()
    }
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("joi-date-extensions");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ })
/******/ ]);
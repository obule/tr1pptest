import HttpStatus from 'http-status';
import Receipts from './model';
import Products from '../products/model';

export async function addReceipt(req, res) {
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
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid Product Id' });
    }
    // Add Receipts to DB
    for (let index = 0; index < receipts.length; index++) {
      const receipt = receipts[index];
      const { quantity, amount } = receipt;
      const price = (parseInt(amount, 0) || 0) * quantity;
      receipt.totalPrice = price;
      await Receipts.create(receipt);
    }
    return res.status(HttpStatus.CREATED).json({ message: receipts });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

/**
 * Check if product exist
 * @param {number} productId
 * @returns {Boolean}
 */
async function productExist(productId) {
  try {
    const product = await Products.findById(productId);
    if (!product) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function getSalesByMonth(req, res) {
  try {
    const { monthYear } = req.body;
    // Get start and end Date
    const { startDate, endDate } = getStartAndEndDate(monthYear);
    // get Total
    const receipts = await Receipts.find({
      createdAt: { $gte: startDate, $lt: endDate },
    });
    if (!receipts) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No Receipt found' });
    }
    const totalPrice = receipts.reduce((acc, obj) => acc + obj.totalPrice, 0);
    return res.status(HttpStatus.OK).json({ totalPrice });
  } catch (error) {
    console.log('Error', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function getMonthlySalesByProduct(req, res) {
  try {
    // Get product name
    const { name } = req.body;
    const getProductByName = await Products.find({ name });

    if (!getProductByName) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    const { _id: productId, name: newName } = getProductByName[0];
    const products = await Receipts.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          results: { $push: '$$ROOT' },
        },
      },
      { $project: { _id: 0, createdAt: 0 } },
    ]).exec(res => console.log('Res', res));
    return res.status(HttpStatus.OK).json({ products });
  } catch (error) {
    console.log('Error', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
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
  const endDateTimeStamp = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0,
  ).setHours(23, 59, 59);
  const endDate = new Date(endDateTimeStamp);
  return { startDate, endDate };
}

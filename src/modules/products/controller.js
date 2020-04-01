import HttpStatus from 'http-status';
import Products from './model';

// Add Products
export async function addProduct(req, res) {
  try {
    const { name } = req.body;
    // Check if product exist
    const product = await Products.findOne({ name });
    if (product) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        data: 'Product already exist',
      });
    }
    // Add product
    return res
      .status(HttpStatus.CREATED)
      .json(await Products.createProduct(req.body));
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

// Update Products
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    // Update the product
    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });
    return res.status(HttpStatus.OK).json(await product.save());
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

// Delete Products
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    // Delete product
    await product.remove();
    return res.status(HttpStatus.OK).json({ message: 'Product deleted' });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

// Get all products
export async function getProducts(req, res) {
  try {
    const limit = parseInt(req.query.limit, 0);
    const skip = parseInt(req.query.skip, 0);
    const products = await Products.AllProducts({ skip, limit });
    return res.status(HttpStatus.OK).json(products);
  } catch (error) {
    console.log('Error', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

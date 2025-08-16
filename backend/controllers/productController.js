const Product = require('../models/productModel');

// Get all products from the database
const getAllProducts = async (request, reply) => {
  try {
    const products = await Product.findAll({
      order: [['articleNo', 'ASC']], // Sort by article number
    });
    return products;
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch products' });
  }
};

// Update a product by its ID
const updateProduct = async (request, reply) => {
  try {
    const { id } = request.params;
    const [updated] = await Product.update(request.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedProduct = await Product.findOne({ where: { id: id } });
      return updatedProduct;
    }
    throw new Error('Product not found');
  } catch (error) {
    reply.code(404).send({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  updateProduct,
};
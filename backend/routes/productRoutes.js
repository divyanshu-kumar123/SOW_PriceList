const { getAllProducts, updateProduct } = require('../controllers/productController');

async function productRoutes(fastify, options) {
  // Route to get all products
  fastify.get('/products', getAllProducts);

  // Route to update a product
  fastify.put('/products/:id', updateProduct);
}

module.exports = productRoutes;
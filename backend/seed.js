const { sequelize } = require('./config/database');
const Product = require('./models/productModel');

const productsData = Array.from({ length: 25 }, (_, i) => ({
  articleNo: 123456780 + (i + 1),
  productName: `Test Product ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
  inPrice: 905.00 + (i + 1) * 15,
  price: 1500.80 + (i + 1) * 25,
  unit: 'pcs',
  inStock: 25000 + (i + 1) * 50,
  description: `This is the detailed description for product item #${i + 1}.`,
}));

const seedDatabase = async () => {
  try {
    // Sync all models and drop existing tables
    await sequelize.sync({ force: true });
    console.log('Database synced!');

    // Bulk insert the product data
    await Product.bulkCreate(productsData);
    console.log('✅ Success! Products have been seeded.');
  } catch (error) {
    console.error('❌ Error seeding the database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
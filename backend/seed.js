const { sequelize } = require('./config/database');
const Product = require('./models/productModel');

const productsData = Array.from({ length: 25 }, (_, i) => ({
  articleNo: 123456780 + (i + 1),
  productName: `Test Product ${String.fromCharCode(65 + (i % 26))}${i + 1}. this is the test product`,
  inPrice: 905.00 + (i + 1) * 15,
  price: 1500.80 + (i + 1) * 25,
  unit: 'pcs',
  inStock: 25000 + (i + 1) * 50,
  description: `This is the detailed description for product item #${i + 1}.`,
}));


// Add a product with a very long name -- modified for testing
if (productsData.length >= 3) {
  productsData[2].productName = 'This is an example of a product with an exceptionally long name to test how the UI handles text wrapping and overflow within a narrow column.';
}

// Add a product with a very long description
if (productsData.length >= 5) {
  productsData[4].description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.';
}

// 3. The seeding function
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced! Table recreated.');

    await Product.bulkCreate(productsData);
    console.log('✅ Success! Products have been seeded.');
  } catch (error) {
    console.error('❌ Error seeding the database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
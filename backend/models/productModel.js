const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  
  articleNo: {
    type: DataTypes.BIGINT, // Using BIGINT for larger article numbers
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inPrice: {
    type: DataTypes.DECIMAL(10, 2), // Suitable for monetary values
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  unit: {
    type: DataTypes.STRING,
  },
  inStock: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT, 
  },
}, {
  timestamps: true, 
});

module.exports = Product;
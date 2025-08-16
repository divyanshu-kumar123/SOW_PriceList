const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance using the connection URL from your .env file
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
});

// Function to test the database connection
const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDb };
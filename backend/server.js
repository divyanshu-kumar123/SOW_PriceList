const fastify = require('fastify')({ logger: true });
const { connectDb, sequelize } = require('./config/database');
require('dotenv').config();

// Register CORS plugin
fastify.register(require('@fastify/cors'), {
  origin: '*', // For development, allow all origins. For production, restrict to your frontend's URL.
});

// Register product routes
fastify.register(require('./routes/productRoutes'), { prefix: '/api' });

// Main function to start the server
const start = async () => {
  try {
    // Connect to the database
    await connectDb();

    // Sync models with the database (creates tables if they don't exist)
    await sequelize.sync();

    // Start the Fastify server
    const port = process.env.PORT || 3001;
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
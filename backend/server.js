const fastify = require('fastify')({ logger: true });
const { connectDb, sequelize } = require('./config/database');
require('dotenv').config();

// Register CORS plugin
fastify.register(require('@fastify/cors'), {
  origin: '*',
  // ADD THIS LINE
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
});

// Register product routes
fastify.register(require('./routes/productRoutes'), { prefix: '/api' });

// Main function to start the server
const start = async () => {
  try {
    await connectDb();
    await sequelize.sync();

    const port = process.env.PORT || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
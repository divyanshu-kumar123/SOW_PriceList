const fastify = require('fastify')({ logger: true });
const { connectDb, sequelize } = require('./config/database');
require('dotenv').config();


fastify.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
});

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
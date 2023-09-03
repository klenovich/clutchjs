// config.js
require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    port: process.env.DB_PORT || 5432,
  },
  logLevel: process.env.LOG_LEVEL || 'info',
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiry: process.env.JWT_EXPIRY || '24h',
  },
  // and more configurations
};

module.exports = config;
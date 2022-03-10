require('dotenv').config();

module.exports = {
  Database_Server: process.env.DATABASE_SERVER,
  PORT: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
};

const Environment = {
  PORT: process.env.PORT,
  DB_HOST: process.env.MONGODB_HOST,
  DB_PORT: process.env.MONGODB_PORT,
  DB_NAME: process.env.MONGODB_DATABASE,
  DB_OPTIONS: process.env.MONGODB_OPTIONS,
  DB_USER: process.env.MONGODB_USER,
  DB_PASSWORD: process.env.MONGODB_PASSWORD,
};

module.exports = {
  Environment,
};

const mongoose = require('mongoose');
const configs = require('./configs');

mongoose.Promise = global.Promise;

module.exports = () => {
  const uri = `mongodb://${configs.Environment.DB_USER}:${configs.Environment.DB_PASSWORD}@${configs.Environment.DB_HOST}/`
  + `${configs.Environment.DB_NAME}?${configs.Environment.DB_OPTIONS}`;
  const connection = mongoose.connect(uri, {
    auth: {
      authdb: 'admin',
      user: configs.Environment.DB_USER,
      password: configs.Environment.DB_PASSWORD,
    },
    useNewUrlParser: true,
  });

  require('../app/docs/docs.model');

  return connection;
};

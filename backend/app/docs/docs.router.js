const docs = require('./docs.controller');

module.exports = (app) => {
  app.get('/docs', docs.getAll);
  app.get('/docs/:id', docs.get);
  app.post('/docs', docs.create);
};
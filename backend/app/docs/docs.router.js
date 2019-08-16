const docs = require('./docs.controller');

module.exports = (router) => {
  router.get('/docs', docs.getAll);
  router.post('/docs', docs.create);
  router.get('/docs/:id', docs.get);
  router.put('/docs/:id', docs.update);
  router.delete('/docs/:id', docs.remove);
};
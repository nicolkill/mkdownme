const Docs = require('mongoose').model('Docs');

const {
  NotFoundError,
} = require('../../config/errors');

const getAll = async (req, res) => {
  const docs = await Docs.find({});
  if (!docs || docs.length === 0) {
    throw new NotFoundError();
  }
  res.json(docs);
};

const get = async (req, res) => {
  const doc = await Docs.findById(req.params.id);

  if (!doc || doc.length === 0) {
    throw new NotFoundError();
  }

  res.json(doc);
};

module.exports = {
  getAll,
  get,
};
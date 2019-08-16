const Docs = require('mongoose').model('Docs');

const {
  NotFoundError,
} = require('../../config/errors');

const getAll = async (req, res) => {
  const docs = await Docs.find({});
  res.json(docs);
};

const get = async (req, res) => {
  const doc = await Docs.findById(req.params.id);

  if (!doc || doc.length === 0) {
    throw new NotFoundError();
  }

  res.json(doc);
};

const create = async (req, res) => {
  const newDoc = new Docs({
    name: '',
    content: '',
  });
  const doc = await newDoc.save();
  res.json(doc)
};

module.exports = {
  get,
  getAll,
  create,
};
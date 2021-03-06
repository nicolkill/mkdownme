const Docs = require('mongoose').model('Docs');

const errors = require('../../config/errors');

const {
  NotFoundError,
} = require('../../config/errors');

const getAll = async (req, res) => {
  const docs = await Docs.find({}, '_id name updatedAt').sort({ updatedAt: -1 });
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

const update = async (req, res) => {
  const data = req.body;

  data.name = data.content.split('\n')[0]
    .replace(/#/g, '')
    .replace(/\*/g, '')
    .replace(/_/g, '')
    .replace(/-/g, '')
    .trim();

  const doc = await Docs.findByIdAndUpdate(
    req.params.id,
    data,
    {new: true},
  );
  if (!doc) {
    throw new NotFoundError();
  }
  res.json(doc);
};

const remove = async (req, res) => {
  const doc = await Docs.findByIdAndRemove(req.params.id);

  if (!doc) {
    throw new errors.Conflict();
  }

  res.noContent();
};

module.exports = {
  get,
  getAll,
  create,
  update,
  remove,
};
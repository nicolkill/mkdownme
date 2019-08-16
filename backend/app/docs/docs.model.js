const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  name: String,
  content: String,
}, {
  collection: 'docs',
  timestamps: true,
});

module.exports = mongoose.model('Docs', docSchema);
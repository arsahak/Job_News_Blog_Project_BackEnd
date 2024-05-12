const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  author: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,

    ref: 'User',
  },
});

module.exports = mongoose.model('News', newsSchema);

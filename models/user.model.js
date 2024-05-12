const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    reuire: true,
  },
  lastName: {
    type: String,
    reuire: true,
  },
  email: {
    type: String,
    reuire: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  news: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);

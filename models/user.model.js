const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    reuire: true,
    unique: true,
  },
  password: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  news: [
    {
      type: mongoose.Types.ObjectId,
      ref: "News",
    },
  ],
  category: [
    {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  ],
  subCategory: [
    {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  saveNews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "SaveNews",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

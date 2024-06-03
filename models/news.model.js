const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  subCategory: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("News", newsSchema);

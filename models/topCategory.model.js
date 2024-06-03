const mongoose = require("mongoose");

const topCategorySchema = mongoose.Schema({
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("TopCategory", topCategorySchema);

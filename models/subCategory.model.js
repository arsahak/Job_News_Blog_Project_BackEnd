const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  subCategory: {
    type: String,
  },
  image: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);

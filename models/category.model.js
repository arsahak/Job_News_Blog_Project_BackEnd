const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  topCategory: {
    type: String,
    required: true,
  },
  category: [
    {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);

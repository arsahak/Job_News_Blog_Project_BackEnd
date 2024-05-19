const mongoose = require("mongoose");

const saveNewsSchema = mongoose.Schema({
  saveNewId: {
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

module.exports = mongoose.model("SaveNews", saveNewsSchema);

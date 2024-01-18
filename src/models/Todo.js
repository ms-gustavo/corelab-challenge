const mongoose = require("mongoose");
const validColors = require("../helpers/ValidColors");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isFavorite: { type: Boolean, default: false },
  backgroundColor: {
    type: String,
    enum: validColors,
    default: "black",
  },
  textColor: {
    type: String,
    enum: validColors,
    default: "white",
  },
});

module.exports = mongoose.model("Todo", todoSchema);

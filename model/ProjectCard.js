const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  donor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  mainImg: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);

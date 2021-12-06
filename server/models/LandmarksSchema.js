const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LandmarksSchema = new Schema({
  title: { type: String, required: true },
  imageUrlSet: [{ type: String }],
  description: { type: String },
});

const Landmarks = mongoose.model("landmarks", LandmarksSchema);

module.exports = {
    Landmarks,
  };
  
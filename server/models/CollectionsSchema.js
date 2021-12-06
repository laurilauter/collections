const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CollectionsSchema = new Schema({
  title: { type: String, required: true },
  imageUrlSet: [{ type: String }],
  description: { type: String },
});

const Collections = mongoose.model("collections", CollectionsSchema);

module.exports = {
    Collections,
  };
  
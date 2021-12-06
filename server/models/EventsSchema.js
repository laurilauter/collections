const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventsSchema = new Schema({
  title: { type: String, required: true },
  imageUrlSet: [{ type: String }],
  description: { type: String },
});

const Events = mongoose.model("Events", EventsSchema);

module.exports = {
    Events,
  };
  
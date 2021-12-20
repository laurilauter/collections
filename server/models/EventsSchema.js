const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventsSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String },
    description: { type: String },
    link: { type: String },
    location: { type: String },
    eventTime: { type: Date, default: Date.now },
    author: [{ userId: Number, userName: String }],
    active: { type: Boolean },
  },
  { timestamps: true }
);


const Events = mongoose.model("Events", EventsSchema);

module.exports = {
  Events,
};

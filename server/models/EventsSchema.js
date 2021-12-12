const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventsSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrlSet: [{ type: String }],
    description: { type: String },
    link: { type: String },
    location: { type: String },
    eventTime: { type: Date, default: Date.now },
    author: [{ userId: Number, userName: String }],
  },
  { timestamps: true }
);


const Events = mongoose.model("Events", EventsSchema);

module.exports = {
  Events,
};

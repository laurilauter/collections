const mongoose = require("mongoose");
const { Events } = require("./models/EventsSchema.js");
const { Users } = require("./models/UsersSchema.js");

// Connecting to database
mongoose.connect(
  "mongodb+srv://mulgikapsas:mulgikapsas@cluster0.1ltzv.mongodb.net/eventsapp?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);


module.exports = {
  Events,
  Users,
};

const mongoose = require("mongoose");
const { Events } = require("./models/EventsSchema.js");
const { Users } = require("./models/UsersSchema.js");
const dotenv = require("dotenv");

dotenv.config();
// Connecting to database
const { MONGO_URI } = require("./config");
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

module.exports = {
  Events,
  Users,
};

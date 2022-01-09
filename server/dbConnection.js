const mongoose = require("mongoose");
const { Events } = require("./models/EventsSchema.js");
const { Users } = require("./models/UsersSchema.js");
const dotenv = require("dotenv");

dotenv.config();
// Connecting to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

module.exports = {
  Events,
  Users,
};

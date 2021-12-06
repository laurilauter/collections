const mongoose = require("mongoose");
const { Collections } = require("./models/CollectionsSchema.js");
const { Users } = require("./models/UsersSchema.js");

// Connecting to database
mongoose.connect(
  "mongodb+srv://mulgikapsas:mulgikapsas@cluster0.1ltzv.mongodb.net/collectionsapp?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);


module.exports = {
  Collections,
  Users,
};

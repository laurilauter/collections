const mongoose = require("mongoose");
const { Landmarks } = require("./models/LandmarksSchema.js");
const { Users } = require("./models/UsersSchema.js");

// Connecting to database
mongoose.connect(
  "mongodb+srv://hapukapsas:hapukapsas@cluster1.ckjul.mongodb.net/landmarksapp?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);


module.exports = {
  Landmarks,
  Users,
};

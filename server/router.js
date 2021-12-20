const express = require("express");
const router = express.Router();
const { Events } = require("./dbConnection");
const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);

//GET events list
router.get("/get-events", async function (request, response) {
  const result = await Events.find();
  response.status(200).send(result);
});

//GET a single event by id
router.get("/get-event/:id", async function (request, response) {
  let result = await Events.findOne({ _id: request.params.id });
  console.log("Info from DB", result);
  response.send(result);
});

//Add a new event
router.post("/add-event", async function (request, response) {
  if (request.body) {
    await Events.create(request.body);
    console.log("BE Add event started");
  }
  console.log("BE Add event ended");
  response.send("Addition sucessful");
});

router.patch("/edit-event/:id", async function (request, response) {
  console.log("BE edit started");
  await Events.updateOne(
    { _id: request.params.id },
    {
      $set: {
        title: request.body.title,
        imageUrl: request.body.imageUrl,
        description: request.body.description,
        link: request.body.link,
        location: request.body.location,
        eventTime: request.body.eventTime,
        author: request.body.author,
        active: request.body.active,
      },
    }
  );
  console.log("BE edit ended");
  response.send('Edit successful');
});

//Delete event
router.delete("/delete-event/:id", async function (request, response) {
  console.log('request.params.id ', request.params.id)
  const result = await Events.deleteOne({ _id: request.params.id });
  console.log(result);
  response.send('BE Event Deleted');
});

//Check token
router.get("/check-token", function (request, response) {
  const result = "Checking the token";
  console.log(result);
  response.send('Checked the token');
});

module.exports = router;

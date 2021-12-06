const express = require("express");
const router = express.Router();
const { Collections } = require("./dbConnection");
const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);

//GET landmarks list
router.get("/get-landmarks", async function (request, response) {
  const result = await Collections.find();
  response.status(200).send(result);
});

//GET a single landmark by id
router.get("/get-landmark/:id", async function (request, response) {
  let result = await Collections.findOne({ _id: request.params.id });
  console.log("Info from DB", result);
  response.send(result);
});

//Add a new landmark
router.post("/add-landmark", async function (request, response) {
  if (request.body) {
    await Collections.create(request.body);
    console.log("BE Add landmark started");
  }
  console.log("BE Add landmark ended");
  response.send("Addition sucessful");
});

router.patch("/edit-landmark/:id", async function (request, response) {
  console.log("BE edit started");
  await Collections.updateOne(
    { _id: request.params.id },
    {
      $set: {
        title: request.body.title,
        imageUrlSet: request.body.imageUrlSet,
        description: request.body.description,
      },
    }
  );
  console.log("BE edit ended");
  response.send('Edit successful');
});

//Delete landmark
router.post("/delete-landmark/:id", async function (request, response) {
  const result = await Collections.deleteOne({ _id: request.params.id });
  console.log(result);
  response.send(result);
});

module.exports = router;

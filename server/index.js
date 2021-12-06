// Express v4.16.0 and higher
// --------------------------
const express = require("express");
const app = express();
//const bodyParser = require("body-parser"); //Not needed when using below 4 lines
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const routes = require("./router");
const db = require("./dbConnection");

const expressJwt = require("express-jwt");
const { SECRET } = require("./config");

app.use(
  expressJwt({ secret: SECRET, algorithms: ["HS256"] }).unless({
    path: [
      "/api/auth/register",
      "/api/auth/login",
      "/api/get-landmarks",
      { url: /^\/api\/get-landmark\/.*/, methods: ['GET'] }, // removed PUT
    ],
  })
);



//BASIC SOLUTION
//for API routes
app.use("/api", routes);

//Respond if GET request is made to root URL
app.get("/", (req, res) => {
  res.send("Hello from Landmarks backend!");
});

// enable env port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Landmarks backend listening on port: ${PORT}`)
);

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;
const app = express();
const bodyParser = require("body-parser");
const { connect } = require("./config/db.config.js");
const authRoute = require("./route/auth.route.js");
const disasterRoute = require("./route/disaster.route.js");
const missingPeopleRoute = require("./route/reqmissingpeople.route.js");

connect();
app.disable("x-powered-by");
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4000",
      "https://infobencana.netlify.app",
      "https://gigih-backend-hhoivlttoa-et.a.run.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", authRoute);
app.use("/disaster", disasterRoute);
app.use("/missingpeople", missingPeopleRoute);

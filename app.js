const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./route/auth.route.js");
const disasterRoute = require("./route/disaster.route.js");
const missingPeopleRoute = require("./route/reqmissingpeople.route.js");
const { MONGO_URL, PORT } = process.env;
// x-www-form-urlencoded
const bodyParser = require("body-parser");
const { connect } = require("./config/db.config.js");

connect();

app.disable("x-powered-by");
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", authRoute);
app.use("/disaster", disasterRoute);
app.use("/missingpeople", missingPeopleRoute);

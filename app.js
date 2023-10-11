const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
// const cookieParser = require("cookie-parser");
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
    origin: ["http://localhost:5173", "https://localhost:5173" ,"http://localhost:4000", "https://gigih-backend-hhoivlttoa-et.a.run.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
    // exposedHeaders: ["set-cookie"],
  })
);
// app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", authRoute);
app.use("/disaster", disasterRoute);
app.use("/missingpeople", missingPeopleRoute);

// missingPeople.model.js
const mongoose = require("mongoose");

const reqMissingPeopleSchema = new mongoose.Schema(
  {
    req_by: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    bencana_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    bencana_name: {
      type: String,
    },
    missing_people_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    gender: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    age: {
      type: String,
    },
    address: {
      type: String,
    },
    last_seen: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    req_status: {
      type: String,
    },
  },
  {
    versionKey: false, // Hide the __v field
  },
);

module.exports = mongoose.model("ReqMissingPeople", reqMissingPeopleSchema);

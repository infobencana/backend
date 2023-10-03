const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
  },
  platform_name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  holder_name: {
    type: String,
    required: true,
  },
});

const peopleGoneSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: false,
    default: "",
  },
  height: {
    type: String,
    required: false,
    default: "",
  },
  age: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  last_seen: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const discussSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const disasterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  place: {
    type: String,
    required: true,
  },
  latitude: {
    type: mongoose.Decimal128,
    required: false,
    default: 0.0,
  },
  longitude: {
    type: mongoose.Decimal128,
    required: false,
    default: 0.0,
  },
  donations: [donationSchema],
  picture: {
    type: String,
    required: true,
  },
  people_gone: [peopleGoneSchema],
  discuss: [discussSchema],
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Disaster", disasterSchema);

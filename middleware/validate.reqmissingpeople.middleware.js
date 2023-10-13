const { body } = require("express-validator");
const reqMissingPeopleModel = require("../model/reqmissingpeople.model");
const { validateRequestBody } = require("../middleware/validation.middleware");

const validateCreateMissingPeople = [
  validateRequestBody(reqMissingPeopleModel),
  body("bencana_id").notEmpty().withMessage("Bencana ID is required"),
  body("missing_people_id")
    .notEmpty()
    .withMessage("Missing People ID is required"),
];

const validateUpdatePeopleGone = [
  body("reqMissingPeopleId")
    .notEmpty()
    .withMessage("reqMissingPeopleId is required"),
];

module.exports = {
  validateCreateMissingPeople,
  validateUpdatePeopleGone,
};

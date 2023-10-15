const { body } = require("express-validator");
const reqMissingPeopleModel = require("../model/reqmissingpeople.model");
const {
  validateRequestBody,
  validateFieldPresence,
} = require("../middleware/validation.middleware");

const validateCreateMissingPeople = [
  validateRequestBody(reqMissingPeopleModel),
  body("bencana_id").notEmpty().withMessage("Bencana ID is required"),
  body("missing_people_id")
    .notEmpty()
    .withMessage("Missing People ID is required"),
];

const validateUpdatePeopleGone = [
  body().custom(validateFieldPresence("req_missing_people_id", "req_status")),
  body("req_status").custom((value) => {
    if (!/accepted|rejected/.test(value)) {
      throw new Error(
        "Status harus berisi accepted atau rejected"
      );
    }
    return true;
  }),
];

module.exports = {
  validateCreateMissingPeople,
  validateUpdatePeopleGone,
};

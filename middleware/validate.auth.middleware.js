const { body } = require("express-validator");
const UserModel = require("../model/user.model");
const {
  validateRequestBody,
  validateFieldPresence,
} = require("../middleware/validation.middleware");

const validateSignup = [
  validateRequestBody(UserModel),
  body("full_name").notEmpty().withMessage("Full name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateLogin = [
  validateRequestBody(UserModel),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateUpdateProfile = [
  body().custom(validateFieldPresence("full_name", "gender", "phone_number", "photo_profile")),
];

module.exports = {
  validateSignup,
  validateLogin,
  validateUpdateProfile,
};

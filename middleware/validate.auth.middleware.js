const { body } = require("express-validator");
const UserModel = require("../model/user.model");
const { validateRequestBody } = require("../middleware/validation.middleware");

const validateSignup = [
  validateRequestBody(UserModel),
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
  body("full_name").notEmpty().withMessage("Full name is required"),
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

module.exports = {
  validateSignup,
  validateLogin,
};

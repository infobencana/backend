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

const validateUpdateProfile = [
  body("full_name").matches(/^full_name$/).withMessage("Full name should exactly match the expected field name"),
  body("phone_number").matches(/^phone_number$/).withMessage("Phone number should exactly match the expected field name"),
  body("photo_profile").matches(/^photo_profile$/).withMessage("Photo profile should exactly match the expected field name"),
];

module.exports = {
  validateSignup,
  validateLogin,
  validateUpdateProfile,
};

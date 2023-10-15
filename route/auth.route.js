const {
  Signup,
  Login,
  Profile,
  UpdateProfile,
} = require("../controller/auth.controller");
const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { uploadPhotoProfile } = require("../middleware/upload.middleware");
const {
  validateLogin,
  validateSignup,
  validateUpdateProfile,
} = require("../middleware/validate.auth.middleware");
const {
  handleValidationErrors,
} = require("../middleware/validation.middleware");

router.post("/signup", validateSignup, handleValidationErrors, Signup);
router.post("/login", validateLogin, handleValidationErrors, Login);
router.put("/profile", verifyToken, validateUpdateProfile, handleValidationErrors, uploadPhotoProfile, UpdateProfile);
router.get("/profile", verifyToken, Profile);

module.exports = router;

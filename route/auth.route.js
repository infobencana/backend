const {
  Signup,
  Login,
  Profile,
  UpdateProfile,
  UploadPhotoProfile,
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
  // validateFieldPresence,
} = require("../middleware/validation.middleware");


router.post("/profile/upload_photo", verifyToken, uploadPhotoProfile, UploadPhotoProfile);
router.put("/profile", verifyToken, uploadPhotoProfile, validateUpdateProfile, handleValidationErrors, UpdateProfile);
router.get("/profile", verifyToken, Profile);
router.post("/signup", validateSignup, handleValidationErrors, Signup);
router.post("/login", validateLogin, handleValidationErrors, Login);

module.exports = router;

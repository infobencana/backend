const { Signup, Login, Logout, Profile, UpdateProfile } = require("../controller/auth.controller");
const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { uploadPhotoProfile, uploadPicture } = require("../middleware/upload.middleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);
router.put("/profile", verifyToken, uploadPhotoProfile, UpdateProfile);
// router.put("/picture", verifyToken, uploadPicture, UpdatePicture);

module.exports = router;
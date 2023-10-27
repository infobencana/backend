const {
  AddDisaster,
  GetListDisaster,
  GetDisasterById,
  AddPeopleGone,
  DeleteDisaster,
  UpdateDisaster,
  DeletePeopleGone,
  AddDiscuss,
  GetDiscussById,
  GetWeeklyReports,
  AddImage,
  GetLatLong
} = require("../controller/disaster.controller");
const router = require("express").Router();
const {
  uploadPicture
} = require("../middleware/upload.middleware");
const {
  validateInputDisaster,
  validateAddPeopleGone,
  validateDisasterSchema,
  validateDonationSchema,
  validateDiscussSchema,
  validatePeopleGoneSchema,
} = require("../middleware/validate.disaster.middleware");
const {
  verifyToken
} = require("../middleware/auth.middleware");

router.post("", verifyToken, validateDisasterSchema, validateDonationSchema, validateDiscussSchema, validatePeopleGoneSchema, uploadPicture, validateInputDisaster, AddDisaster);
router.get("", GetListDisaster);
router.post("/image", uploadPicture, verifyToken, AddImage);
router.get("/weekly_report", GetWeeklyReports);
router.get("/lat_long", GetLatLong);
router.post("/:disasterId/discuss", verifyToken, AddDiscuss);
router.get("/:disasterId/discuss", GetDiscussById);
router.post("/:disasterId/people_gone", verifyToken, validateAddPeopleGone, AddPeopleGone);
router.delete("/:disasterId/people_gone/:id", verifyToken, DeletePeopleGone);
router.get("/:disasterId", GetDisasterById);
router.delete("/:disasterId", verifyToken, DeleteDisaster);
router.put("/:disasterId", verifyToken, uploadPicture, validateDisasterSchema, validateDonationSchema, validateDiscussSchema, validatePeopleGoneSchema, UpdateDisaster);

module.exports = router;
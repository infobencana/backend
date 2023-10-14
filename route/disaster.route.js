const {
  AddDisaster,
  GetListDisaster,
  GetDisasterById,
  AddPeopleGone,
  DeleteDisaster,
  UpdateDisaster,
  DeletePeopleGone,
  AddDiscuss,
  GetWeeklyReports
} = require("../controller/disaster.controller");
const {
  verifyToken
} = require("../middleware/auth.middleware");
const router = require("express").Router();
const {
  uploadPicture
} = require("../middleware/upload.middleware");
const {
  validateInputDisaster,
} = require("../middleware/validate.disaster.middleware");

router.post("", verifyToken, uploadPicture, validateInputDisaster, AddDisaster);
router.get("", verifyToken, GetListDisaster);
router.delete("/:disasterId", verifyToken, DeleteDisaster);
router.put("/:disasterId", uploadPicture, verifyToken, UpdateDisaster);
router.post("/:disasterId/people_gone", verifyToken, AddPeopleGone);
router.delete("/:disasterId/people_gone/:id", verifyToken, DeletePeopleGone);
// router.post("/:disasterId/discuss", verifyToken, AddDiscuss);
router.get("/weekly_report", GetWeeklyReports);

module.exports = router;
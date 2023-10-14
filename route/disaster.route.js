const {
  AddDisaster,
  GetListDisaster,
  AddPeopleGone,
  DeleteDisaster,
  UpdateDisaster,
  // UpdatePeopleGone,
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

router.post("", uploadPicture, validateInputDisaster, AddDisaster);
router.get("", GetListDisaster);
router.delete("/:disasterId", DeleteDisaster);
router.put("/:disasterId", uploadPicture, UpdateDisaster);
router.post("/:disasterId/people_gone", AddPeopleGone);
// router.put("/:disasterId/people_gone/:personId", UpdatePeopleGone);
// Delete People Gone
router.delete("/:disasterId/people_gone/:id", DeletePeopleGone);
// router.post("/:disasterId/discuss", verifyToken, AddDiscuss);
router.get("/weekly_report", GetWeeklyReports);

module.exports = router;
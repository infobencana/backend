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
  GetWeeklyReports
} = require("../controller/disaster.controller");

const router = require("express").Router();
const { uploadPicture } = require("../middleware/upload.middleware");
const {
  validateInputDisaster,
} = require("../middleware/validate.disaster.middleware");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("", verifyToken, uploadPicture, validateInputDisaster, AddDisaster);
router.get("", verifyToken, GetListDisaster);
router.post("/:disasterId/discuss", verifyToken, AddDiscuss);
router.get("/:disasterId/discuss", verifyToken, GetDiscussById);
router.get("/weekly_report", verifyToken, GetWeeklyReports);
router.post("/:disasterId/people_gone", verifyToken, AddPeopleGone);
router.delete("/:disasterId/people_gone/:id", verifyToken, DeletePeopleGone);
router.get("/:disasterId", verifyToken, GetDisasterById);
router.delete("/:disasterId", verifyToken, DeleteDisaster);
router.put("/:disasterId", uploadPicture, verifyToken, UpdateDisaster);

module.exports = router;

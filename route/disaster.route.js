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
} = require("../controller/disaster.controller");

const router = require("express").Router();
const { uploadPicture } = require("../middleware/upload.middleware");
const {
  validateInputDisaster,
  validateAddPeopleGone,
} = require("../middleware/validate.disaster.middleware");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("", verifyToken, uploadPicture, validateInputDisaster, AddDisaster);
router.get("", verifyToken, GetListDisaster);
router.post("/image", uploadPicture, verifyToken, AddImage);
router.get("/weekly_report", verifyToken, GetWeeklyReports);
router.post("/:disasterId/discuss", verifyToken, AddDiscuss);
router.get("/:disasterId/discuss", verifyToken, GetDiscussById);
router.post("/:disasterId/people_gone", verifyToken, validateAddPeopleGone, AddPeopleGone);
router.delete("/:disasterId/people_gone/:id", verifyToken, DeletePeopleGone);
router.get("/:disasterId", verifyToken, GetDisasterById);
router.delete("/:disasterId", verifyToken, DeleteDisaster);
router.put("/:disasterId", uploadPicture, verifyToken, UpdateDisaster);

module.exports = router;

const {
  AddDisaster,
  GetListDisaster,
  GetDisasterById,
  AddPeopleGone,
  DeleteDisaster,
  UpdateDisaster,
  DeletePeopleGone
} = require("../controller/disaster.controller");

const router = require("express").Router();
const { uploadPicture } = require("../middleware/upload.middleware");
const {
  validateInputDisaster,
} = require("../middleware/validate.disaster.middleware");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("", verifyToken, uploadPicture, validateInputDisaster, AddDisaster);
router.get("", verifyToken, GetListDisaster);
router.get("/:disasterId", verifyToken, GetDisasterById);
router.delete("/:disasterId", verifyToken, DeleteDisaster);
router.put("/:disasterId", uploadPicture, verifyToken, UpdateDisaster);
router.post("/:disasterId/people_gone", verifyToken, AddPeopleGone);
router.delete("/:disasterId/people_gone/:id", verifyToken, DeletePeopleGone);

module.exports = router;

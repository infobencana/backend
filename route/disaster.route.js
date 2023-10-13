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

router.post("", uploadPicture, validateInputDisaster, AddDisaster);
router.get("", GetListDisaster);
router.get("/:disasterId", GetDisasterById);
router.delete("/:disasterId", DeleteDisaster);
router.put("/:disasterId", uploadPicture, UpdateDisaster);
router.post("/:disasterId/people_gone", AddPeopleGone);
router.delete("/:disasterId/people_gone/:id", DeletePeopleGone);

module.exports = router;

const router = require("express").Router();
const {
  createMissingPeople,
  getMissingPeople,
  getMissingPeopleById,
  deleteMissingPeople,
  addMissingPeopleFromDisaster,
  updatePeopleGoneInDisaster,
} = require("../controller/reqmissingpeople.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  validateCreateMissingPeople,
  validateUpdatePeopleGone,
} = require("../middleware/validate.reqmissingpeople.middleware");
const {
  handleValidationErrors,
} = require("../middleware/validation.middleware");

router.post(
  "",
  verifyToken,
  validateCreateMissingPeople,
  handleValidationErrors,
  createMissingPeople
);
router.get("", verifyToken, getMissingPeople);
router.get("/:id", verifyToken, getMissingPeopleById);
router.delete("/:id", verifyToken, deleteMissingPeople);
router.post("/add-from-disaster", verifyToken, addMissingPeopleFromDisaster);
router.post(
  "/update-people-gone",
  verifyToken,
  validateUpdatePeopleGone,
  updatePeopleGoneInDisaster
);

module.exports = router;

const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  equbCreationValidation,
  validate,
} = require("../middlewares/validation");
const {
  createEqub,
  getEqubs,
  getEqub,
  getNearbyEqubs,
  regenerateCode,
  updateEqub,
  authorizeEqub,
  deleteEqub,
} = require("../controllers/equbController");

router
  .route("/")
  .post(protect, equbCreationValidation, validate, createEqub)
  .get(protect, admin, getEqubs);
router.get("/search", protect, getEqub);
router.get("/nearby", protect, getNearbyEqubs);
router.put("/:id/regenerate-code", protect, regenerateCode);
router.post("/:id/authorize", protect, admin, authorizeEqub);
router.route("/:id").put(protect, updateEqub).delete(protect, deleteEqub);

module.exports = router;

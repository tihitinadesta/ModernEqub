const express = require("express");
const {
  adminRegister,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updatePassword,
} = require("../controllers/adminController");
const {
  adminRegistrationValidation,
  validate,
} = require("../middlewares/validation");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", adminRegistrationValidation, validate, adminRegister);
router.post("/login", loginAdmin);
router.get("/profile", protect, admin, getAdminProfile);
router.post("/forgot-password", protect, admin, forgotPassword);
router.post("/verify-otp", protect, admin, verifyOTP);
router.put("/reset-password", protect, admin, resetPassword);
router.put("/change-password", protect, admin, updatePassword);
router.post("/logout", protect, admin, logoutAdmin);

module.exports = router;

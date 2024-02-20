const express = require("express");
const {
  adminRegister,
  loginAdmin,
  getAdminProfile,
  adminForgotPassword,
} = require("../controllers/adminController");
const {
  logout,
  verifyOTP,
  updatePassword,
  resetPassword,
} = require("../controllers/authController");
const {
  adminRegistrationValidation,
  validate,
} = require("../middlewares/validation");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", adminRegistrationValidation, validate, adminRegister);
router.post("/login", loginAdmin);
router.get("/profile", protect, admin, getAdminProfile);
router.post("/forgot-password", protect, admin, adminForgotPassword);
router.post("/verify-otp", protect, admin, verifyOTP);
router.put("/reset-password", protect, admin, resetPassword);
router.put("/change-password", protect, admin, updatePassword);
router.post("/logout", protect, admin, logout);

module.exports = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  verifyOTP,
  updatePassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const {
  registrationValidation,
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");
const router = express.Router();

router.post("/register", registrationValidation, validate, registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", protect, forgotPassword);
router.post("/verify-otp", protect, verifyOTP);
router.put("/change-password", protect, updatePassword);
router.put(
  "/reset-password",
  protect,
  resetPasswordValidation,
  validate,
  resetPassword
);
router.post("/logout", protect, logout);

module.exports = router;

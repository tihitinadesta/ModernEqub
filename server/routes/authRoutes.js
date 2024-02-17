const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const {
  registrationValidation,
  loginValidation,
  resetPasswordValidation,
  validate,
} = require("../middlewares/validation");
const router = express.Router();

router.post("/register", registrationValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.post("/forgot-password", protect, forgotPassword);
router.post("/verify-otp", protect, verifyOTP);
router.put(
  "/reset-password",
  protect,
  resetPasswordValidation,
  validate,
  resetPassword
);
router.post("/logout", logoutUser);

module.exports = router;

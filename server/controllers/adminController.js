const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const { generatePassword } = require("../utils/generatePassword");
const authService = require("../services/authService");

// @desc      Register admin
// @route     POST /api/admin/register
// @access    Private
exports.adminRegister = asyncHandler(async (req, res, next) => {
  const { fullName, email } = req.body;

  // Check if the admin already exists
  let adminExists = await User.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const password = generatePassword(req.body.fullName);

  const user = await User.create({
    fullName,
    email,
    password,
    role: "admin",
    isAdmin: true,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc       Login admin
//@route      POST /api/auth/login
//@access     Public
exports.loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Get Amin profile
//@route GET /api/admin/profile
//@access Private
exports.getAdminProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.fullName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

// @desc      Update password
// @route     PUT /api/admin/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();
});

// @desc       Logout admin / clear cookie
// @route      POST /api/admin/logout
// @access     Private
exports.logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out Successfully." });
});

// @desc      Initiate forgot password process
// @route     POST /api/admin/forgot-password
// @access    Private
exports.forgotPassword = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const admin = await User.findOne({ email });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  await authService.initiateForgotPasswordEmail(email, req.session);
  res.status(200).json({ message: "OTP sent successfully" });
});

// @desc      Verify OTP
// @route     POST /api/admin/verify-otp
// @access    Private
exports.verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const storedOTP = req.session.otp;
  const otpExpiryTime = req.session.otpExpiryTime;

  // Check if OTP is expired
  const currentTime = new Date();
  if (otpExpiryTime && currentTime > otpExpiryTime) {
    res.status(400).json({ error: "OTP has expired" });
    return;
  }

  // Verify OTP
  const isValid = authService.verifyOTP(otp, storedOTP);
  if (isValid) {
    // Clear OTP and OTP expiry time from session
    delete req.session.otp;
    delete req.session.otpExpiryTime;
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

// @desc      Reset password
// @route     PUT /api/admin/resetpassword
// @access    Private
exports.resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  user.password = req.body.password;
  await user.save();
  res.status(200).json({ message: "Password reset successfully" });
});

// @desc      Update password
// @route     PUT /api/admin/change-password
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res.status(401).json({ error: "Password is incorrect" });
  }

  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({ message: "Password updated successfully" });
});

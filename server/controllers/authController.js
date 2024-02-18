const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const authService = require("../services/authService");

// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, username, phoneNumber, password } = req.body;

  // Check if user already exists
  let userExists = await User.findOne({ $or: [{ username }, { phoneNumber }] });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fullName,
    username,
    phoneNumber,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc       Login user
//@route      POST /api/auth
//@access     Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  const user = await User.findOne({ phoneNumber });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.status(401);
    throw new Error("Invalid phoneNumber or password");
  }
});

// @desc       Logout user / clear cookie
// @route      POST /api/auth/logout
// @access     Private
exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out Successfully." });
});

// @desc      Initiate forgot password process
// @route     POST /api/auth/forgot-password
// @access    Private
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  await authService.initiateForgotPassword(phoneNumber, req.session);
  res.status(200).json({ message: "OTP sent successfully" });
});

// @desc      Verify OTP
// @route     POST /api/auth/verify-otp
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
// @route     PUT /api/auth/resetpassword
// @access    Private
exports.resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  user.password = req.body.password;
  await user.save();
  res.status(200).json({ message: "Password reset successfully" });
});

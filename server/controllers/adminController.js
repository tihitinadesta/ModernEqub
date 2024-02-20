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

// @desc      Initiate forgot password process
// @route     POST /api/admin/forgot-password
// @access    Private
exports.adminForgotPassword = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const admin = await User.findOne({ email });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }
  await authService.initiateForgotPasswordEmail(email, req.session);
  res.status(200).json({ message: "OTP sent successfully" });
});

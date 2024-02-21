const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc      Get all users
// @route     GET /api/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ isAdmin: false }).select("-password");
  if (!users || users.length === 0) {
    return res.status(404).json({ message: "Users not found" });
  }
  res.status(200).json(users);
});

// @desc      Get a single user
// @route     GET /api/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// @desc    Get admin users
// @route   GET /api/users/admins
// @access  Private/Admin
exports.getAdmins = asyncHandler(async (req, res, next) => {
  const users = await User.find({ role: "admin" }).select("-password");
  if (!users || users.length === 0) {
    return res.status(404).json({ message: "Users not found" });
  }
  res.status(200).json(users);
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

// @desc      Update a user
// @route     PUT /api/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check if admin is trying to update critical user fields
  const { password, email, username, phoneNumber, fullName } = req.body;
  if (password || email || username || phoneNumber || fullName) {
    return res.status(400).json({
      message:
        "You are not allowed to update password, email, username, phoneNumber or fullName",
    });
  }

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ data: user });
});

// @desc      Delete a user
// @route     DELETE /api/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check if admin is trying to delete itself
  if (id === req.user.id) {
    return res
      .status(403)
      .json({ message: "Admin cannot delete its own account" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndDelete(id);
  res.status(200).json({ data: {} });
});

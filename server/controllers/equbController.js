const Equb = require("../models/Equb");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { generateEqubCode } = require("../utils/generatePassword");

// @desc    Create Equb
// @route   POST /api/equbs
// @access  Private (User)
exports.createEqub = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user._id;

  const existingEqub = await Equb.findOne({ createdBy: req.user._id });
  if (existingEqub) {
    return res
      .status(401)
      .json({ message: "The user already created an equb" });
  }
  const equb = await Equb.create(req.body);
  await req.user.updateOne({ $push: { createdEqub: equb._id } });
  res.status(201).json(equb);
});

//@desc    Get equb the user owns
//@rout    GET /api/equbs/my
//@access  Private (User)
exports.getMyEqub = asyncHandler(async (req, res) => {
  const equb = await Equb.findOne({ createdBy: req.user._id });
  if (!equb) {
    return res.status(404).json({ error: "Equb not found" });
  }

  res.status(200).json(equb);
});

// @desc    Update Equb
// @route   PUT /api/equbs/:id
// @access  Private
exports.updateEqub = asyncHandler(async (req, res) => {
  let equb = await Equb.findById(req.params.id);
  if (!equb) {
    return res.status(404).json({ error: "Equb not found" });
  }

  const user = await User.findById(req.user._id);
  if (
    !user ||
    (user.role !== "admin" && equb.createdBy.toString() !== req.user._id)
  ) {
    return res
      .status(401)
      .json({ error: "Not authorized to update this equb" });
  }

  equb = await Equb.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  await equb.save();
  res.status(200).json(equb);
});

// @desc    Regenerate Equb Code
// @route   PUT /api/equbs/:id/regenerate-code
// @access  Private (User)
exports.regenerateCode = asyncHandler(async (req, res) => {
  const equb = await Equb.findById(req.params.id);
  if (!equb) {
    return res.status(404).json({ error: "Equb not found" });
  }
  if (equb.createdBy.toString() !== req.user._id) {
    return res
      .status(401)
      .json({ error: "Not authorized to regenerate code for this equb" });
  }
  const newEqubCode = generateEqubCode();

  equb.equb_code = newEqubCode;
  await equb.save();
  res.status(200).json({ message: "Equb code changed successfully" });
});

// @desc    Get All Equbs
// @route   GET /api/equbs
// @access  Private (Admin)
exports.getEqubs = asyncHandler(async (req, res) => {
  const equbs = await Equb.find();
  if (!equbs) {
    return res.status(404).json({ message: "Equbs not found" });
  }
  res.status(200).json(equbs);
});

// @desc      Search equb
// @route     GET /api/equbs/search
// @access    Private (User)
exports.getEqub = asyncHandler(async (req, res, next) => {
  const equb_code = req.body.equb_code;
  const equb = await Equb.findOne({ equb_code });
  if (!equb) {
    return res.status(404).json({ message: "Equb not found" });
  }
  res.status(200).json(equb);
});

// @desc    Get Nearby Equbs in a specific area
// @route   GET /api/equbs/:latitude/:longitude/nearby
// @access  Private
exports.getNearbyEqubs = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.params;
  const userCoordinates = [parseFloat(latitude), parseFloat(longitude)];

  // Query nearby equbs using Mongoose's geospatial query
  const nearbyEqubs = await Equb.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: userCoordinates,
        },
        $maxDistance: process.env.MAX_DISTANCE,
      },
    },
  });
  res.status(200).json(nearbyEqubs);
});

// @desc     Delete Equb
// @route    DELETE /api/equbs/:id
// @access   Private
exports.deleteEqub = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let equb = await Equb.findById(id);

  if (!equb) {
    return res.status(404).json({ message: "Equb not found" });
  }
  const user = await User.findById(req.user._id);
  if (
    !user ||
    (user.role !== "admin" && equb.createdBy.toString() !== req.user._id)
  ) {
    return res
      .status(401)
      .json({ error: "Not authorized to delete this equb" });
  }
  equb = await Equb.findOneAndDelete(id);
  res.status(200).json({ message: "Equb deleted successfully" });
});

// @desc     Authorize Equb
// @route    POST /api/equbs/:id/authorize
// @access   Private (Admin)
exports.authorizeEqub = asyncHandler(async (req, res) => {
  const equb = await Equb.findById(req.params.id);
  if (!equb) return res.status(404).json({ error: "Equb not found" });

  equb.isAuthorized = true;
  await Promise.all([
    equb.save(),
    User.findByIdAndUpdate(equb.createdBy._id, { role: "manager" }),
  ]);

  res.status(200).json(equb);
});

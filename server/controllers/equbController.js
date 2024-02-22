const Equb = require("../models/Equb");
const asyncHandler = require("express-async-handler");
const { generateEqubCode } = require("../utils/generatePassword");

// @desc    Create Equb
// @route   POST /api/equbs
// @access  Private (User)
exports.createEqub = asyncHandler(async (req, res) => {
  const equb = new Equb({
    ...req.body,
  });

  await equb.save();
  res.status(201).json(equb);
});

// @desc    Update Equb
// @route   PUT /api/equbs/:id
// @access  Private (Admin)
exports.updateEqub = asyncHandler(async (req, res) => {
  let equb = await Equb.findById(req.params.id);
  if (!equb) {
    return res.status(404).json({ error: "Equb not found" });
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

// @desc     Delete Equb
// @route    DELETE /api/equbs/:id
// @access   Private (User)
exports.deleteEqub = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let equb = await Equb.findById(id);

  if (!equb) {
    return res.status(404).json({ message: "Equb not found" });
  }
  equb = await Equb.findOneAndDelete(id);

  res.status(200).json({ message: "Equb deleted successfully" });
});

// @desc     Authorize Equb
// @route    POST /api/equbs/:id/authorize
// @access   Private (Admin)
exports.authorizeEqub = asyncHandler(async (req, res) => {
  const equb = await Equb.findById(req.params.id);
  if (!equb) {
    return res.status(404).json({ error: "Equb not found" });
  }
  equb.isAuthorized = true;

  await equb.save();
  res.status(200).json(equb);
});

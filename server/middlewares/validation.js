const { body, validationResult } = require("express-validator");
const validatePhoneNumber = require("validate-phone-number-node-js");

const registrationValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .isLength({ min: 4, max: 25 })
    .withMessage("Full Name must be between 4 and 25 characters"),
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),
  body("phoneNumber")
    .trim()
    .notEmpty()
    .custom((value) => {
      const isValidPhoneNumber = validatePhoneNumber.validate(value);
      if (!isValidPhoneNumber) {
        throw new Error("Please enter a valid phone number");
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password should have at least 8 characters long"),
];

const adminRegistrationValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .isLength({ min: 4, max: 25 })
    .withMessage("Full Name must be between 4 and 25 characters"),
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email address"),
];

const resetPasswordValidation = [
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password should have at least 8 characters long"),
];

const equbCreationValidation = [
  body("equb_name").trim().notEmpty().withMessage("Equb name is required"),
  body("number_of_participant")
    .isInt({ min: 3, max: 50 })
    .withMessage("Number of participants must be between 3 and 50"),
  body("amount")
    .isInt({ min: 500, max: 10000 })
    .withMessage("Amount must be between 500 and 10,000"),
  body("type")
    .trim()
    .notEmpty()
    .withMessage("Type must be one of: daily, weekly, monthly"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("starting_date")
    .isAfter(
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    )
    .withMessage("Starting date must be at least 3 days from today"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = {
  registrationValidation,
  adminRegistrationValidation,
  resetPasswordValidation,
  equbCreationValidation,
  validate,
};

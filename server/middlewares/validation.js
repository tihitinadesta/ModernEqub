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

const loginValidation = [
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
  body("password").trim().notEmpty(),
];

const resetPasswordValidation = [
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password should have at least 8 characters long"),
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
  loginValidation,
  resetPasswordValidation,
  adminRegistrationValidation,
  validate,
};

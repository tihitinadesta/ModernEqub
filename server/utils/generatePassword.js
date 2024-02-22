// Function to generate a random password
const generatePassword = (name) => {
  const nameChars = name.substring(0, 4);

  const fixedNumber = 1234;

  // Combine name characters and fixed numbers
  return `${nameChars}${fixedNumber}`;
};

// Function to generate OTP password for email verification
const generateForgetPasswordEmail = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to generate a new equb code
const generateEqubCode = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `E${randomDigits}`;
};

module.exports = {
  generatePassword,
  generateForgetPasswordEmail,
  generateEqubCode,
};

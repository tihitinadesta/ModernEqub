// Function to generate a random password
const generatePassword = (name) => {
  const nameChars = name.substring(0, 4);

  const fixedNumber = 1234;

  // Combine name characters and fixed numbers
  return `${nameChars}${fixedNumber}`;
};

const generateForgetPasswordEmail = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = { generateForgetPasswordEmail, generatePassword };

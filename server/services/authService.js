const twilio = require("twilio");
const { generateForgetPasswordEmail } = require("../utils/generatePassword");
const sendEmail = require("../utils/sendEmail");

// Create a Twilio client
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPViaSMS(phoneNumber, otp) {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log(`OTP sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Error sending OTP: ${error.message}`);
  }
}

async function initiateForgotPassword(phoneNumber, session) {
  const otp = generateOTP();
  const otpExpiryTime = Date.now() + 2 * 60 * 1000;
  await sendOTPViaSMS(phoneNumber, otp);
  // Store OTP in session
  session.otp = otp;
  session.otpExpiryTime = otpExpiryTime;
}

async function initiateForgotPasswordEmail(email, session) {
  const otp = generateForgetPasswordEmail();
  const otpExpiryTime = Date.now() + 2 * 60 * 1000;
  const text = `You are receiving this email because you (or someone else) has requested the reset of a password for your account. Please verify this OTP and procced with the steps: ${otp}`;
  await sendEmail({
    email,
    subject: "Password reset otp",
    text,
  });
  session.otp = otp;
  session.otpExpiryTime = otpExpiryTime;
}

// Function to verify OTP
function verifyOTP(otp, storedOTP) {
  return otp === storedOTP;
}

module.exports = {
  initiateForgotPassword,
  initiateForgotPasswordEmail,
  verifyOTP,
};

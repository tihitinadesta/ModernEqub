const twilio = require("twilio");

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

// Function to verify OTP
function verifyOTP(otp, storedOTP) {
  return otp === storedOTP;
}

module.exports = {
  initiateForgotPassword,
  verifyOTP,
};

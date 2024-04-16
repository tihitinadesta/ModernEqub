import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button } from "@mui/material";
import { useAuth } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";

const VerificationPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { verifyOTP, isVerified, error, dispatch } = useAuth();
  const [resendTime, setResendTime] = useState(120);

  const handleResend = () => {
    setResendTime(120);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendTime > 0) {
        setResendTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTime]);

  const handleOTPVerification = async () => {
    try {
      await verifyOTP(otp);
      navigate("/reset-password");
    } catch (error) {
      toast.error(error || "Something went wrong");
      dispatch({ type: "CLEAR_ERROR" });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong");
      dispatch({ type: "CLEAR_ERROR" });
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isVerified) {
      navigate("/reset-password");
    }
  }, [isVerified, navigate]);


  return (
    <Container
      sx={{
        margin: "50px auto 0",
        width: "380px",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        background: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <>
        <h2 style={{ textAlign: "center" }}>Verification</h2>
        <p>You will get a verification OTP code via Email</p>
      </>
      <TextField
        label="Enter Verification Code"
        variant="outlined"
        margin="normal"
        fullWidth
        value={otp}
        onChange={(e) => {
          const numericValue = e.target.value
            .replace(/[^0-9]/g, "")
            .slice(0, 6);
             setOtp(numericValue);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          padding: "10px 0",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "bold",
        }}
        onClick={handleOTPVerification}
        disabled={isVerified || otp.length !== 6}
      >
        Verify OTP
      </Button>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        {resendTime > 0 ? (
          `Time Remaining: ${formatTime(resendTime)}`
        ) : (
          <Button
            variant="text"
            color="primary"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
           onClick={handleResend}
            disabled={isVerified}
          >
            Resend OTP
          </Button>
        )}
      </p>
    </Container>
  );
};

export default VerificationPage;

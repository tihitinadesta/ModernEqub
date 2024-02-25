import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ResetPasswordScreen = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
      <Typography>
        <h2 style={{ textAlign: "center" }}>Reset Password</h2>
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Enter New Password"
        type={showPassword ? "password" : "text"}
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value.trim())}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Confirm New Password"
        type={showPassword ? "password" : "text"}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value.trim())}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
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
          mt: 2,
        }}
      >
        Reset
      </Button>
    </Container>
  );
};

export default ResetPasswordScreen;

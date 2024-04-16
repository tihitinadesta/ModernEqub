import { Container, TextField, Button } from "@mui/material";
import {  useState, useEffect  } from "react";
import {useAuth} from "../../context/auth/AuthContext"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, error, dispatch } = useAuth();
  const navigate = useNavigate();

  const schema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  })

  const handleSendOtp = async () => {
    const data = { email };
    const { error } = schema.validate(data);
    if (error) {
      toast.error(error.details[0].message);
    } else {
      try {
        await forgotPassword(email);
        navigate("/verification");
      } catch (error) {
        toast.error("Something went wrong");
        dispatch({ type: "CLEAR_ERROR" });
      }
    }

  };
  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong");


      dispatch({ type: "CLEAR_ERROR" });
    }
  }, [error, dispatch]);

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
        <h2 style={{ textAlign: "center" }}>Forget Password</h2>
        <p>Provide your email for which you want to reset your password </p>
      </>
      <TextField
        label="Enter your email"
        variant="outlined"
        margin="normal"
        fullWidth
        value={email}
        onChange={(event) => setEmail(event.target.value.trim())}
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
        onClick={handleSendOtp} 
      > Get OTP</Button>
       
    </Container>
  );
};

export default ForgetPassword;

import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "VERIFY_OTP_SUCCESS":
      return {
        ...state,
        isVerified: true,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async (fullName, email) => {
    try {
      const response = await axios.post(
        "http://10.194.111.80:5000/api/admin/register",
        {
          fullName,
          email,
        }
      );
      dispatch({ type: "REGISTER", payload: response.data });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      if (error.response) {
        const serverErrorMessage = error.response.data.message;
        dispatch({ type: "ERROR", payload: serverErrorMessage });
      } else {
        console.error("Register error:", error);
        dispatch({
          type: "ERROR",
          payload: "An error occurred while registering.",
        });
      }
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );
      dispatch({ type: "LOGIN", payload: response.data });
      // localStorage.setItem("token", response.data.token);
    } catch (error) {
      if (error.response) {
        const serverErrorMessage = error.response.data.message;
        dispatch({ type: "ERROR", payload: serverErrorMessage });
      } else {
        console.error("Login error:", error);
        dispatch({
          type: "ERROR",
          payload: "An error occurred while logging.",
        });
      }
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout error:", error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/forgot-password",
        {
          email,
        }
      );
    } catch (error) {
      if (error.response) {
        const serverErrorMessage = error.response.data.message;
        dispatch({ type: "ERROR", payload: serverErrorMessage });
      } else {
        console.error("Forgot password error:", error);
        dispatch({
          type: "ERROR",
          payload:
            "An error occurred while initiating forgot password request.",
        });
      }
    }
  };

  const verifyOTP = async (otp) => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/verify-otp",
        { otp }
      );
      dispatch({ type: "VERIFY_OTP_SUCCESS" });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
          } else {
            throw new Error("Unauthorized: Invalid OTP. Please try again.");
          }
        } else if (error.response.status === 400) {
          throw new Error(error.response.data.message || "OTP expired. Please request a new one.");
        }
      }
      console.error("OTP verification error:", error);
      throw new Error("An error occurred while verifying OTP.");
    }
  };
  
  
  const resetPassword = async (password) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch({
          type: "ERROR",
        });
        console.log("No token found. Please login again.")
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        "http://localhost:5000/api/admin/reset-password",
        { password },
        config
      );
    } catch (error) {
      if (error.response) {
        const serverErrorMessage = error.response.data.message;
        dispatch({ type: "ERROR", payload: serverErrorMessage });
      } else {
        console.error("Reset password error:", error);
        dispatch({
          type: "ERROR",
          payload: "An error occurred while resetting password.",
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        isVerified: state.isVerified,
        register,
        login,
        logout,
        forgotPassword,
        verifyOTP,
        resetPassword,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/theme/darkModeContext";
import { AuthProvider } from "./context/auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer />
    </DarkModeContextProvider>
  </React.StrictMode>,
);

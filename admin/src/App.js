import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { userInputs } from "./FormSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/theme/darkModeContext";
import "./style/Dark.scss";
import SignIn from "./pages/auth/SignIn";
import OtpVerification from "./pages/password/OtpVerification";
import ResetPassword from "./pages/password/ResetPassword";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import New from "./pages/new/New";
import ForgetPassword from "./pages/password/ForgetPassword";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/verification" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/users" element={<List option={"users"} />} />
          <Route path="/Equbs" element={<List option={"equbs"} />} />
          <Route path="/Transaction" element={<List option={"transaction"}/>}/>
          <Route path="/Logout" element={<SignIn />} />
          <Route path="/forget-password" element={<ForgetPassword />}/>
          <Route
            path="/user-form"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

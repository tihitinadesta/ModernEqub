import React from "react";
import { Avatar } from "@mui/material";
import { useContext } from "react";
import { DarkModeContext } from "../../context/theme/darkModeContext";
import "./NavBar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import avatarImage from "../../assets/user.png";

const NavBar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        
        <div className="items">
          <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
            <DarkModeOutlinedIcon />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt="user"
              src={avatarImage}
              sx={{ mb: 0.1, width: 30, height: 30 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

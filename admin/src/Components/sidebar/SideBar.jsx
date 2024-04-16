import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">EkubAdmin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <li>
            <Link
              to="/users"
              style={{ textDecoration: "none", color: "#19524e" }}
            >
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </Link>
          </li>
          <Link to="/Equbs" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Equbs</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <Link to="/Transaction" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Transaction</span>
          </li>
          </Link>
    
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

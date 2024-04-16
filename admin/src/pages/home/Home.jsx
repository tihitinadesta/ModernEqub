import React from "react";
import SideBar from "../../Components/sidebar/SideBar.jsx";
import "./Home.scss";
import NavBar from "../../Components/navbar/NavBar.jsx";
import Widget from "../../Components/widget/Widget.jsx";
import Featured from "../../Components/featured/Featured.jsx";
import Chart from "../../Components/chart/Chart.jsx";
import Table from "../../Components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="equb" />
          <Widget type="transaction" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;

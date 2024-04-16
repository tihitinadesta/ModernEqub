import React from 'react';
import Sidebar from "../../Components/sidebar/SideBar";
import Navbar from "../../Components/navbar/NavBar";
import { UserDataTable, EqubDataTable , TransactionDataTable} from "../../Components/datatable/DataTable" 
import "./list.scss";

const List = (props) => {
  return (
    <div className="list">
      <Sidebar /> 
      <div className="listContainer">
        <Navbar />
        {props.option === 'users' && <UserDataTable />}
        {props.option === 'equbs' && <EqubDataTable />}
        {props.option === 'transaction' && <TransactionDataTable/>}
      </div>
    </div>
  );
};

export default List;

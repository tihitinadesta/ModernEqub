import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllEqubs } from "../../services/equbService";
import { getAllUsers } from "../../services/userService";
import { getAllTransactions } from "../../services/transactionService";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./DataTable.scss";
import EqubColumns from "./Column/EqubColumns";
import UserColumns from "./Column/UserColumns";
import TransactionColumn from "./Column/TranactionColumn";

const DataTable = ({
  rows,
  tableType,
  columns,
  authorizeHandler,
  activateHandler,
}) => {
  const renderActionCell = (params) => {
    if (tableType === "transaction") {
      return null;
    }

    return (
      <div className="cellAction">
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ width: "40px", height: "25px", fontSize: "10px" }}
        >
          View
        </Button>

        {tableType === "user" && (
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{
              width: "40px",
              height: "25px",
              fontSize: "10px",
              backgroundColor: params.row.active ? "#f44336" : "#4caf50",
              "&:hover": {
                backgroundColor: params.row.active ? "#f44336" : "#4caf50",
              },
            }}
            onClick={() => activateHandler(params.row.id, !params.row.active)}
          >
            {params.row.active ? "Block" : "Activate"}
          </Button>
        )}
        {tableType === "equb" && (
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{
              width: "40px",
              height: "25px",
              fontSize: "10px",
              backgroundColor: params.row.authorized ? "#f44336" : "#4caf50",
              "&:hover": {
                backgroundColor: params.row.authorized ? "#f44336" : "#4caf50",
              },
            }}
            onClick={() =>
              authorizeHandler(params.row.id, !params.row.authorized)
            }
          >
            {params.row.authorized ? "Block" : "Authorize"}
          </Button>
        )}
      </div>
    );
  };

  const actionColumn = {
    field: "action",
    headerName: tableType === "transaction" ? "" : "Action",
    width: 200,
    renderCell: renderActionCell,
  };
  const modifiedColumns = tableType === "transaction" ? columns.filter(column => column.field !== 'action') : [...columns, actionColumn];

  return (
    <DataGrid
      className="datagrid"
      rows={rows || []}
      columns={modifiedColumns}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
    />
  );
};

const EqubDataTable = () => {
  const [equbData, setEqubData] = useState([]);
  useEffect(() => {
    const fetchEqubData = async () => {
      try {
        const data = await getAllEqubs();
        console.log(data);
        setEqubData(data.products);
      } catch (error) {
        console.error("Error fetching equb data:", error);
      }
    };

    fetchEqubData();
  }, []);

  const handleAuthorizeEqub = (id, authorized) => {
    setEqubData(
      equbData.map((equb) =>
        equb.id === id ? { ...equb, authorized: authorized } : equb
      )
    );
  };

  return (
    <div className="datatable">
      <DataTable
        rows={equbData}
        columns={EqubColumns}
        authorizeHandler={handleAuthorizeEqub}
        tableType="equb"
        activateHandler={() => {}}
      />
    </div>
  );
};

const UserDataTable = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchuserData = async () => {
      try {
        const data = await getAllUsers();
        console.log(data);
        setUserData(data.products);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchuserData();
  }, []);

  const handleActivateUser = (id, active) => {
    setUserData(
      userData.map((user) =>
        user.id === id ? { ...user, active: active } : user
      )
    );
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link
          to="/users/new"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New
        </Link>
      </div>
      <DataTable
        rows={userData}
        columns={UserColumns}
        activateHandler={handleActivateUser}
        tableType="user"
        authorizeHandler={() => {}}
      />
    </div>
  );
};
const TransactionDataTable = () => {
  const [transactionData, setTransactionData] = useState([]);
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const data = await getAllTransactions();
        setTransactionData(data.products);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, []);

  return (
    <div className="datatable">
      <DataTable
        rows={transactionData}
        columns={TransactionColumn.filter(column => column.field !== 'action')} 
        tableType="transaction"
      />
    </div>
  );
};

export { EqubDataTable, UserDataTable, TransactionDataTable };

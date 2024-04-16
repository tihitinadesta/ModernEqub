import React from "react";

const UserColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Full Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Phone Number",
    width: 230,
    valueGetter: (params) => params.row.brand,
  },
  {
    field: "age",
    headerName: "Role",
    width: 100,
    valueGetter: (params) => `$${params.row.price}`,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    valueGetter: (params) => `${params.row.stock} units`,
  },
];

export default UserColumns;

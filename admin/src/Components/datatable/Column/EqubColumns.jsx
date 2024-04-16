const EqubColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Equb Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "stock",   // api columns
    headerName: "Participant",
    width: 120,
  },
  {
    field: "price",
    headerName: "Type",
    width: 120,
    valueFormatter: (params) => `$${params.value}`,
  },
  {
    field: "brand",
    headerName: "Amount",
    width: 150,
  },
  {
    field: "category",
    headerName: "Status",
    width: 150,
  },
];

export default EqubColumns;

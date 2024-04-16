const TransactionColumn = [
    { field: "id", headerName: "Transaction ID", width: 120 },
    {
      field: "title",
      headerName: "Equb Name",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "User",
      width: 120,
    },
    {
      field: "price",
      headerName: "Amount",
      width: 120,
      valueFormatter: (params) => `$${params.value}`,
    },
    {
      field: "rating",
      headerName: "Currency",
      width: 120,
    },
    {
      field: "brand",
      headerName: "Payment",
      width: 150,
    },
    {
      field: "category",
      headerName: "Status",
      width: 150,
    },
    
  ];
  
  export default TransactionColumn;
  
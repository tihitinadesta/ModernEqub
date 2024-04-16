import { useEffect, useState } from "react";
import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getLatestTransactions } from "../../services/transactionService";

const List = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const data = await getLatestTransactions();
        setRows(data.products.slice(0, 5));
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Equb Name</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            
          </TableRow>
        </TableHead>
        
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.title}</TableCell>
              <TableCell className="tableCell">{row.brand}</TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">{row.discountPercentage}</TableCell>
              <TableCell className="tableCell">{row.stock}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;

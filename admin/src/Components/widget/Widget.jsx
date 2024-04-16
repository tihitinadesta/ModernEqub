import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import { getAllEqubs } from "../../services/equbService";
import { getAllTransactions } from "../../services/transactionService";
import "./Widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type }) => {
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    const fetchDataCount = async () => {
      try {
        let count = 0;
        switch (type) {
          case "user":
            const userData = await getAllUsers();
            count = userData.products.length;
            break;
          case "equb":
            const equbData = await getAllEqubs();
            count = equbData.products.length;
            break;
          case "transaction":
            const transactionData = await getAllTransactions();
            count = transactionData.products.length;
            break;
          default:
            break;
        }
        setDataCount(count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataCount();
  }, [type]);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
       
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "equb":
      data = {
        title: "EQUBS",
        isMoney: false,
      
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "transaction":
      data = {
        title: "TRANSACTIONS",
        isMoney: true,
        
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
 
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {dataCount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
      
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

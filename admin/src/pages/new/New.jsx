import Sidebar from "../../Components/sidebar/SideBar";
import Navbar from "../../Components/navbar/NavBar";
import Button from "@mui/material/Button";
import avatarImage from "../../assets/user.png";
import { Avatar } from "@mui/material";
import "./New.scss";

const New = ({ inputs, title }) => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <Avatar
              alt=""
              src={avatarImage}
              sx={{ mb: 2, width: 100, height: 100 }}
            />
          </div>
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

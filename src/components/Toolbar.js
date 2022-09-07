import { useContext } from "react";
import { Link } from "react-router-dom";
import mainContext from "../context/mainContext";

const Toolbar = () => {

    const { onlineUser, setOnlineUser, error, success } = useContext(mainContext)

  return (
    <div className="toolbar d-flex space-btw just-center align-center">
      <div className="d-flex">
        <p>{onlineUser.email}</p>
        <p><b>Money:</b>{onlineUser.money.toFixed(2)}$</p>
        <p><b>Age:</b>{onlineUser.age}</p>

        {error && <p className="error">{error}</p>}

        {success &&<p className="success">{success}</p>}
        
      </div>
      <div>
        <Link onClick={() => setOnlineUser(null)} to={"/"}>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;

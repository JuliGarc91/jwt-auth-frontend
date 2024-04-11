import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import AddNewPlant from "./UserComponents/AddNewPlant";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const [userPlants, setUserPlants] = useState([]);
  
  const handleAddPlant = (newPlant) => {
      setUserPlants([...userPlants, newPlant]);
  };
  return (
    
    <section className="dashboard">
      <>
      {user && (
        <h1>
          Welcome to your Garden Nook, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}!
          
        </h1>
      )}
      <button onClick={handleLogout}>Logout</button>
      <br/>
      {/* <button><Link to="/addnewplant">Add Plant</Link></button> */}
      <AddNewPlant onAddPlant={handleAddPlant}/>
      </>

    </section>
  );
};

export default Dashboard;

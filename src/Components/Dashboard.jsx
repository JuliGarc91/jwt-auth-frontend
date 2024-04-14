import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import AddNewPlant from "./UserComponents/AddNewPlant";

const Dashboard = ({ handleLogout, children }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const [userPlants, setUserPlants] = useState([]);
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);

  const toggleAddPlant = () => {
    setShowAddPlantForm(!showAddPlantForm);
  }
  
  const handleAddPlant = (newPlant) => {
      setUserPlants([...userPlants, newPlant]);
  };
return (
  <section className="dashboard">
    <div className="welcome">
      {user && (
        <h2>
          Welcome to your Garden Nook, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}!
        </h2>
      )}
      <div>
      <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
      <button onClick={toggleAddPlant}>
        {showAddPlantForm ? "Hide Form" : "Add Plant"}
      </button>
      </div>
      <div>
      {showAddPlantForm && <AddNewPlant onAddPlant={handleAddPlant} />}
      </div>
      {children}
    </div>
  </section>
  );
};

export default Dashboard;

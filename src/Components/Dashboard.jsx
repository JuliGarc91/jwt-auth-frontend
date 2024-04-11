import { useState } from "react";
import { Link, useOutletContext, useNavigate, useLocation } from "react-router-dom";
import AddNewPlant from "./UserComponents/AddNewPlant";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardPage = location.pathname === '/dashboard';

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
    <>
      {user && (
        <h1>
          Welcome to your Garden Nook, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}!
          
        </h1>
      )}
      <button onClick={handleLogout}>Logout</button>
      <button>{}</button>
      <button onClick={toggleAddPlant}>
        {showAddPlantForm ? "Hide Form" : "Add Plant"}
      </button>
      {showAddPlantForm && <AddNewPlant onAddPlant={handleAddPlant} />}
    </>
  </section>
  );
};

export default Dashboard;

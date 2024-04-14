import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import AddNewPlant from "./UserComponents/AddNewPlant";

const Dashboard = ({ handleLogout, children }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const [userPlants, setUserPlants] = useState([]);
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);
  const [isBackgroundImage, setIsBackgroundImage] = useState(false);

  const toggleAddPlant = () => {
    setShowAddPlantForm(!showAddPlantForm);
  }
  
  const handleAddPlant = (newPlant) => {
      setUserPlants([...userPlants, newPlant]);
  };

  const handleClick = () => {
    setIsBackgroundImage(prevState => !prevState);
    const body = document.body;
    if (isBackgroundImage) {
      body.style.backgroundImage = `url(https://images.unsplash.com/photo-1555465910-31f7f20a184d?q=80&w=1590&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`;
    } else {
      body.style.backgroundImage = `url(https://images.unsplash.com/photo-1480250555643-539ea5d6d746?q=80&w=3431&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`;
    }
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
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <button onClick={handleClick}>
      {!isBackgroundImage? "Dark Mode":"light mode"}
      </button>

      <button onClick={toggleAddPlant}>
        {showAddPlantForm ? "Hide Form" : "Add Plant"}
      </button>
      {showAddPlantForm && <AddNewPlant onAddPlant={handleAddPlant} />}
      {children}
    </div>
  </section>
  );
};

export default Dashboard;

import { useState, useEffect } from 'react';
import { Link, useOutletContext, useParams } from "react-router-dom";
import Dashboard from '../Dashboard';
import EditPlant from './EditPlant';

const URL = import.meta.env.VITE_BASE_URL;
const UsersPlant = ({ handleLogout }) => {
  const [plant, setPlant] = useState(null);
  const [showEditPlantForm, setShowEditPlantForm] = useState(false);
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const { id } = useParams();

  const toggleEditPlantForm = () => {
    setShowEditPlantForm(!showEditPlantForm);
  }

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await fetch(`${URL}/api/users/${user.id}/userPlants/${id}`);
        if (!response.ok) {
          throw new Error('Plant not found');
        }
        const data = await response.json();
        setPlant(data.plant);
      } catch (error) {
        console.error('Error fetching plant:', error);
        setPlant(null); // Reset plant state
      }
    };
    fetchPlant();
    /* cleanup fx
    https://react.dev/reference/react/useEffect#useeffect
    https://react.dev/reference/react/useEffect#parameters
    */
    return () => setPlant(null);
  }, [user.id, id]);

  if (!plant) {
    return <div>Loading...</div>;
  }

/*
  CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(255),
    color VARCHAR(255),
    plantType VARCHAR(255),
    isFloweringPlant BOOLEAN,
    soilType VARCHAR(255),
    careInstructions TEXT,
    imageUrl TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
*/
  return (
  <>
  <section>
    <Dashboard handleLogout={handleLogout}>
            <button onClick={toggleEditPlantForm}>
              {showEditPlantForm ? "Hide Form" : "Edit Plant"}
            </button>
              {showEditPlantForm && <EditPlant plant={plant} />}
            <button>
              <Link to={`/dashboard`}>
                Back to Dashboard
              </Link>
            </button>
    </Dashboard>
    </section>

    <section className='user-plant-dashboard'>

    {plant.imageurl ? <img className="plant-details-img" src={plant.imageurl} alt={plant.name} /> : <img src={'https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg'} alt={plant.name} />}
        <div className="plant-details">
          <p>
            <strong>Name:</strong> {plant.name}
          </p>
          <p>
            <strong>Species:</strong> {plant.species}
          </p>
          <p>
            <strong>Color:</strong> {plant.color}
          </p> 
          <p>
            <strong>Plant Type:</strong> {plant.planttype}
          </p>
          <p>
            <strong>Is it a flowering Plant?</strong> {!plant.isfloweringplant ? "" : (plant.isfloweringplant ? "Yes" : "No")}
          </p>
          <p>
            <strong>Soil Type Used: </strong> {plant.soiltype}
          </p>
          <p>
            <strong>Care Instructions:</strong> {plant.careinstructions}
          </p>
          <button>
            <Link to={`/plant/${plant.id}/carelogs`}>Plant Care Logs</Link>
          </button>
        </div>
    </section>
    </>
  );  
};

export default UsersPlant;

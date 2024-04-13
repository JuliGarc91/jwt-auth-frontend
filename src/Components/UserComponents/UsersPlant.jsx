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

  return (
  <>
  <section>
    <Dashboard handleLogout={handleLogout}>
            <button>
              <Link to={`/dashboard`}>
                Back to Dashboard
              </Link>
            </button>
    </Dashboard>
    </section>

    <section className='user-plant-dashboard'>
        <img className="plant-details-img" src={plant.imageurl} alt={plant.name} />
        <div>
          <p>
            <strong>Name:</strong> {plant.name}
          </p>
          <p>
            <strong>Species:</strong> {plant.species}
          </p>
          <p>
            <strong>Care Instructions:</strong> {plant.careinstructions}
          </p>
          <button>
            <Link to={`/plant/${plant.id}/carelogs`}>Plant Care Logs</Link>
          </button>
          <button onClick={toggleEditPlantForm}>
          {showEditPlantForm ? "Hide Form" : "Edit Plant"}
          </button>
          {showEditPlantForm && <EditPlant plant={plant} />}
        </div>
    </section>
    </>
  );  
};

export default UsersPlant;

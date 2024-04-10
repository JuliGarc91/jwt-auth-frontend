import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from "react-router-dom";
import Dashboard from '../Dashboard';

const URL = import.meta.env.VITE_BASE_URL
const UsersPlant = () => {
  const [plant, setPlant] = useState(null);
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const { id } = useParams();

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
    <Dashboard />
    <section className='user-plant-dashboard'>
      <h2>Plant Details</h2>
      {/* <p>Name: {plant.name}</p>
      <p>Species: {plant.species}</p>
      <p>Care Instructions: {plant.careinstructions}</p>
      <img src={plant.imageurl} alt={plant.name} /> */}
      {/* will contain plant log component, edit plant form component and delete plant component */}
      <div className='img-container'>
              <img src={plant.imageurl} alt={plant.name} />
            </div>
            <div className='plant-details-dashboard'>
            <div>
              <p><strong>Name:</strong> {plant.name}</p>
            </div>
            {/* add toggle for additional details */}
            <div>
              <p><strong>Species:</strong> {plant.species}</p>
            </div>
            <div>
              <p><strong>Care Instructions:</strong> {plant.careinstructions}</p>
            </div>
    </div>
    </section>
    </>
  );  
};

export default UsersPlant;

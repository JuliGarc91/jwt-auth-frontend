import { useState, useEffect } from 'react';
import { Link, useOutletContext } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL
const UsersPlants = () => {
  const [userPlants, setUserPlants] = useState([]);
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  useEffect(() => {
    const fetchUserPlants = async () => {
      try {
        const response = await fetch(`${URL}/api/users/${user.id}/userPlants`);
        const data = await response.json();
        setUserPlants(data.userPlants);
      } catch (error) {
        console.error('Error fetching user plants:', error);
      }
    };

    fetchUserPlants();
  }, [user.id]);

  return (
    <section>
      <h2>{user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}'s Plants:</h2>
      
      <ul className='user-plants-dashboard'>
        {/* gotta make route and add component also link to nav to UsersPlant */}
        {userPlants.map(plant => (
          
          <li key={plant.id}>
            <Link to={`/plant/${plant.id}`}>
            <div className='img-container'>
              <img src={plant.imageurl} alt={plant.name} />
            </div>
            <div className='plant-details-dashboard'>
            <div>
              <strong>Name:</strong> {plant.name}
            </div>
            {/* add toggle for additional details */}
            <div>
              <strong>Species:</strong> {plant.species}
            </div>
            <div>
              <strong>Care Instructions:</strong> {plant.careinstructions}
            </div>
            </div>
            </Link>
          </li>
          
        ))}
      </ul>
      
    </section>
  );
}

export default UsersPlants;

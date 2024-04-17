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

  const handleDeletePlant = async (userId, plantId) => {
    try {
      const response = await fetch(`${URL}/api/users/${userId}/userPlants/${plantId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUserPlants(userPlants.filter(plant => plant.id !== plantId));
      } else {
        console.error('Failed to delete user plant:');
      }
    } catch (error) {
      console.error("Error deleting user's plant:", error);
    }
  };
  https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg

  return (
    <section className='user-plants-dashboard-container'>
      {/* <h2>{user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}'s Plants:</h2> */}
      <ul className='user-plants-dashboard-ul'>
        {userPlants.map(plant => (
          <li key={plant.id} className='user-plants-li'>
            <div className='img-container'>
              {plant.imageurl ? <img src={plant.imageurl} alt={plant.name} /> : <img src={'https://st2.depositphotos.com/3904951/8925/v/450/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg'} alt={plant.name} />}
              
            </div>
            <div className='all-plants-details-dashboard'>
            <div>
              <strong>Name:</strong> {plant.name}
            </div>
            <button onClick={() => handleDeletePlant(user.id, plant.id)} className='delete-button'>
              Delete
            </button>
            <button>
              <Link to={`/plant/${plant.id}`}>View More Details</Link>
            </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default UsersPlants;

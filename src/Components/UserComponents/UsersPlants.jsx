import { useState, useEffect } from 'react';
import { Link, useOutletContext } from "react-router-dom";
import AddNewPlant from './AddNewPlant';

const URL = import.meta.env.VITE_BASE_URL
const UsersPlants = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);

  const { user } = useOutletContext();

  const toggleAddPlant = () => {
    setShowAddPlantForm(!showAddPlantForm);
  }
  
  const handleAddPlant = (newPlant) => {
      setUserPlants([...userPlants, newPlant]);
  };
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

  // add pie chart for flowering vs non-flowering plants like ferns - reuse code in careLogs.jsx but change chart type to pieChart and pie

  return (
    <section className='user-plants-dashboard-container'>

      <button onClick={toggleAddPlant}>
        {showAddPlantForm ? "Hide Form" : "Add Plant"}
      </button>
        {showAddPlantForm && <AddNewPlant handleAddPlant={handleAddPlant} />}

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

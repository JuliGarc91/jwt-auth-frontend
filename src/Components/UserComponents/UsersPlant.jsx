import { useState, useEffect } from 'react';
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";
import Dashboard from '../Dashboard';
import EditPlant from './EditPlant';
import Modal from './Modal';

const URL = import.meta.env.VITE_BASE_URL;
const UsersPlant = ({ handleLogout }) => {
  const [plant, setPlant] = useState("");
  const [showEditPlantForm, setShowEditPlantForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useOutletContext();
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
        setPlant(""); // Reset plant state if error
      }
    };
    fetchPlant();
    // cleanup fx: https://react.dev/reference/react/useEffect#parameters
    return () => setPlant("");
  }, [user.id, id]);

  if (!plant) {
    return <div>Loading...</div>;
  }
// --- delete fx ---
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeletePlant = async (user, id) => {
    try {
      const response = await fetch(`${URL}/api/users/${user.id}/userPlants/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPlant(plant.id !== id);
      } else {
        console.error('Failed to delete user plant:');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error("Error deleting user's plant:", error);
    }
  };

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
    <button onClick={toggleEditPlantForm}>{showEditPlantForm ? "Hide Form" : "Edit Plant"}
    </button>
      {showEditPlantForm && <EditPlant plant={plant} setPlant={setPlant} />}
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
          <button onClick={openModal} className='delete-button'>
              Delete
          </button>
          <Modal isOpen={isModalOpen} onCancel={closeModal} onConfirm={() => handleDeletePlant(user.id, plant.id)} />
        </div>
    </section>
    </>
  );  
};

export default UsersPlant;

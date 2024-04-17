import { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const AddCareLog = () => {
  const { user } = useOutletContext(); // access logged in user details such as id and username
  const navigate = useNavigate();
  const [careLogData, setCareLogData] = useState({
    careDate: '',
    description: '',
    imageUrl: '',
    heightInInches: '',
    isPropagation: false,
    needsRepotting: false,
    wateringFrequencyPerWeek: '',
    sunlightHoursPerDay: '',
    soilMoisturePercentDaily: '',
    mLofWaterPerWeek: '',
    mLWaterAddedToday: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCareLogData({
      ...careLogData,
      [name]: value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`${URL}/${user.id}/userPlants/${careLogData.plantId}/carelogs`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(careLogData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to add care log:', error);
        }
    })
    .then(data => {
      console.log("New care log added:", data.careLog);
      onAddPlant(data.careLog);
      return data.careLog;
    })
    .then(addedCarelog => {
        navigate(`/plant/${addedCarelog.plantId}/carelogs/`);
    })
    .catch(error => {
        console.error('Error adding care log:', error);
    });
  };

  return (
    <div>
      <h3>Add Care Log</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="careDate">Date of Care: 
          <input
            type="date"
            id="careDate"
            name="careDate"
            value={careLogData.careDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCareLog;

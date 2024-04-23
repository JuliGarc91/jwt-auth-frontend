import { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const AddCareLog = () => {
  const { user } = useOutletContext(); // access logged in user details such as id and username
  const navigate = useNavigate();
  const [careLogData, setCareLogData] = useState({
    caredate: '',
    description: '',
    imageurl: '',
    heightininches: '',
    ispropagation: false,
    needsrepotting: false,
    sunlighthoursperday: '',
    soilmoisturepercentdaily: '',
    mlwateraddedtoday: ''
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
    .then(addedCareLog => {
        navigate(`/plant/${addedCareLog.plantid}/carelogs/`);
    })
    .catch(error => {
        console.error('Error adding care log:', error);
    });
  };

  /*
  <p><em>Notes:</em> 
  {careLog.description}</p>
  <p><em>Height:</em> {careLog.heightininches} inch(es)</p>
                    <p><em>Plant is Propagation?</em> {careLog.ispropagation ? "Yes" : "No"}</p>
                    <p><em>Sunlight Hours (Daily)</em> {careLog.sunlighthoursperday} hrs</p>
                    <p><em>Percent Soil Moisture</em> {!careLog.ispropagation ? <p>{careLog.soilmoisturepercentdaily}%</p> : 'N/A'}</p>
                    <p><em>mL Water added today:</em> {careLog.mlwateraddedtoday} mL</p>
                    <p><em>Needs to be Re-Potted?</em> {careLog.needsrepotting ? "Yes" : "No"}</p>
  */

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
        <label htmlFor="description">Notes: 
          <textarea
            type="description"
            id="description"
            name="description"
            value={careLogData.description}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="height">Height in inches: 
          <textarea
            type="height"
            id="height"
            name="height"
            value={careLogData.heightininches}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCareLog;

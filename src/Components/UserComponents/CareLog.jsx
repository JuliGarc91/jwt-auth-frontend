import { useState, useEffect } from 'react';
import { Link, useOutletContext, useParams } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;
const CareLog = () => {
  const [careLog, setCareLog] = useState(null);
  const { user } = useOutletContext();
  const { id, plantId } = useParams();

  console.log(user);
  console.log(id);
  console.log(plantId);
  
  // route is /:userId/userPlants/:plantId/carelogs/:id
  useEffect(() => {
    const fetchCareLog = async () => {
      try {
        const response = await fetch (`${URL}/api/users/${user.id}/userPlants/${plantId}/carelogs/${id}`);
        if (!response.ok) {
          throw new Error('Plant Care log not found');
        }
        const data = await response.json();
        console.log(data);
        setCareLog(data.careLog);
      } catch (error) {
        console.error('Error fetching care log', error);
        setCareLog(null);
      }
    }
    fetchCareLog();
    return () => setCareLog(null);
  }, [user.id, plantId, id])

  return (
    <div>CareLog: Add Chart View Here</div>
  )
}

export default CareLog;
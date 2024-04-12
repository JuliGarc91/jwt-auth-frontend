import { useState, useEffect } from 'react';
import { Link, useOutletContext, useParams } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;
const CareLogs = () => {
    const [careLogs, setCareLogs] = useState(null);
    const { user } = useOutletContext(); // access logged in user details such as id and username
    const { plantId } = useParams();
    console.log(plantId);
    console.log(user);
    useEffect(() => {
        const fetchCareLogs = async () => {
            try {
                const response = await fetch(`${URL}/api/users/${user.id}/userPlants/${plantId}/carelogs`);
                const data = await response.json();
                setCareLogs(data.careLogs);
            } catch (error) {
                console.error ('Error fetching user plants:', error);
            }
        };
        fetchCareLogs();
    }, [user.id, plantId]);

  return (
    <div>CareLogs</div>
  )
}

export default CareLogs;
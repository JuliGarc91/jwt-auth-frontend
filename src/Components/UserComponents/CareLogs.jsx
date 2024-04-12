import { useState, useEffect } from 'react';
import { Link, useOutletContext, useParams } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;
const CareLogs = () => {
    const [careLogs, setCareLogs] = useState([]);
    const { user } = useOutletContext(); // access logged in user details such as id and username
    const { plantId } = useParams();
    console.log(plantId);
    console.log(user);
    useEffect(() => {
        const fetchCareLogs = async () => {
            try {
                const response = await fetch(`${URL}/api/users/${user.id}/userPlants/${plantId}/carelogs`);
                const data = await response.json();
                console.log(data)
                setCareLogs(data.careLogs);
            } catch (error) {
                console.error ('Error fetching user plants:', error);
            }
        };
        fetchCareLogs();
    }, [user.id, plantId]);
    
/*
INSERT INTO careLogs (plantId, careDate, description, imageUrl, soilIsMoist, needsWaterToday, pottedPlant, needsRepotting, rootsHealthy, wateringFrequencyPerWeek, sunlightHoursPerDay)
VALUES
(1, NOW(), 'Watered the spider plant.', 'https://example.com/watering_image.jpg', TRUE, FALSE, TRUE, FALSE, TRUE, 2, 6),
(2, NOW(), 'Trimmed dead leaves from the snake plant.', 'https://example.com/trimming_image.jpg', TRUE, TRUE, TRUE, FALSE, TRUE, 1, 4),
(3, NOW(), 'Applied fertilizer to the peace lily.', 'https://example.com/fertilizing_image.jpg', TRUE, FALSE, TRUE, TRUE, TRUE, 2, 3);
*/

  return (
    <section>
        <ul>
            {careLogs.map(careLog =>(
                <li key={careLog.id}>
                    <img src={careLog.imageurl} alt={'pic not available'} />
                    <div>
                        <strong>Date: </strong>{careLog.caredate}
                    </div>
                    <div>
                        <strong>Notes: </strong>{careLog.description}
                    </div>
                </li>
            ))}
        </ul>
    </section>
  );
};

export default CareLogs;
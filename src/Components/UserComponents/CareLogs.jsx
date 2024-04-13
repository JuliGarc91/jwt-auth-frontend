import { useState, useEffect } from 'react';
import { Link, useOutletContext, useParams } from "react-router-dom";
import Dashboard from '../Dashboard';

const URL = import.meta.env.VITE_BASE_URL;
const CareLogs = ( { handleLogout } ) => {
    const [careLogs, setCareLogs] = useState([]);
    const [isTableMode, setIsTableMode] = useState(true);
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
    
    const toggleViewMode = () => {
        setIsTableMode(prevMode => !prevMode);
    };
/*
INSERT INTO careLogs (plantId, careDate, plantName, description, imageUrl, soilIsMoist, needsWaterToday, pottedPlant, needsRepotting, rootsHealthy, wateringFrequencyPerWeek, sunlightHoursPerDay)
VALUES
(1, '2024-04-12', 'Spider Plant', 'Watered the spider plant.', NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 2, 6),
(1, '2024-04-13', 'Spider Plant', 'Propagated the spider plant.', 'https://example.com/watering_image.jpg', TRUE, FALSE, TRUE, FALSE, TRUE, 2, 6),
(2, '2024-04-12', 'Snake Plant', 'Trimmed dead leaves from the snake plant.', 'https://example.com/trimming_image.jpg', TRUE, TRUE, TRUE, FALSE, TRUE, 1, 4),
(3, '2024-04-12', 'Peace Lily' ,'Applied fertilizer to the peace lily.', 'https://example.com/fertilizing_image.jpg', TRUE, FALSE, TRUE, TRUE, TRUE, 2, 3);
*/

// add function to reverse order of logs by date
    return (
        <section className='carelogs-section'>
            <Dashboard handleLogout={handleLogout}>
                {/* add link to care log form once component is created */}
                <button>Add Care Log</button>
                <button><Link to={`/dashboard`}>Back to Dashboard</Link></button>
                <button><Link to={`/plant/${plantId}`}>Back to Plant Details</Link></button>
            </Dashboard>

            <div>
            <button onClick={toggleViewMode}>
              {!isTableMode ? 'Switch to List View' : 'Switch to Table View'}
            </button>
            {!isTableMode ? (
            <table>
                <thead>
                    <tr>
                        <th>Care Date</th>
                        <th>Plant Name</th>
                        <th>Navigate</th>
                    </tr>
                </thead>
                <tbody>
                    {careLogs.map((careLog) => (
                        <tr key={careLog.id}>
                            <td>
                            {careLog.caredate}
                            </td>
                            <td>
                            {careLog.plantname}
                            </td>
                            <td>
                                <button>
                                    <Link to={`/plant/${plantId}/carelogs/${careLog.id}`}>
                                        View More Details
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
              <ul>
                {careLogs.map(careLog => (
                  <li key={careLog.id}>
                    <div>
                      {careLog.imageurl ? (
                        <img className="care-logs-img" src={careLog.imageurl} alt={careLog.plantname} />
                      ) : (
                        <div>No image available</div>
                      )}
                      <br />
                      <strong>Care Date for {careLog.plantname}: </strong>{careLog.caredate}
                    </div>
                    <button>
                      <Link to={`/plant/${plantId}/carelogs/${careLog.id}`}>
                        View More Details
                      </Link>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
    );
};

export default CareLogs;
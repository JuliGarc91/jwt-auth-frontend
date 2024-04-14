import { useState, useEffect } from 'react';
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";
import Dashboard from '../Dashboard';
// import { Line } from 'react-chartjs-2';

const URL = import.meta.env.VITE_BASE_URL;
const CareLogs = ( { handleLogout } ) => {
    const [careLogs, setCareLogs] = useState([]);
    const [isTableMode, setIsTableMode] = useState(true);
    const { user } = useOutletContext(); // access logged in user details such as id and username
    const { plantId } = useParams();
    const navigate = useNavigate();
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

    
    const handleDelete = (id) => {
      fetch(`${URL}/api/users/${user.id}/userPlants/${plantId}/carelogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        if (res.ok) {
          setCareLogs(careLogs.filter((careLog) => careLog.id !== id));
        } else {
          console.log ('Error deleting care log');
        }
      })
      .then(()=>{
        navigate(`/plant/${plantId}/carelogs`);
      })
      .catch((error) => {
        console.error("Error occurred while deleting care log:", error);
      })
    }

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
              <>
            <table>
                <thead>
                    <tr>
                        <th>Care Date</th>
                        <th>Plant Name</th>
                        <th>Height (inches)</th>
                        <th>Potted Plant</th>
                        <th>Is Propagated?</th>
                        <th>Soil is Moist?</th>
                        <th>Needs Water Today?</th>
                        <th>Needs Repotting?</th>
                        <th>Roots healthy?</th>
                        <th>Watering Frequency (weekly)</th>
                        <th>Sunlight Hours (Daily)</th>
                        <th>Delete Care Log</th>
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
                              {careLog.heightininches}
                            </td>
                            <td>
                              {careLog.pottedplant ? "Yes" : "No"}
                            </td>
                            <td>
                              {careLog.ispropagation ? "Yes" : "No"}
                            </td>
                            <td>
                              {/* {careLog.soilismoist ? "Yes" : "No"} */}
                              {careLog.pottedplant ? (careLog.soilismoist ? "Yes" : "No") : 'N/A'}
                            </td>
                            <td>
                              {careLog.needswatertoday ? "Yes" : "No"}
                            </td>
                            <td>
                              {careLog.needsrepotting ? "Yes" : "No"}
                            </td>
                            <td>
                              {careLog.rootshealthy ? "Yes" : "No"}
                            </td>
                            <td>
                              {careLog.wateringfrequencyperweek}
                            </td>
                            <td>
                              {careLog.sunlighthoursperday}
                            </td>
                            <td>
                              <button onClick={() => handleDelete(careLog.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
            ) : (
              <ul>
                {careLogs.map(careLog => (
                  <li key={careLog.id} className='carelogs-li'>
                    <div>
                      {careLog.imageurl ? (
                        <img className="care-logs-img" src={careLog.imageurl} alt={careLog.plantname} />
                      ) : (
                        <div>No image available</div>
                      )}
                      <br />
                      <strong>Care Date for {careLog.plantname}: </strong>{careLog.caredate}
                    </div>
                    {/* button will toggle more details maybe */}
                    {/* <button>
                      <Link to={`/plant/${plantId}/carelogs/${careLog.id}`}>
                        View More Details
                      </Link>
                    </button> */}
                    <p><em>Height:</em> {careLog.heightininches} inch(es)</p>
                    <p><em>Is Currently in Pot?</em> {careLog.pottedplant ? "Yes" : "No"}</p>
                    <p><em>If in a pot is soil moist?</em> {careLog.pottedplant ? (careLog.soilismoist ? "Yes" : "No") : 'N/A'}</p>
                    <p><em>Plant is Propagation?</em> {careLog.ispropagation ? "Yes" : "No"}</p>
                    <p><em>Needs watering?</em> {careLog.needswatertoday ? "Yes" : "No"}</p>
                    <p><em>Needs to be Re-Potted?</em> {careLog.needsrepotting ? "Yes" : "No"}</p>
                    <p><em>Are The Roots Healthy?</em> {careLog.rootshealthy ? "Yes" : "No"}</p>
                    <button onClick={() => handleDelete(careLog.id)}>Delete Care Log</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
    );
};

export default CareLogs;
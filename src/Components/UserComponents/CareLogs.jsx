import { useState, useEffect, useRef } from 'react'; 
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";
import Dashboard from '../Dashboard';
import Chart from 'chart.js/auto'; // get everything instead of just line graph (change 'line' to 'bar' for bar graph)
import 'chartjs-adapter-moment'; // import to use a time scale (date) - chart.js uses UTC
import Modal from './Modal';

const URL = import.meta.env.VITE_BASE_URL;
const CareLogs = ( { handleLogout } ) => {
    const [careLogs, setCareLogs] = useState([]);
    const [isTableMode, setIsTableMode] = useState(true);
    const { user } = useOutletContext(); // access logged in user details such as id and username
    const { plantId } = useParams();
    const navigate = useNavigate();
    const chartRef = useRef(null); // stores the Chart instance - useRef allows preservation of the state across re-renders.

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

    // when adde carelog component is ready add as prop
    // const handleCareLog = (newCareLog) => {
    //   setUserPlants([...careLogs, newCareLog]);
    // };

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

// --- Line Chart: ---
    // configs chart
    useEffect(() => {
      if (careLogs.length >= 0) { 
      const ctx = document.getElementById('lineChart');

      //https://www.chartjs.org/docs/latest/configuration/responsive.html
      if (ctx) {
          if (chartRef.current) {
              chartRef.current.destroy(); 
          }
          // https://www.chartjs.org/docs/latest/general/fonts.html
          Chart.defaults.font.size = 18;

          // Configure chart: https://www.chartjs.org/docs/latest/samples/line/line.html
          const config = {
              type: 'line',
              data: prepareChartData(),
              options: {
                responsive: true,
                // https://www.chartjs.org/docs/latest/samples/line/point-styling.html
              plugins: {
                title: {
                display: true,
                text: "Growth Rate"
                }
              },
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              },
          };
          // makes chart instance using useRef
          chartRef.current = new Chart(ctx, config);
        }
      }
    }, [careLogs, chartRef.current]);

    // actually sets up chart - https://www.chartjs.org/docs/latest/samples/line/line.html
    const prepareChartData = () => {
      // Data: https://www.chartjs.org/docs/latest/general/data-structures.html
      const labels = careLogs.map(log => log.caredate); 
      const dailySunlightHours = careLogs.map(log => log.sunlighthoursperday);
      const dailyMlWater = careLogs.map(log => log.mlwateraddedtoday);
      const dailyHeight = careLogs.map(log => log.heightininches);
      return { // using canvas element instead of "Line" retrieved from DOM
        labels: labels,
        datasets: [
            {
              label: 'Height (inches)',
              data: dailyHeight,
              backgroundColor: 'rgba(8, 62, 8, 0.8)',
            /* https://www.chartjs.org/docs/latest/samples/line/point-styling.html
            for line graph style only next 3 lines
            */
              pointStyle: 'rectRot',
              pointRadius: 10,
              pointHoverRadius: 15,
              borderColor: 'rgba(8, 62, 8, 1)',
              borderWidth: 2,
          },
          {
              label: 'Sunlight Hours (daily)',
              data: dailySunlightHours,
              backgroundColor: 'rgba(207, 119, 24, 0.8)',
              pointStyle: 'rectRot',
              pointRadius: 10,
              pointHoverRadius: 15,
              borderColor: 'rgba(207, 119, 24, 1)',
              borderWidth: 1,
          },
          {
            label: 'Water Added (daily)',
            data: dailyMlWater,
            backgroundColor: 'rgba(0, 145, 255, 0.8)',
            pointStyle: 'rectRot',
            pointRadius: 10,
            pointHoverRadius: 15,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    };

// add function to reverse order of logs by date

    return (
        <section>
            <Dashboard handleLogout={handleLogout}>
                {/* add link to care log form once component is created */}
                {/* <button>Add Care Log</button> */}
                <button><Link to={`/dashboard`}>Back to Dashboard</Link></button>
                <button><Link to={`/plant/${plantId}`}>Back to Plant Details</Link></button>
            </Dashboard>
            <div className='carelogs-section'>
            
            <button onClick={toggleViewMode}>
              {!isTableMode ? 'Switch to List View' : 'Switch to Table View'}
            </button>
            {!isTableMode ? (
            <>
            <br/>
            <h3 className='watering-h3'>Plant Growth Chart</h3>
              <table>
                <thead>
                    <tr>
                        <th>Care Date</th>
                        <th>Plant Name</th>
                        <th>Height (inches)</th>
                        <th>Is Propagated?</th>
                        <th>mL Water Added Today</th>
                        <th>Soil Moisture %</th>
                        <th>Needs Repotting?</th>
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
                              {careLog.ispropagation ? "Yes" : "No"}
                            </td>
                            <td>
                              {careLog.mlwateraddedtoday}
                            </td>
                            <td>
                            {!careLog.ispropagation ? <p>{careLog.soilmoisturepercentdaily}%</p> : 'N/A'}
                            </td>
                            <td>
                              {careLog.needsrepotting ? "Yes" : "No"}
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
                        <img className="care-logs-img" src={'https://res.cloudinary.com/dwygxzqku/image/upload/v1713631071/Garden%20Nook/user-no-photo-uploaded.webp'} alt={careLog.plantname} />
                      )}
                      <br />
                      <strong>Care Date for {careLog.plantname}: </strong>{careLog.caredate}
                    </div>
                    <p><em>Notes:</em> {careLog.description}</p>
                    <p><em>Height:</em> {careLog.heightininches} inch(es)</p>
                    <p><em>Plant is Propagation?</em> {careLog.ispropagation ? "Yes" : "No"}</p>
                    <p><em>Sunlight Hours (Daily)</em> {careLog.sunlighthoursperday} hrs</p>
                    <p><em>Percent Soil Moisture</em> {!careLog.ispropagation ? <p>{careLog.soilmoisturepercentdaily}%</p> : 'N/A'}</p>
                    <p><em>mL Water added today:</em> {careLog.mlwateraddedtoday} mL</p>
                    <p><em>Needs to be Re-Potted?</em> {careLog.needsrepotting ? "Yes" : "No"}</p>
                    <button onClick={() => handleDelete(careLog.id)}>Delete Care Log</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h3 className='watering-h3'>Plant Growth Graph</h3>
          
          <div className='canvas'>
            <canvas id="lineChart" className="chart"></canvas>
          </div>
          <br/>
          <br/>
        </section>
    );
};

export default CareLogs;
import { useState, useEffect, useRef } from 'react'; // useRef: chartRef won't trigger a re-render, it's useful for storing mutable values that don't need to trigger a re-render - useRef is essential in this context for managing Chart.js instances, accessing DOM elements directly, and ensuring efficient updates without unnecessary re-renders. It plays a crucial role in integrating Chart.js with React while adhering to best practices.
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";
import Dashboard from '../Dashboard';
import Chart from 'chart.js/auto'; // get everything instead of just line graph
import 'chartjs-adapter-moment'; // needs this and need to install npm install chartjs-adapter-moment because gotta use a time scale (date) chart.js uses UTC


/* useRef notes: 
Yes, that's correct. Because of React's use of the virtual DOM and its component lifecycle methods, `useRef` is necessary for efficiently managing resources like the Chart.js instance in a React application. Here's how:

1. **Virtual DOM**: React's virtual DOM allows it to efficiently update the UI by minimizing the number of changes required to update the actual DOM. When React components re-render, it compares the virtual DOM with the actual DOM and only applies the necessary updates. `useRef` helps in this process by providing a way to persistently reference elements across renders, allowing React to efficiently manage and update these elements without unnecessary re-renders.

2. **Component Lifecycle Methods**: React components have lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`, among others. These lifecycle methods provide opportunities to perform tasks at different stages of a component's lifecycle, such as fetching data, subscribing to events, or cleaning up resources. `useRef` can be used in conjunction with these lifecycle methods to manage resources like Chart.js instances. For example, you can use `useRef` to store a reference to the Chart.js instance and then perform cleanup operations in the `componentWillUnmount` or `useEffect` cleanup function to prevent memory leaks.

In summary, `useRef` is essential in React applications because it allows for efficient management of resources like Chart.js instances, ensuring proper cleanup and preventing memory leaks, especially in the context of React's virtual DOM and component lifecycle methods.
*/

const URL = import.meta.env.VITE_BASE_URL;
const CareLogs = ( { handleLogout } ) => {
    const [careLogs, setCareLogs] = useState([]);
    const [isTableMode, setIsTableMode] = useState(true);
    const { user } = useOutletContext(); // access logged in user details such as id and username
    const { plantId } = useParams();
    const navigate = useNavigate();
    const chartRef = useRef(null); // need to use useRef to store the Chart instance - useRef allows us to preserve the state across re-renders.

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

    // using useEffect to add chart
    /*
    You will find that any event which causes the chart to re-render, such as hover tooltips, etc., will cause the first dataset to be copied over to other datasets, causing your lines and bars to merge together.

    This is because to track changes in the dataset series, the library needs a key to be specified. If none is found, it can't tell the difference between the datasets while updating. To get around this issue, you can take these two approaches:

    Add a label property to each dataset. By default, this library uses the label property as the key to distinguish datasets.
    Specify a different property to be used as a key by passing a datasetIdKey prop to your chart component.
    */
    /*
    https://react-chartjs-2.js.org/docs/working-with-events
    */
    useEffect(() => {
      if (careLogs.length >= 0) { // made it also equal to 0 to fix bug! it's not falsy if array has 0 elements! Might be redundant
      const ctx = document.getElementById('lineChart'); /* instead of using <Line> element from react- chartjs-2 package gets 'lineChart' from import Chart from 'chart.js/auto' package. Graphs a point from each careLog by id using <canvas element with the id lineChart>
      https://www.chartjs.org/docs/latest/configuration/responsive.html
      */
      if (ctx) {// useRef provides a way to directly access and manipulate DOM elements without violating React's principles. Preserving Chart.js instance: By storing the Chart.js instance in the chartRef.current, you have a persistent reference to the current instance of the chart. This allows you to access and manipulate the chart instance across re-renders without losing it.

        /*Destroying the existing instance: Before creating a new Chart.js instance in response to changes in the careLogs state, you need to ensure that any existing instance is properly destroyed to prevent conflicts with the canvas element. You achieve this by calling chartRef.current.destroy().
        
        Preventing memory leaks: Without proper cleanup, repeatedly creating new Chart.js instances on the same canvas element without destroying the previous instances can lead to memory leaks. By using useRef and chartRef.current.destroy(), you ensure that resources associated with the previous chart instance are properly cleaned up, preventing memory leaks.
        
        In summary, useRef is crucial for managing the Chart.js instance across re-renders and providing a way to clean up the existing instance before creating a new one. This helps prevent conflicts and memory leaks, ultimately ensuring the proper functioning of the chart component.*/
          if (chartRef.current) {
              // If chart instance already exists, destroy it first because it'll give this error for example: "Uncaught Error: Canvas is already in use. Chart with ID '5' must be destroyed before the canvas with ID 'barChart' can be reused." If the canvas element exists, it destroys any existing Chart.js instance referenced by chartRef.current. This step ensures that there's no conflict when creating a new chart instance.
              chartRef.current.destroy(); // bc no key prop will be used for labels - chartRef.current.destroy() is called when the component unmounts. This method is a part of the Chart.js library and is used to properly clean up and release any resources associated with the chart instance. if the careLogs state changes and triggers a re-render of the CareLogs component, the existing canvas element used for the Chart.js chart still remains in the DOM. If you attempt to create a new Chart.js instance on this same canvas element without destroying the existing instance first, you'll encounter the error you described. using useRef to create a mutable reference (chartRef) to the Chart.js instance. This reference allows you to interact with the Chart.js instance across re-renders without triggering unnecessary re-renders.

              /*When the component re-renders due to changes in the careLogs state, you want to update the Chart.js chart accordingly. However, since the canvas element used by Chart.js persists across re-renders, you need a way to manage the existing Chart.js instance.*/

              /*To prevent this error, you're using chartRef.current.destroy() to properly clean up the existing Chart.js instance before creating a new one. This ensures that there's no conflict and that the canvas element is cleared before a new chart instance is created. This cleanup process is necessary to avoid memory leaks and ensure the proper functioning of the chart component.*/

              /*
              chartRef.current.destroy() is called when the component unmounts. This method is a part of the Chart.js library and is used to properly clean up and release any resources associated with the chart instance.
              */
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
                // adding chart title!
                title: {
                display: true,
                text: "Watering Tracking / Care Date"
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
          // creates a new Chart.js instance using the configuration and assigns it to chartRef.current
          chartRef.current = new Chart(ctx, config);
        }
      }
    }, [careLogs, chartRef.current]);

    // set up chart - https://www.chartjs.org/docs/latest/samples/line/line.html
    const prepareChartData = () => {
      // The labels are the care date
      const labels = careLogs.map(log => log.caredate);
      // Data: https://www.chartjs.org/docs/latest/general/data-structures.html
      const soilMoistData = careLogs.map(log => log.pottedplant ? log.soilmoisturepercentdaily : 'N/A');
      const wateringFrequencyData = careLogs.map(log => log.wateringfrequencyperweek);
      const mLofWaterPerWeek = careLogs.map(log => log.mlofwaterperweek);
      return { // using canvas element instead of "Line" retrieved from DOM
        labels: labels,
        // no datasetIdKey='id' prop because not dynamically adding or removing datasets during runtime, so Chart.js can correctly differentiate between datasets based on their properties such as label
        datasets: [
          {
              label: 'Soil Moisture Percent Daily',
              data: soilMoistData,
              backgroundColor: 'rgba(167, 42, 42, 0.8)',
              /* https://www.chartjs.org/docs/latest/samples/line/point-styling.html
              for line graph style only next 3 lines
              */
              pointStyle: 'rectRot',
              pointRadius: 10,
              pointHoverRadius: 15,

              borderColor: 'rgba(167, 42, 42, 1)',
              borderWidth: 2,
          },
          {
              label: 'Weekly Watering Frequency',
              data: wateringFrequencyData,
              backgroundColor: 'rgba(91, 102, 255, 0.8)',
              pointStyle: 'rectRot',
              pointRadius: 10,
              pointHoverRadius: 15,
              borderColor: 'rgba(91, 102, 255, 1)',
              borderWidth: 1,
          },
          {
            label: 'Weekly mL of Water',
            data: mLofWaterPerWeek,
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
                <button>Add Care Log</button>
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
            <h3 className='watering-h3'>Watering Schedule Chart</h3>
              <table>
                <thead>
                    <tr>
                        <th>Care Date</th>
                        <th>Plant Name</th>
                        <th>Height (inches)</th>
                        <th>Potted Plant</th>
                        <th>Is Propagated?</th>
                        <th>Soil Moisture %</th>
                        <th>Needs Water Today?</th>
                        <th>Needs Repotting?</th>
                        <th>Roots healthy?</th>
                        <th>Watering Frequency (weekly)</th>
                        <th>mL of Water (weekly)</th>
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
                              {careLog.pottedplant ? <p>{careLog.soilmoisturepercentdaily}%</p> : 'N/A'}
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
                              {careLog.mlofwaterperweek}
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
                    <p><em>If in a pot - Percent Soil Moisture</em> {careLog.pottedplant ? <p>{careLog.soilmoisturepercentdaily}%</p> : 'N/A'}</p>
                    <p><em>Plant is Propagation?</em> {careLog.ispropagation ? "Yes" : "No"}</p>
                    <p><em>Needs watering?</em> {careLog.needswatertoday ? "Yes" : "No"}</p>
                    <p><em>Needs to be Re-Potted?</em> {careLog.needsrepotting ? "Yes" : "No"}</p>
                    <p><em>Watering Frequency per Week:</em>
                    {careLog.wateringfrequencyperweek}</p>
                    <p><em>mL of Water per Week</em>{careLog.mlofwaterperweek} mL</p>
                    <p><em>Are The Roots Healthy?</em> {careLog.rootshealthy ? "Yes" : "No"}</p>
                    <button onClick={() => handleDelete(careLog.id)}>Delete Care Log</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h3 className='watering-h3'>Watering Schedule Graph</h3>
          <br/>
          <canvas id="lineChart" className="chart"></canvas>
          <br/>
          <br/>
        </section>
    );
};

export default CareLogs;
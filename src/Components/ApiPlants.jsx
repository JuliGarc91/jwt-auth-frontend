import { useState, useEffect } from 'react';
// available for all users (even if not logged in)
const PLANT_API = import.meta.env.VITE_API_BASE_URL;
function App() {
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(PLANT_API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSpeciesList(data.data); // Set the species list to the "data" array in the response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Species List</h1>
      <ul>
        {speciesList.map((species) => (
          <li key={species.id}>
            <h2>{species.common_name}</h2>
            <p>Scientific Name: {species.scientific_name.join(', ')}</p>
            <p>Cycle: {species.cycle}</p>
            <p>Watering: {species.watering}</p>
            <p>Other Names: {species.other_name ? species.other_name.join(', ') : 'N/A'}</p>
            {/* <img src={species.default_image.thumbnail} alt={species.common_name} /> */}
            {species.default_image ? (
              <img src={species.default_image.thumbnail} alt={species.common_name} />
            ) : (
              <p>No Image Available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

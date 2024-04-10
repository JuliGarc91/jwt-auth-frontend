import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const PLANT_API = import.meta.env.VITE_API_BASE_URL;
function ApiPlants() {
    const [allSpecies, setAllSpecies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSpecies() {
            try {
                const response = await fetch(`${PLANT_API}&page=${currentPage}`);
                if (response.ok) {
                    const data = await response.json();
                    setAllSpecies(data.data);
                } else {
                    console.error(`Failed to fetch species data for page ${currentPage}`);
                }
            } catch (error) {
                console.error('Error fetching species data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSpecies();
    }, [currentPage]);

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <section className='api-plants'>
          <SearchBar />
          <div className='species-list'>
            <h1>Species List</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                <div>
                  <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous Page</button>
                  <button onClick={goToNextPage}>Next Page</button>
                </div>
                <ul>
                  {allSpecies.map(species => (
                  <li key={species.id}>
                    {species.default_image ? (
                    <img src={species.default_image.regular_url} alt={species.common_name} />
                  ) : (
                  <p>No Image Available</p>
                  )}
                  <h2>{species.common_name}</h2>
                  <p>Scientific Name: {species.scientific_name.join(", ")}</p>
                  <p>Cycle: {species.cycle}</p>
            <p>Watering: {species.watering}</p>
            <p>Other Names: {species.other_name ? species.other_name.join(', ') : 'N/A'}</p>
                  </li>
                  ))}
                  </ul>
                </>
            )}
            </div>
        </section>
    );
}

export default ApiPlants;

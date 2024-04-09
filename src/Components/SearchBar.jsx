import { useState, useEffect } from 'react';

const PLANT_API = import.meta.env.VITE_API_BASE_URL;
const SearchBar = () => {
    const [filteredSpecies, setFilteredSpecies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchSpecies() {
            try {
                const response = await fetch(`${PLANT_API}&q=${searchQuery}`);
                if (response.ok) {
                    const data = await response.json();
                    setFilteredSpecies(data.data);
                  //   setFilteredSpecies(data.data.filter(species => 
                  //     !species.watering.includes("Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry") &&
                  //     !species.cycle.includes("Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry")
                  // ));
                } else {
                    console.error('Failed to fetch species data');
                }
            } catch (error) {
                console.error('Error fetching species data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSpecies();
    }, [searchQuery]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <h1>Search Results</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            {isLoading ? (
                <p>Loading...</p>
              ) : (
              <ul>
                {filteredSpecies.map(species => (
                <li key={species.id}>
                  {!species.default_image || (species.watering.includes("Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry") &&
                  species.cycle.includes("Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry")
                    ) ? (
                    <p>No Image Available</p>
                    ) : (
                    <img src={species.default_image.regular_url} alt={species.common_name} />
                  )}
                <h2>{species.common_name}</h2>
                <p>Scientific Name: {species.scientific_name.join(", ")}</p>
                <p>Cycle: {species.cycle}</p>
                <p>Watering: {species.watering}</p>
                <p>Other Names: {species.other_name ? species.other_name.join(', ') : 'N/A'}</p>
              </li>
            ))}
            </ul>
            )}
        </div>
    );
}

export default SearchBar;
import { useState, useEffect } from 'react';

// const PLANT_API = import.meta.env.VITE_API_BASE_URL;
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
        <div className='search-bar'>
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
            <section>
              <ul className='species-list'>
                {filteredSpecies.map(species => (
                <li key={species.id} className='species-list'>
                  {!species.default_image || (species.watering.includes("Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry") &&
                  species.cycle.includes("Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry")
                    ) ? (
                    <p>No Image Available</p>
                    ) : (
                    <img src={species.default_image.regular_url} alt={species.common_name} />
                  )}
                    <h2>{species.common_name}</h2>
                    <p>
                        <strong>Scientific Name:</strong> {species.scientific_name.join(", ")}
                    </p>

                    {species.cycle.includes("Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry") ? <p><strong>Cycle:</strong> N/A</p> : <p><strong>Cycle:</strong> {species.cycle}</p>}
                    {species.watering.includes("Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry") ? <p><strong>Watering:</strong> N/A</p> : <p><strong>Watering:</strong> {species.watering}</p>}
                    <p><strong>Other Names:</strong> {species.other_name.length > 0 ? <p>{species.other_name.join(', ')}</p> : 'N/A'}</p>
                </li>
            ))}
             </ul>
            </section>
            )}
        </div>
    );
}

export default SearchBar;
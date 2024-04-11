import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const EditPlant = ({ plant }) => {
    const { user } = useOutletContext(); // access logged in user details such as id and username
    const navigate = useNavigate();

    const [plantData, setPlantData] = useState({
        userid: user.id,
        username: user.username,
        name: plant ? plant.name : "",
        species: plant ? plant.species : "",
        careinstructions: plant ? plant.careinstructions : "",
        imageurl: plant ? plant.imageurl : ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/users/${user.id}/userPlants/${plant.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(plantData),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Plant added:', data.plant);
                navigate(`/dashboard`);
            } else {
                console.error('Failed to edit plant:', error);
            }
        } catch (error) {
            console.error('Error editing plant:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlantData({
          ...plantData,
          [name]: value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Plant Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={plantData.name}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="species">Species:</label>
            <input
                type="text"
                id="species"
                name="species"
                value={plantData.species}
                onChange={handleInputChange}
            />
            <label htmlFor="careinstructions">Care Instructions:</label>
            <textarea
                id="careinstructions"
                name="careinstructions"
                value={plantData.careinstructions}
                onChange={handleInputChange}
            />
            <label htmlFor="imageurl">Plant Picture URL:</label>
            <input
                type="text"
                id="imageurl"
                name="imageurl"
                value={plantData.imageurl}
                onChange={handleInputChange}
            />
        
            <button type="submit">Edit Plant Details</button>
        </form>
    );
};

export default EditPlant;

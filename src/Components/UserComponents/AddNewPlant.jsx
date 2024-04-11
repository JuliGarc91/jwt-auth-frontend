import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const AddNewPlant = ({onAddPlant}) => {
    const { user } = useOutletContext(); // access logged in user details such as id and username
    const navigate = useNavigate();

    const [plantData, setPlantData] = useState({
        userid: user.id,
        username: user.username,
        name: "",
        species: "",
        careinstructions: "",
        imageurl: ""
    });

    // useEffect(() => {
    //     if (updatedData) {
    //         // If updatedData is not null, it means form submission is successful and new data is fetched
    //         // You can do any post-submission logic here, like displaying a success message
    //         console.log("New plant added:", updatedData);
    //         navigate('/dashboard');
    //     }
    // }, [updatedData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/users/${user.id}/userPlants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(plantData),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("New plant added:", data.plant); // Add this line
                onAddPlant(data.plant); // Update userPlants state in Dashboard component
                setPlantData({
                    userid: user.id,
                    username: user.username,
                    name: "",
                    species: "",
                    careinstructions: "",
                    imageurl: ""
                });
            } else {
                console.error('Failed to add plant:', error);
            }
        } catch (error) {
            console.error('Error adding plant:', error);
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
        
            <button type="submit">Add Plant</button>
        </form>
    );
};

export default AddNewPlant;

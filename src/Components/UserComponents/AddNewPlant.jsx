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

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${URL}/api/users/${user.id}/userPlants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(plantData),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add plant:', error);
            }
        })
        .then(data => {
            console.log("New plant added:", data.plant);
            onAddPlant(data.plant);
            return data.plant;
        })
        .then(addedPlant => {
            navigate(`/plant/${addedPlant.id}`);
        })
        .catch(error => {
            console.error('Error adding plant:', error);
        });
    };
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlantData({
          ...plantData,
          [name]: value,
        });
    };

return (
    <div className="add-new-plant-form">
        <h3>Add Plant to Dashboard</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Plant Name:
            <input
                type="text"
                id="name"
                name="name"
                value={plantData.name}
                onChange={handleInputChange}
                required
            />
            </label>
            <label htmlFor="species">Species:
            <input
                type="text"
                id="species"
                name="species"
                value={plantData.species}
                onChange={handleInputChange}
            />
            </label>
            <label htmlFor="careinstructions">Care Instructions:
            <textarea
                id="careinstructions"
                name="careinstructions"
                value={plantData.careinstructions}
                onChange={handleInputChange}
            />
            </label>
            <label htmlFor="imageurl">Plant Picture URL:
            <input
                type="text"
                id="imageurl"
                name="imageurl"
                value={plantData.imageurl}
                onChange={handleInputChange}
            />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
    );
};

export default AddNewPlant;

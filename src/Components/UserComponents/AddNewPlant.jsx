import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const AddNewPlant = ({ handleAddPlant }) => {
    const { user } = useOutletContext(); // access logged in user details such as id and username
    const navigate = useNavigate();

    const [plantData, setPlantData] = useState({
        userid: user.id,
        username: user.username,
        name: "",
        color: "",
        planttype: "",
        isfloweringplant: false,
        soiltype: "",
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
                throw new Error('Failed to add plant:');
            }
        })
        .then(data => {
            console.log("New plant added:", data.plant);
            handleAddPlant(data.plant);
            navigate(`/dashboard`);
            return data.plant;
            
        })
        .then(() => {
        setPlantData({
            userid: user.id,
            username: user.username,
            name: "",
            color: "",
            planttype: "",
            isfloweringplant: false,
            soiltype: "",
            species: "",
            careinstructions: "",
            imageurl: ""
        })
        //     navigate(`/dashboard`);
        })
        .catch(() => {
            console.log('Error adding plant:');
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
            <label htmlFor="name">
            <input
                type="text"
                id="name"
                name="name"
                value={plantData.name}
                onChange={handleInputChange}
                placeholder="Plant Name"
                required
            />
            </label>
            <label htmlFor="species">
            <input
                type="text"
                id="species"
                name="species"
                value={plantData.species}
                onChange={handleInputChange}
                placeholder="Species"
            />
            </label>
            <label htmlFor="color"> 
            <input
                type="text"
                id="color"
                name="color"
                value={plantData.color}
                onChange={handleInputChange}
                placeholder="Color"
            />
            </label>
            <label htmlFor="planttype"> 
            <input
                type="text"
                id="planttype"
                name="planttype"
                value={plantData.planttype}
                onChange={handleInputChange}
                placeholder="Plant Cycle Type"
            />
            </label>
            <label htmlFor="isfloweringplant">
                <select
                    id="isfloweringplant"
                    name="isfloweringplant"
                    value={plantData.isfloweringplant}
                    onChange={handleInputChange}
                >   
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </label>
            <label htmlFor="soiltype"> 
            <input
                type="text"
                id="soiltype"
                name="soiltype"
                value={plantData.soiltype}
                onChange={handleInputChange}
                placeholder="Soil Type Used"
            />
            </label>
            <label htmlFor="careinstructions">
            <textarea
                id="careinstructions"
                name="careinstructions"
                value={plantData.careinstructions}
                onChange={handleInputChange}
                placeholder="Care Instructions"
            />
            </label>
            <label htmlFor="imageurl">
            <input
                type="text"
                id="imageurl"
                name="imageurl"
                value={plantData.imageurl}
                onChange={handleInputChange}
                placeholder="Plant Picture URL"
            />
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
    );
};

export default AddNewPlant;

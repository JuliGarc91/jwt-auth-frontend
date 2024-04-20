import { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const EditPlant = ({ plant, setPlant }) => {
    const { user } = useOutletContext(); // access logged in user details such as id and username
    const navigate = useNavigate();
    const { id } = useParams();

    const [plantData, setPlantData] = useState({
        userid: user.id,
        username: user.username,
        name: plant.name,
        species: plant.species,
        color: plant.color,
        planttype: plant.planttype,
        isfloweringplant: plant.isfloweringplant,
        soiltype: plant.soiltype,
        careinstructions: plant.careinstructions,
        imageurl: plant.imageurl
    });
console.log(plantData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/users/${user.id}/userPlants/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(plantData),
            });
            if (response.ok) {
                const data = await response.json();
                setPlant(data.userPlant)
                setPlantData(data.userPlant)
                navigate(`/plant/${id}`)
            } else {
                console.error('Failed to edit plant:', error);
            }
        } catch (error) {
            console.error('Error editing plant:', error);
        }
    };

    useEffect(() => {
        console.log('Plant edited:', plant);
        navigate(`/plant/${id}`);
    }, [plant, plantData]);
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlantData({
          ...plantData,
          [name]: value,
        });
    };

    return (
        <div className="edit-plant-form">
        <h3>Edit Plant</h3>
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
            <label htmlFor="color">Color: 
            <input
                type="text"
                id="color"
                name="color"
                value={plantData.color}
                onChange={handleInputChange}
            />
            </label>
            <label htmlFor="planttype">Plant Type: 
            <input
                type="text"
                id="planttype"
                name="planttype"
                value={plantData.planttype}
                onChange={handleInputChange}
            />
            </label>
            <label htmlFor="isfloweringplant"> Is it a Flowering Plant?
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
            <label htmlFor="soiltype">Soil Type Used: 
            <input
                type="text"
                id="soiltype"
                name="soiltype"
                value={plantData.soiltype}
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

export default EditPlant;

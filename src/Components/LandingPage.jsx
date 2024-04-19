import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ShowPlantInfo from "./ShowPlantInfo";

function LandingPage() {
  const [showPlants, setShowPlants] = useState(true);
  const [showPlantInfo, setShowPlantInfo] = useState(false);

  const togglePlants = () => {
    setShowPlants(!showPlants);
  };

  const togglePlantInfo = () => {
    setShowPlantInfo(!showPlantInfo)
  }

  return (
  <>
    <section className="landing">
      <div className="welcome">
        <h3>Welcome to GardenNook 🌻</h3>
        <p className="welcome">Search for any plant or its attributes and discover expert care advice tailored just for it. Let's grow together!</p>
      <button onClick={togglePlantInfo}>
        {showPlantInfo ? "Hide Plant Cycle Information" : "Show Plant Cycle Information"}
      </button>
        {showPlantInfo ? 
          <div>
            <ShowPlantInfo />
          </div> : ""
        }
      {/* <button onClick={togglePlants}>
        {showPlants ? "Hide Plant Library" : "Show Plant Library"}
      </button> */}
      <button onClick={togglePlants}>
        {!showPlants ? "Show Plant Library" : "Hide Plant Library"}
      </button>
      <button>
      <Link to="/dashboard">View Your Dashboard</Link>
      </button>
      </div>
    </section>
    <section className="api-plants">
      {showPlants && <SearchBar/>}
    </section>
  </>
  );
}

export default LandingPage;


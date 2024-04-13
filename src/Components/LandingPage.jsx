import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function LandingPage() {
  const [showPlants, setShowPlants] = useState(false);

  const togglePlants = () => {
    setShowPlants(!showPlants);
  };

  return (
  <>
    <section className="landing">
      <div className="welcome">
        <h3>Welcome to GardenNook</h3>
        <p className="welcome">🌱 Search for any plant and discover expert care tips tailored just for it. Let's grow together!</p>
      
      <button onClick={togglePlants}>
        {showPlants ? "Hide Plant Library" : "Show Plant Library"}
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


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
      <h2>Welcome to GardenNook</h2>
      <button onClick={togglePlants}>
        {showPlants ? "Hide Plant Library" : "Show Plant Library"}
      </button>
      <button>
      <Link to="/dashboard">View Your Dashboard</Link>
      </button>
    </section>
    <section>
      {showPlants && <SearchBar/>}
    </section>
  </>
  );
}

export default LandingPage;


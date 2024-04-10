import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function LandingPage() {
  const [showPlants, setShowPlants] = useState(false);

  const togglePlants = () => {
    setShowPlants(!showPlants);
  };

  return (
    <section className="landing">
      <h2>Welcome to GardenNook</h2>
      
      <button onClick={togglePlants}>
        {showPlants ? "Hide Plant Library" : "Show Plant Library"}
      </button>
      <button>
      <Link to="/dashboard">View Your Dashboard</Link>
      </button>

      {showPlants && <SearchBar/>}
      
      {/* <h1>This is Your Landing Page</h1> */}
      {/* Dashboard is a protected component. If you are not logged in and you try 
        to navigate to the component you will be sent to the Login Page. Try It!*/}
    </section>
  );
}

export default LandingPage;


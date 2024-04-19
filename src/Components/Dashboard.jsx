import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Dashboard = ({ handleLogout, children }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  const [isBackgroundImage, setIsBackgroundImage] = useState(false);

  const handleClick = () => {
    setIsBackgroundImage(prevState => !prevState);
    const body = document.body;
    if (isBackgroundImage) {
      body.style.backgroundImage = `url(https://res.cloudinary.com/dwygxzqku/image/upload/v1713543909/Garden%20Nook/darkmode-theme-background2.avif)`;
    } else {
      body.style.backgroundImage = `url(https://res.cloudinary.com/dwygxzqku/image/upload/v1713545802/Garden%20Nook/lightmode-theme-background1.jpg)`;
    }
  };


return (
  <section className="dashboard">
    <div className="welcome">
      {user && (
        <h2>
          Welcome to your Garden Nook, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}!
        </h2>
      )}
      
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <button onClick={handleClick}>
        {!isBackgroundImage? "Dark Theme":"Light Theme"}
      </button>
      {children}
    </div>
  </section>
  );
};

export default Dashboard;

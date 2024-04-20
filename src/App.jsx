import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import UsersPlants from "./Components/UserComponents/UsersPlants";
import UsersPlant from "./Components/UserComponents/UsersPlant";
import CareLogs from "./Components/UserComponents/CareLogs";
import "./App.css";
import CareLog from "./Components/UserComponents/CareLog";
import Footer from "./Components/UserComponents/Footer";
import NotFound from "./Components/NotFound";
import About from "./Components/About";


function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />
      {/* <h2>Welcome to GardenNook</h2> */}
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          {/* add route for edit plant form instead to fix bug */}
          <Route
          path="*"
          element={<NotFound />}
          />
          <Route
            path="/dashboard"
            element={
            <>
              <Dashboard handleLogout={handleLogout} /> 
              <UsersPlants/>
            </>}
          />
          <Route 
            path="/plant/:id"
            element={<UsersPlant/>}
          />
          <Route 
            path="/plant/:plantId/carelogs"
            element={<CareLogs/>}
          />
          <Route
            path="/plant/:plantId/carelogs/:id"
            element={<CareLog />}
          />
        </Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

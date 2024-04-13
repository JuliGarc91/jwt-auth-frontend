import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }
// useLocation for conditional rendering of views and use wrap component like in mod 3 project
const isDashboardPage = location.pathname === '/dashboard';

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
        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
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
    </>
  );
}

export default App;

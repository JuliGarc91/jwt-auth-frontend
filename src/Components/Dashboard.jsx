import { useOutletContext } from "react-router-dom";
// import UsersPlants from "./UserComponents/UsersPlants";
const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  return (
    <div>
      <br />
      <br />
      <h2>Dashboard Component</h2>

      {user && (
        <h1>
          Welcome, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </h1>
      )}

      {/* Use user data as needed, for example: */}

      <button onClick={handleLogout}>Logout</button>
      {/* <UsersPlants /> */}
    </div>
  );
};

export default Dashboard;

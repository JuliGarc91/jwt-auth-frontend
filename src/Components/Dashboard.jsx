import { useOutletContext } from "react-router-dom";
const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  return (
    <>
    <button onClick={handleLogout}>Logout</button>
    <section className="dashboard">
      {/* <h2>Dashboard Component</h2> */}
      
      {user && (
        <h1>
          Welcome, to your Garden Nook {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}!
        </h1>
      )}

      {/* Use user data as needed, for example: */}

      
      {/* <UsersPlants /> */}
    </section>
    </>
  );
};

export default Dashboard;

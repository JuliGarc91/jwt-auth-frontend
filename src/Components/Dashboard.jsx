import { Link, useOutletContext } from "react-router-dom";
const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  return (
    
    <section className="dashboard">
      <>
      {user && (
        <h1>
          Welcome to your Garden Nook, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}!
          
        </h1>
      )}
      <button onClick={handleLogout}>Logout</button>
      <br/>
      <button><Link to="/addnewplant">Add Plant</Link></button>
      </>
    </section>
  );
};

export default Dashboard;

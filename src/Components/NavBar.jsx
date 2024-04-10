import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <>
    <section className="navbar-container">
      <header>
      <h2>
        <Link style={{ textDecoration: "none" }} to="/">
          Garden Nook
        </Link>
      </h2>
      </header>
      <div className="nav-links">
      {!toggleLogin ? (
        <Link to={"/login"}>
          <span>Login</span>
        </Link>
      ) : (
        <>
          {user && <span>Hello, {user.username.toUpperCase()} </span>}
          <Link onClick={handleLogout}>
            <span>Logout</span>
          </Link></>
      )}
      <Link to="/dashboard">|Dashboard</Link>
      <Link to="/">|Home</Link>
      </div>
      
    </section>
    <hr />
    </>
  );
};

export default NavBar;

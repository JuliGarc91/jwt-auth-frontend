import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(false);

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

  useEffect(()=>{
    const token = localStorage.getItem("token");
  
    if(token) setLoggedInUser(true)
  
  },[])

  return (
    <>
    <section className="navbar-container">
      <header>
      <h1>
        <Link to="/">
          Garden Nook
        </Link>
      </h1>
      </header>
      <div className="nav-links">
      {!toggleLogin || !loggedInUser ? (
        <Link to={"/login"}>
          <span>Login</span>
        </Link>
      ) : (
        <>
          {user && <span className="welcome">Hello, {user.username.toUpperCase()}&nbsp;&nbsp;&nbsp;</span>}
          <Link onClick={handleLogout}className="logout-link">
            <span>Logout&nbsp;</span>
          </Link></>
      )}
      <Link to="/dashboard">|&nbsp;Dashboard&nbsp;</Link>
      <Link to="/">|&nbsp;Home&nbsp;</Link>
      </div>
      
    </section>
    <hr />
    </>
  );
};

export default NavBar;

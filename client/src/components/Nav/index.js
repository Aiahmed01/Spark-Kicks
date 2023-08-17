import React, { useContext } from "react"; // Import useContext
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";



function Nav() {


  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
        
        {console.log(Auth.getProfile().data.isAdmin)}
          {Auth.getProfile().data.isAdmin && ( // Use Auth.isAdmin() here
            <li className="mx-1">
              <Link to="/dashboard">
                👟 Admin Panel
              </Link>
            </li>
          )}
          
          
          <li className="mx-1">
            {/* Use Link component to logout */}
            <Link to="/" onClick={() => Auth.logout()}>
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">
👟</span>
          Spark Kicks
        </Link>
      </h1>

      <nav>
        {showNavigation()}

      </nav>
    </header>
  );
}

export default Nav;

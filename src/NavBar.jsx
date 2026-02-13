import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";

let NavBar = () => {
  //get context
  let userContext = useContext(UserContext);

  let onLogoutClick = (event) => {
    event.preventDefault();
    userContext.setUser({
      isLoggedIn : false,
      currentUserName : null,
      currentUserId : null,
    });

    window.location.hash = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-style">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"> eCommerce</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {userContext.user.isLoggedIn ?
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/dashboard" activeClassName="active" >Dashboard</NavLink>
            </li> : ""}
            {!userContext.user.isLoggedIn ? 
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/" exact = {true}>Login</NavLink>
            </li> : ""}
            {!userContext.user.isLoggedIn ? 
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>
            </li> : ""}
            {/* right box starts */}
            {userContext.user.isLoggedIn ?
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userContext.user.currentUserName}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="/#" onClick = {onLogoutClick}>LogOut</a></li>
              </ul>
            </li> : ""}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

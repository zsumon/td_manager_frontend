import React from "react";
import {Link} from "react-router-dom";
import style from './NavBar.module.css';

const NavBar = ({isLoggedIn, onLogout}) => {

  return <div className="">
    <div className={style.wrapper + " shadow"}>
      <div className="container d-md-flex justify-content-md-between align-items-center">
        <Link to={"/"} className="navbar-brand" href="#">TodoList Manager</Link>
        {!isLoggedIn && <div className={"d-flex"}>
          <Link to={"/login"} className="nav-link mr-2 pl-0">Login</Link>
          <Link to={"/register"} className="nav-link ">Register</Link>
        </div>}
        {isLoggedIn && <div className={"d-flex"}>
          <Link to={"/profile"} className="nav-link pl-0">Profile</Link>
          <Link to={"/login"} onClick={() => onLogout()} className={"nav-link"}>Logout</Link>
        </div>}
      </div>
    </div>
  </div>
}

export default NavBar;

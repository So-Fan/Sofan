import React from "react";
import "./NavLink.css";
import { Link } from "react-router-dom";
const NavLink = ({ name, link }) => {
  return (
    <Link className="navbar-navicon" to={link}>
      {name}
    </Link>
  );
};

export default NavLink;

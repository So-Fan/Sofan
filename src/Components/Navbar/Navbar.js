import React from "react";
import "./Navbar.css";
import sofanLogo from "../../Assets/Image/sofanlogo.svg"
function Navbar() {
  return (
    <nav 
    className="navbar-container"
    >
      <img src={sofanLogo} alt="sofan logo" />
    </nav>
  );
}

export default Navbar;

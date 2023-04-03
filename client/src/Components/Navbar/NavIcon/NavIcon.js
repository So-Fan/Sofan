import React from "react";
import "./NavIcon.css";

const NavIcon = ({ src }) => {
  return (
    <div className="navbar-icon-container">
      <img
        className="navbar-icon"
        src={src}
        alt={`${src.split("/").pop().split(".")[0]}`}
      />
    </div>
  );
};

export default NavIcon;

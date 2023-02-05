import React from "react";
import "./NavIcon.css";

const NavIcon = ({ src }) => {
  return (
    <img
      className="navbar-icon"
      src={src}
      alt={`${src.split("/").pop().split(".")[0]} image`}
    />
  );
};

export default NavIcon;

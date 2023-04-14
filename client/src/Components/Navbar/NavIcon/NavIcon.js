import React from "react";
import "./NavIcon.css";

const NavIcon = ({ src, handleNotificationPopup }) => {
  return (
    <div onClick={handleNotificationPopup} className="navbar-icon-container">
      <img
        className="navbar-icon"
        src={src}
        alt={`${src.split("/").pop().split(".")[0]}`}
      />
    </div>
  );
};

export default NavIcon;

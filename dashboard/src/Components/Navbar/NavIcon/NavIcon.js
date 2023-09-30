import React from "react";
import "./NavIcon.css";

const NavIcon = ({ src, handleNotificationPopup, isNotificationsRead }) => {
  return (
    <div onClick={handleNotificationPopup} className="navbar-icon-container">
      <img
        className="navbar-icon"
        src={src}
        alt={`${src.split("/").pop().split(".")[0]}`}
      />
      {!isNotificationsRead && (
        <>
          <div className="navbar-icon-notifications-red-round"></div>
        </>
      )}
    </div>
  );
};

export default NavIcon;

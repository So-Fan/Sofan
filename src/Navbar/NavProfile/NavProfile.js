import React from "react";
import "./NavProfile.css";
const NavProfile = ({ src }) => {
  return (
    <div className="navbar-navprofile-container">
      <a className="navbar-navprofile" href="/my-profile">
        <img src={src} alt={`${src.split("/").pop().split(".")[0]} image`} />
      </a>
      <div className="navbar-dropdown">
        <a href="/profile">Voir profil</a>
        <a href="/settings">Settings</a>
        <a href="/legals">Mentions<br />légales</a>
      </div>
    </div>
  );
};

export default NavProfile;

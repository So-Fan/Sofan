import React from "react";
import "./NavProfile.css";
const NavProfile = ({ isProfileClicked, src }) => {

  return (
    <div  className="navbar-navprofile-container" >
      <div className="navbar-navprofile" href="/my-profile">
        <img id="navbar-user-profile-img" src={src} alt={`${src.split("/").pop().split(".")[0]} image`} />
      </div>
      {isProfileClicked && <div className="navbar-dropdown">
        <a href="/profile">Voir profil</a>
        <a href="/settings">Settings</a>
        <a href="/legals">Mentions<br />légales</a>
      </div>}
    </div>
  );
};

export default NavProfile;

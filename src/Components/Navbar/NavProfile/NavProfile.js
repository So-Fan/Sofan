import React from "react";
import "./NavProfile.css";
import {Link} from "react-router-dom"
const NavProfile = ({ isProfileClicked, src }) => {

  return (
    <div className="navbar-navprofile-container" >
      <div className="navbar-navprofile" href="/my-profile">
        <img id="navbar-user-profile-img" src={src} alt={`${src.split("/").pop().split(".")[0]} image`} />
      </div>
      {isProfileClicked && <div className="navbar-dropdown">
        <Link to="/profile">Voir profil</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/legals">Mentions<br />légales</Link>
      </div>}
    </div>
  );
};

export default NavProfile;

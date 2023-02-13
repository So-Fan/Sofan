import React from "react";
import "./NavProfile.css";
const NavProfile = ({ isProfileClickcd, setIsProfileClicked, src }) => {

  
  const handleProfileClick = (e) => {
    
    setIsProfileClicked(true)
  }

  return (
    <div onClick={handleProfileClick} className="navbar-navprofile-container">
      <div className="navbar-navprofile" href="/my-profile">
        <img src={src} alt={`${src.split("/").pop().split(".")[0]}`} />
      </div>
      {isProfileClickcd && <div className="navbar-dropdown">
        <a href="/profile">Voir profil</a>
        <a href="/settings">Settings</a>
        <a href="/legals">Mentions<br />légales</a>
      </div>}
    </div>
  );
};

export default NavProfile;

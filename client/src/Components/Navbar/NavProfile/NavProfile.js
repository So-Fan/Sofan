import React, { useContext } from "react";
import "./NavProfile.css";
import {Link} from "react-router-dom"
import { auth } from "../../../Configs/firebase";
import { signOut } from 'firebase/auth';
import UserContext from '../../../UserContext';


const NavProfile = ({ isProfileClicked, src }) => {
  const { setLoggedInUser } = useContext(UserContext);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setLoggedInUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar-navprofile-container" >
      <div className="navbar-navprofile" href="/my-profile">
        <img id="navbar-user-profile-img" src={src} alt={`${src.split("/").pop().split(".")[0]} image`} />
      </div>
      {isProfileClicked && <div className="navbar-dropdown">
        <Link to="/profile">Voir profil</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/legals">Mentions<br />légales</Link>
        <Link onClick={handleSignOut} to="/">Déconnecter</Link>
      </div>}
    </div>
  );
};

export default NavProfile;

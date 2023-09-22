import React, { useContext } from "react";
import "./NavProfile.css";
import { Link } from "react-router-dom";
import { auth } from "../../../Configs/firebase";
import { signOut } from "firebase/auth";
import UserContext from "../../../contexts/UserContext/UserContext";
import useEth from "../../../contexts/EthContext/useEth";
import { useNavigate } from "react-router-dom";

const NavProfile = ({ web3auth, isProfileClicked, src, userInfo = null }) => {
  const { setLoggedInUser, setLocalWeb3authProvider } = useContext(UserContext);
  const navigate = useNavigate();
  const { setWeb3authProvider } = useEth();

  const handleSignOut = async () => {
    console.log("sign out");
    setWeb3authProvider(null);
    signOut(auth)
      .then(() => {
        setLoggedInUser(null);
        setLocalWeb3authProvider(null);
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("isUserLogged");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    try {
      if (!web3auth) return;
      await web3auth.logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar-navprofile-container">
      <div className="navbar-navprofile" href="/my-profile">
        <img
          id="navbar-user-profile-img"
          src={src}
          alt={`${src.split("/").pop().split(".")[0]} image`}
        />
      </div>
      {isProfileClicked && (
        <div className="navbar-dropdown">
          <Link
            to={
              userInfo.account_type !== "free"
                ? `/athleteprofile/${userInfo.id}`
                : `/userprofile/${userInfo.id}`
            }
          >
            Voir profil
          </Link>
          <div className="navbar-dropdown-separation-line"></div>
          <Link to="/settings">Settings</Link>
          <div className="navbar-dropdown-separation-line"></div>
          <Link to="/cgu">CGU</Link>
          <div className="navbar-dropdown-separation-line"></div>
          <Link
            onClick={handleSignOut}
            // to="/"
          >
            Déconnecter
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavProfile;

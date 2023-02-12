import React from "react";
import "./Navbar.css";
import SofanLogo2 from "../../Assets/Image/sofanlogo2.svg";
import Searchbar from "./Searchbar/Searchbar";
import NavLink from "./NavLink/NavLink";
import NavIcon from "./NavIcon/NavIcon";
import notification from "../../Assets/Image/notification.svg";
import NavProfile from "./NavProfile/NavProfile";
import profile from "../../Assets/Image/profile.svg";
import { Link } from "react-router-dom";
const Navbar = ({ isProfileClicked }) => {
  return (
    <section className="navbar-section">
      <div className="navbar-wrap">
        <div className="navbar-wrap-1">
          <Link to="/">
            <img className="navbar-main-logo" src={SofanLogo2} alt="Sofan" />
          </Link>
          <Searchbar />
        </div>
        <div className="navbar-wrap-2">
          <NavLink name="Feed" link="/Feed" />
          <NavLink name="Launchpad" link="/Launchpad" />
          <div className="navbar-wrap-2-subwrap-navicon-and-navprofile">
            <div className="navbar-wrap-2-navicon-wrap">
              <div className="navbar-vertical"></div>
              <NavIcon src={notification} />
              <div className="navbar-vertical"></div>
            </div>
            <NavProfile isProfileClicked={isProfileClicked} src={profile} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

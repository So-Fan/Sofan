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
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import NotificationPopUp from "./NotificationPopUp/NotificationPopUp";
const Navbar = ({ isProfileClicked, isLogged, handleNotificationPopup, isNotificationButtonClicked, setIsNotificationButtonClicked }) => {
  return (
    <>
     {!isLogged &&<style>
    {`
    ${customNavbarMediaQueries}
    `}
    </style>}
      <section className="navbar-section">
        <div className="navbar-wrap">
          <div className="navbar-wrap-1">
            <Link to="/">
              <img className="navbar-main-logo" src={SofanLogo2} alt="Sofan" />
            </Link>
            <Searchbar />
          </div>
          <div
            className={
              isLogged ? "navbar-wrap-2" : "navbar-wrap-2-unauthenticated"
            }
          >
            <NavLink name="Feed" link="/Feed" />
            <NavLink name="Launchpad" link="/Launchpad" />
            {isLogged ? (
              <div className="navbar-wrap-2-subwrap-navicon-and-navprofile">
                <div className="navbar-wrap-2-navicon-wrap">
                  <div className="navbar-vertical"></div>
                  <NavIcon 
                  handleNotificationPopup={handleNotificationPopup}
                  src={notification} />
                  <div className="navbar-vertical"></div>
                </div>
                <NavProfile isProfileClicked={isProfileClicked} src={profile} />
              </div>
            ) : (
              <div className="navbar-wrap-2-subwrap-sign">
                <Button text="Sign up" style={NavbarButtonStyle.signUp} customMediaQueries={customNavbarButtonMediaQueries}/>
                <Button text="Sign in" style={NavbarButtonStyle.signIn} />
              </div>
            )}
          </div>
        </div>
      </section>
      {isNotificationButtonClicked && (
        <Modal
          setState={setIsNotificationButtonClicked}
          style={{ top: "24px", right: "20px" }}
        >
          <NotificationPopUp 
          notificationPopUpComponent={true}
          />
        </Modal>
      )}
    </>
  );
};
export default Navbar;

const customNavbarMediaQueries = "@media (max-width: 1200px) {.searchbar-input{width: 438px;}.navbar-wrap-1 {width: 600px;}} @media (max-width: 1139px) {.navbar-wrap-2-unauthenticated{width: 384px;}.navbar-wrap-1 { width: 500px;}.searchbar-input{width: 330px;}} @media (max-width: 1048px) {.navbar-wrap-1 {width: 450px;}.searchbar-input{width: 290px;}} @media (max-width: 940px) {.navbar-wrap {width: 95%;}.navbar-wrap-1 {width: 450px;}.searchbar-input{width: 290px;}} @media (max-width: 886px) {.navbar-wrap {width: 98%;}} @media (max-width: 860px) {.navbar-wrap-2-unauthenticated{width:350px;}} @media (max-width: 825px) {.navbar-wrap-2-unauthenticated{width:320px;}}"
const customNavbarButtonMediaQueries ='@media (max-width: 860px) {.button-component{width:100px !important;}} @media (max-width: 860px) {.button-component{width:90px !important;}}'

const NavbarButtonStyle = {
  signUp: {
    backgroundColor: "white",
    border: "1px solid #F6D463",
    width: "117px",
    height: "40px",
    borderRadius: "5px",
    fontFamily: 'Britanica-Heavy',
    fontSize: "16px"

  },
  signIn: {
    backgroundColor: "#F6D463",
    border: "1px solid #F6D463",
    width: "117px",
    height: "40px",
    borderRadius: "5px",
    fontFamily: 'Britanica-Heavy',
    fontSize: "16px"
  },
};
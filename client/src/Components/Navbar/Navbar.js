import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SofanLogo2 from "../../Assets/Image/sofanlogo2.svg";
import Searchbar from "./Searchbar/Searchbar";
import NavIcon from "./NavIcon/NavIcon";
import notification from "../../Assets/Image/notification.svg";
import NavProfile from "./NavProfile/NavProfile";
import profile from "../../Assets/Image/profile.svg";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import NotificationPopUp from "./NotificationPopUp/NotificationPopUp";
import LoginSignUpScreen from "../../Pages/LoginSignUpPage/LoginSignUpScreen";
import LoginSignUp from "../LoginSignUp/LoginSignUp";
import SignUp from "../LoginSignUp/SignUp";
import Signup from "../LoginSignupPopUp/Signup";
import { useNavigate } from "react-router-dom";
import PopUpSignIn from "../PopUpSignIn/PopUpSignIn";

const Navbar = ({
  // isProfileClicked,
  isLogged,
  handleNotificationPopup,
  isNotificationButtonClicked,
  setIsNotificationButtonClicked,
  web3auth,
  setWeb3auth,
  checkWalletProvider,
  setIsUserLogged,
}) => {
  const [pixelScrolledAthleteProfilePage, setPixelScrolledAthleteProfilePage] =
    useState();
  const [isSignUpButtonClicked, setIsSignUpButtonClicked] = useState(false);
  const [isSignInButtonClicked, setIsSignInButtonClicked] = useState(false);
  const handlePixelScrolledAthleteProfilePage = () => {
    setPixelScrolledAthleteProfilePage(window.scrollY);
  };
  const [isNotificationsRead, setIsNotificationsRead] = useState(false);
  const [isPageHomeDisplay, setIsPageHomeDisplay] = useState(false);
  const [isPageLaunchpadDisplay, setIsPageLaunchpadDisplay] = useState(false);
  const [isSearchBarbClicked, setIsSearchBarClicked] = useState(false);
  // const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split("/");
  const path = segments[1];
  // console.log(path)
  // console.log(location.pathname);
  function handleSignInButtonClick() {
    // navigate('/login'); // redirect to signin popup
    setIsSignInButtonClicked(true);
  }

  function handleSignUpButtonClick() {
    setIsSignUpButtonClicked(true);
    // document.querySelector("body").classList.add("scroll-lock");
  }
  useEffect(() => {
    window.addEventListener(
      "scroll",
      handlePixelScrolledAthleteProfilePage,
      false
    );
    if (isLogged?.username !== undefined) {
      setIsSignInButtonClicked(false);
    }
    return () => {
      window.removeEventListener(
        "scroll",
        handlePixelScrolledAthleteProfilePage,
        false
      );
    };
  }, []);
  useEffect(() => {
    if (location.pathname === "/") {
      setIsPageHomeDisplay(true);
      setIsPageLaunchpadDisplay(false);

      // console.log("ceci est home");
    } else {
      setIsPageHomeDisplay(false);
    }
    if (location.pathname === "/Launchpad") {
      setIsPageLaunchpadDisplay(true);
      setIsPageHomeDisplay(false);
      console.log("ceci est launchpad");
    } else {
      setIsPageLaunchpadDisplay(false);
    }
  }, [location]);
  useEffect(() => {
    if (isSignInButtonClicked || isSignUpButtonClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSignInButtonClicked, isSignUpButtonClicked]);

  const handlePopoUpSignInSignUpClick = () => {
    setIsSignInButtonClicked(false);
    setIsSignUpButtonClicked(true);
  };
  const handlePopoUpSignUpSignInClick = () => {
    setIsSignUpButtonClicked(false);
    setIsSignInButtonClicked(true);
  };
  function handleSignupPopupDisplay(e) {
    if (
      e.target.id === "modal-component-cross" ||
      e.target.id === "custom-close-button"
    ) {
      setIsSignUpButtonClicked(false);
    }
  }
  function handleSignInPopupDisplay(e) {
    if (
      e.target.id === "modal-component-cross" ||
      e.target.id === "custom-close-button"
    ) {
      setIsSignInButtonClicked(false);
    }
  }
  function handleSearchBarClick() {
    setIsSearchBarClicked(!isSearchBarbClicked);
  }
  return (
    <>
      {!isLogged && (
        <style>
          {`
    ${customNavbarMediaQueries}
    `}
        </style>
      )}
      {path === "post" ? (
        <>
          <Link to="/">
            <img
              style={{ marginTop: "60px", width: "200px" }}
              className="navbar-main-logo"
              src={SofanLogo2}
              alt="Sofan"
            />
          </Link>
        </>
      ) : (
        <>
          <section className="navbar-section">
            <div className="navbar-wrap">
              <div className="navbar-wrap-1">
                <a href="/">
                  <img
                    className="navbar-main-logo"
                    src={SofanLogo2}
                    alt="Sofan"
                  />
                  <div className="navbar-main-logo-beta">beta</div>
                </a>{" "}
                <Searchbar handleSearchBarClick={handleSearchBarClick} />
                {isSearchBarbClicked && (
                  <>
                    <div className="navbar-searchbar-dropdown">
                      <div>Coming soon...</div>
                    </div>
                  </>
                )}
              </div>
              <div
                className={
                  isLogged && Object.keys(isLogged).length > 0
                    ? "navbar-wrap-2"
                    : "navbar-wrap-2-unauthenticated"
                }
              >
                {/* <NavLink location={location} name="Feed" link="/" /> */}
                <Link className="navbar-navicon" to="/">
                  <div
                    className={
                      isPageHomeDisplay
                        ? "navbar-navicon-name-active-home"
                        : "navbar-navicon-name"
                    }
                  >
                    Feed
                  </div>
                </Link>
                <Link className="navbar-navicon" to="/Launchpad">
                  <div
                    className={
                      isPageLaunchpadDisplay
                        ? "navbar-navicon-name-active-launchpad"
                        : "navbar-navicon-name"
                    }
                  >
                    Launchpad
                  </div>
                </Link>
                {/* <NavLink location={location} name="Launchpad" link="/Launchpad" /> */}
                {isLogged && Object.keys(isLogged).length > 0 ? (
                  <div className="navbar-wrap-2-subwrap-navicon-and-navprofile">
                    <div className="navbar-wrap-2-navicon-wrap">
                      <div className="navbar-vertical"></div>
                      <NavIcon
                        isNotificationsRead={isNotificationsRead}
                        // handleNotificationPopup={handleNotificationPopup}
                        src={notification}
                      />
                      <div className="navbar-vertical"></div>
                    </div>
                    <NavProfile
                      userInfo={isLogged}
                      // isProfileClicked={isProfileClicked}
                      src={isLogged.profile_avatar}
                      web3auth={web3auth}
                    />
                  </div>
                ) : (
                  <div className="navbar-wrap-2-subwrap-sign">
                    <div className="navbar-wrap-2-subwrap-sign-up-button">
                      <Button
                        onClick={handleSignUpButtonClick}
                        text="S'inscrire"
                        style={NavbarButtonStyle.signUp}
                        customMediaQueries={customNavbarButtonMediaQueries}
                      />
                    </div>
                    <div className="navbar-wrap-2-subwrap-sign-in-button">
                      <Button
                        onClick={handleSignInButtonClick}
                        text="Se connecter"
                        style={NavbarButtonStyle.signIn}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
      {isNotificationButtonClicked && (
        <Modal
          setState={setIsNotificationButtonClicked}
          style={{ top: "24px", right: "20px" }}
        >
          <NotificationPopUp notificationPopUpComponent={true} />
        </Modal>
      )}
      {isSignUpButtonClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          // setState={setIsSignUpButtonClicked}
          handleSignupPopupDisplay={handleSignupPopupDisplay}
          // quitModalWithCrossOnly={true}
          style={{ top: "20px", right: "20px", zIndex: "9999" }}
        >
          <Signup
            web3auth={web3auth}
            setWeb3auth={setWeb3auth}
            handlePopoUpSignUpSignInClick={handlePopoUpSignUpSignInClick}
            setIsSignUpButtonClicked={setIsSignUpButtonClicked}
            setIsUserLogged={setIsUserLogged}
          />
        </Modal>
      )}
      {isSignInButtonClicked && (
        <Modal
          style={{ top: "20px", right: "20px", zIndex: "9999" }}
          handleSignupPopupDisplay={handleSignInPopupDisplay}
          // quitModalWithCrossOnly={true}
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
        >
          <PopUpSignIn
            web3auth={web3auth}
            setWeb3auth={setWeb3auth}
            handlePopoUpSignInSignUpClick={handlePopoUpSignInSignUpClick}
            setIsSignInButtonClicked={setIsSignInButtonClicked}
            checkWalletProvider={checkWalletProvider}
          />
        </Modal>
      )}
    </>
  );
};
export default Navbar;

const customNavbarMediaQueries =
  "@media (max-width: 1200px) {.searchbar-input{width: 438px;}.navbar-wrap-1 {width: 600px;}} @media (max-width: 1139px) {.navbar-wrap-2-unauthenticated{width: 384px;}.navbar-wrap-1 { width: 500px;}.searchbar-input{width: 330px;}} @media (max-width: 1048px) {.navbar-wrap-1 {width: 450px;}.searchbar-input{width: 290px;}} @media (max-width: 940px) {.navbar-wrap {width: 95%;}.navbar-wrap-1 {width: 450px;}.searchbar-input{width: 290px;}} @media (max-width: 886px) {.navbar-wrap {width: 98%;}} @media (max-width: 860px) {.navbar-wrap-2-unauthenticated{width:350px;}} @media (max-width: 825px) {.navbar-wrap-2-unauthenticated{width:320px;}}";
const customNavbarButtonMediaQueries =
  "@media (max-width: 860px) {.button-component{width:100px !important;}} @media (max-width: 860px) {.button-component{width:90px !important;}}";

const NavbarButtonStyle = {
  signUp: {
    backgroundColor: "white",
    border: "1px solid #F6D463",
    width: "117px",
    height: "40px",
    borderRadius: "5px",
    fontFamily: "Britanica-Heavy",
    fontSize: "16px",
  },
  signIn: {
    backgroundColor: "#F6D463",
    border: "1px solid #F6D463",
    width: "117px",
    height: "40px",
    borderRadius: "5px",
    fontFamily: "Britanica-Heavy",
    fontSize: "16px",
  },
};

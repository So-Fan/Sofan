import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import sofanLogo from "./Assets/Image/sofanlogo.svg";
import UserProfilePage from "./Pages/UserProfilePage/UserProfilePage";
import Test from "./Pages/Test/Test";
import AthleteProfilePage from "./Pages/AthleteProfilePage/AthleteProfilePage";
import LoginSignUpScreen from "./Pages/LoginSignUpPage/LoginSignUpScreen";
import NftCollection from "./Pages/NftCollection/NftCollection";
import NftSingle from "./Pages/NftSingle/NftSingle";
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage/SignUpAthletePage";
import LaunchpadCollectionLive from "./Pages/LaunchpadCollectionLive/LaunchpadCollectionLive";
import LaunchpAll from "./Pages/LaunchpadAll/LaunchpadAll";
import Dashboard from "./Pages/Dashboard/Dashboard";
import EthProvider from "./contexts/EthContext/EthProvider";
import TestSecondary from "./Pages/Test/TestSecondary";
import CGU from "./Pages/CGU/CGU";
import UserContext from "./contexts/UserContext/UserContext";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import FullPagePost from "./Pages/FullPagePost/FullPagePost";
import FullPagePostPage from "./Pages/FullPagePostPage/FullPagePostPage";
import Signup from "./Components/LoginSignupPopUp/Signup";
import Login from "./Components/PopUpSignIn/PopUpSignIn";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [localWeb3authProvider, setLocalWeb3authProvider] = useState(null);
  const [web3auth, setWeb3auth] = useState(null);
  const [isSignupCompleted, setIsSignupCompleted] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Save loggedInUser to localStorage when it changes
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
    // console.log(loggedInUser);
  }, [loggedInUser]);

  const [isNotificationButtonClicked, setIsNotificationButtonClicked] =
    useState(false);
  const [isDropDownButtonClicked, setIsDropDownButtonClicked] = useState(false);
  const [
    isLiveLaunchSportDropdownClicked,
    setIsLiveLaunchSportDropdownClicked,
  ] = useState(false);
  const [
    isUpcomingLaunchSportDropdownClicked,
    setIsUpcomingLaunchSportDropdownClicked,
  ] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [
    isUSerProfileSeortBySelectorClicked,
    setIsUSerProfileSeortBySelectorClicked,
  ] = useState(false);
  const [dataPost, setPostData] = useState([]);
  const [isDropdownClicked, setIsDropdownClicked] = useState();
  const [isSignUpButtonClicked, setIsSignUpButtonClicked] = useState(false);
  const [isSignInButtonClicked, setIsSignInButtonClicked] = useState(false);
  // const [profileSubMenuOffresClicked, setProfileSubMenuOffresClicked] =
  //   useState(false);
  function handleClickOutside(e) {
    // Navbar
    if (e.target.id === "navbar-user-profile-img") {
      setIsProfileClicked(!isProfileClicked);
    } else {
      setIsProfileClicked(false);
    }
    // Dropdown
    if (isDropdownClicked) {
      for (let i = 0; i < dataPost.length; i++) {
        // console.log(dataPost[i]);
        if (dataPost[i].isDropdownClicked === true) {
          // console.log("je suis ici");
          const newData = [...dataPost];
          newData[i].isDropdownClicked = false;
          setPostData(newData);
          setIsDropdownClicked(false);
        }
      }
    }
    // Profile Page Sort by selector
    if (e.target.id !== "sortbyselector-component") {
      setIsUSerProfileSeortBySelectorClicked(false);
    }
    // Athlete Profile SubMenu Offers
    if (
      e.target.id !== "profilesubmenu-offres" &&
      e.target.id !== "profilesubmenu-offres-formulées" &&
      e.target.id !== "profilesubmenu-offres-reçues"
    ) {
      // console.log(e.target.id);
      // setProfileSubMenuOffresClicked(false);
    }
    // click outside for launchpad all page - live launch part
    if (
      e.target.className === "launchpadalllivelaunches-top-wrap-dropdown" ||
      e.target.className ===
        "launchpadalllivelaunches-top-wrap-dropdown launchpadalllivelaunches-top-wrap-dropdown-clicked" ||
      e.target.id === "launchpadalllivelaunches-dropdown-main" ||
      e.target.id === "launchpadalllivelaunches-dropdown-img" ||
      e.target.id === "launchpadalllivelaunches-dropdown-span"
    ) {
      setIsLiveLaunchSportDropdownClicked(!isLiveLaunchSportDropdownClicked);
    } else {
      setIsLiveLaunchSportDropdownClicked(false);
    }
    // click outside for launchpad all page - upcoming launch part
    if (
      e.target.id === "launchpadallupcominglaunches-dropdown-span" ||
      e.target.className ===
        "launchpadallupcominglaunches-top-wrap-dropdown launchpadallupcominglaunches-top-wrap-dropdown-clicked" ||
      e.target.id === "launchpadallupcominglaunches-dropdown-img" ||
      e.target.id === "launchpadallupcominglaunches-dropdown-main"
    ) {
      setIsUpcomingLaunchSportDropdownClicked(
        !isUpcomingLaunchSportDropdownClicked
      );
    } else {
      setIsUpcomingLaunchSportDropdownClicked(false);
    }
    // console.log(e.target.id)
  }
  // Redirection smooth au chargement de la page
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  }, []);

  const checkWalletProvider = (userData) => {
    if (userData.web3AuthWallet) {
      return "web3auth";
    } else if (userData.metamask) {
      return "metamask";
    } else if (userData.coinbase) {
      return "coinbase";
    } else if (userData.walletConnet) {
      return "walletConnet";
    } else {
      return null;
    }
  };

  //
  function handleNotificationPopup(e) {
    setIsNotificationButtonClicked(true);
  }
  useEffect(() => {
    if (loggedInUser?.username !== undefined) {
      setIsSignupCompleted(true);
    }
  }, [loggedInUser]);
  const handlePopoUpSignUpSignInClick = () => {
    setIsSignUpButtonClicked(false);
    setIsSignInButtonClicked(true);
  };
  const handlePopoUpSignInSignUpClick = () => {
    setIsSignInButtonClicked(false);
    setIsSignUpButtonClicked(true);
  };
  console.log(loggedInUser);
  const ref = useRef([]);
  const [items, set] = useState([]);
  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      // color: "#8fa5b6",
      color: "#8fa5b6",
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#28d79f" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [
      // { color: "#c23369" },
      { color: "#c23369" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    // update: { color: "#28b4d7" },
    update: { color: "#f6d463" },
  });

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(setTimeout(() => set(["NFTs", "Sofan", ""]), 2000));
    ref.current.push(setTimeout(() => set(["NFTs", "Sport"]), 5000));
    ref.current.push(setTimeout(() => set(["NFTs", "Sofan", "Passion"]), 8000));
  }, []);

  useEffect(() => {
    reset();
    return () => ref.current.forEach(clearTimeout);
  }, []);
  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        localWeb3authProvider,
        setLocalWeb3authProvider,
      }}
    >
      <BrowserRouter>
        <EthProvider setWeb3auth={setWeb3auth}>
          {isSignupCompleted === false ? (
            <>
              <div className="app-sofan-block-access-container">
                <div className="app-sofan-block-access-wrap">
                  <div className="app-sofan-block-access-subwrap">
                    <div className="app-sofan-block-access-sofan-logo-container">
                      <img src={sofanLogo} alt="" />
                    </div>
                    <div className="app-sofan-block-access-title">
                      Rejoignez la communauté Sofan !
                    </div>
                    <div className="app-sofan-block-access-img-and-button-container">
                      <div className="app-sofan-block-access-img-container">
                        <div className="app-sofan-block-acces-animation-container">
                          {transitions(({ innerHeight, ...rest }, item) => (
                            <animated.div
                              className="transitionsItem"
                              style={rest}
                              onClick={reset}
                            >
                              <animated.div
                                style={{
                                  overflow: "hidden",
                                  height: innerHeight,
                                }}
                              >
                                {item}
                              </animated.div>
                            </animated.div>
                          ))}
                        </div>
                      </div>
                      <div className="app-sofan-block-access-login-signup-container">
                        <div className="app-sofan-block-access-login-container">
                          {isSignInButtonClicked ? (
                            <>
                              <Login
                                handlePopoUpSignInSignUpClick={
                                  handlePopoUpSignInSignUpClick
                                }
                                setWeb3auth={setWeb3auth}
                                web3auth={web3auth}
                                checkWalletProvider={checkWalletProvider}
                              />
                            </>
                          ) : (
                            <>
                              <Signup
                                web3auth={web3auth}
                                setWeb3auth={setWeb3auth}
                                handlePopoUpSignUpSignInClick={
                                  handlePopoUpSignUpSignInClick
                                }
                                setIsSignUpButtonClicked={
                                  setIsSignUpButtonClicked
                                }
                                setIsSignupCompleted={setIsSignupCompleted}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="socials-network-waiting-page">
                  Restez au courant en nous suivant sur les réseaux sociaux !
                  <div className="logo-socials-waiting-page">
                    <svg
                      className="svg-socials-waiting-page"
                      viewBox="0 0 512 512"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
                    <svg
                      className="svg-socials-waiting-page"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                    </svg>
                    <svg
                      className="svg-socials-waiting-page"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                    <svg
                      className="svg-socials-waiting-page"
                      viewBox="0 0 496 512"
                    >
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div
            // style={!loggedInUser?.username ? { filter: "blur(17px)" } : {}}
            className="App"
            onClick={handleClickOutside}
          >
            <></>
            <Navbar
              isNotificationButtonClicked={isNotificationButtonClicked}
              handleNotificationPopup={handleNotificationPopup}
              setIsNotificationButtonClicked={setIsNotificationButtonClicked}
              isProfileClicked={isProfileClicked}
              isLogged={loggedInUser}
              web3auth={web3auth}
              setWeb3auth={setWeb3auth}
              checkWalletProvider={checkWalletProvider}
              setIsSignupCompleted={setIsSignupCompleted}
            />

            <Routes>
              <Route
                path="/userprofile/:id"
                element={
                  <UserProfilePage
                    setIsUSerProfileSeortBySelectorClicked={
                      setIsUSerProfileSeortBySelectorClicked
                    }
                    isUSerProfileSeortBySelectorClicked={
                      isUSerProfileSeortBySelectorClicked
                    }
                    // profileSubMenuOffresClicked={profileSubMenuOffresClicked}
                    // setProfileSubMenuOffresClicked={
                    //   setProfileSubMenuOffresClicked
                    // }
                    userProfileLogged={loggedInUser}
                  />
                }
              />
              <Route
                index
                element={
                  <Home
                    loggedInUser={loggedInUser}
                    isDropDownButtonClicked={isDropDownButtonClicked}
                    setIsDropDownButtonClicked={setIsDropDownButtonClicked}
                    dataPost={dataPost}
                    setPostData={setPostData}
                    setIsDropdownClicked={setIsDropdownClicked}
                    isLogged={loggedInUser}
                    handleNotificationPopup={handleNotificationPopup}
                    isNotificationButtonClicked={isNotificationButtonClicked}
                    setIsNotificationButtonClicked={
                      setIsNotificationButtonClicked
                    }
                  />
                }
              />
              <Route
                path="/post/:id"
                element={
                  <FullPagePostPage
                    isLogged={loggedInUser}
                    dataPost={dataPost}
                  />
                }
              />
              <Route
                path="/athleteprofile/:id"
                element={
                  <AthleteProfilePage
                    setIsUSerProfileSeortBySelectorClicked={
                      setIsUSerProfileSeortBySelectorClicked
                    }
                    isUSerProfileSeortBySelectorClicked={
                      isUSerProfileSeortBySelectorClicked
                    }
                    // profileSubMenuOffresClicked={profileSubMenuOffresClicked}
                    // setProfileSubMenuOffresClicked={
                    //   setProfileSubMenuOffresClicked
                    // }
                  />
                }
              />
              <Route path="/nftcollection" element={<NftCollection />} />
              <Route
                path="/nftsingle/:contractAddress/:nftId"
                element={<NftSingle />}
              />
              <Route path="signupathlete" element={<SignUpAthletePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/test" element={<Test />} />
              <Route path="/testsecondary" element={<TestSecondary />} />
              <Route
                path="/login"
                element={
                  <LoginSignUpScreen
                    web3auth={web3auth}
                    setWeb3auth={setWeb3auth}
                  />
                }
              />
              <Route
                path="/collectionlive/:id/:collectionAddress"
                element={<LaunchpadCollectionLive isLogged={loggedInUser} />}
              />
              <Route
                path="/launchpad"
                element={
                  <LaunchpAll
                    isLiveLaunchSportDropdownClicked={
                      isLiveLaunchSportDropdownClicked
                    }
                    setIsLiveLaunchSportDropdownClicked={
                      setIsLiveLaunchSportDropdownClicked
                    }
                    isUpcomingLaunchSportDropdownClicked={
                      isUpcomingLaunchSportDropdownClicked
                    }
                    setIsUpcomingLaunchSportDropdownClicked={
                      setIsUpcomingLaunchSportDropdownClicked
                    }
                  />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cgu" element={<CGU />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </div>
          <section className="error-mobile-waiting-page">
            <img src={sofanLogo} alt="" />
            <div>
              Oops, SoFan n'est pas conçu pour mobile, veuillez passer sur
              ordinateur ou agrandissez votre fenêtre.
            </div>
            <div className="socials-network-waiting-page">
              Restez au courant en nous suivant sur les réseaux sociaux !
              <div className="logo-socials-waiting-page">
                <svg className="svg-socials-waiting-page" viewBox="0 0 512 512">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
                <svg className="svg-socials-waiting-page" viewBox="0 0 448 512">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
                <svg className="svg-socials-waiting-page" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
                <svg className="svg-socials-waiting-page" viewBox="0 0 496 512">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </div>
            </div>
          </section>
        </EthProvider>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

import React, { useState, useCallback, useEffect } from "react";
import Button from "../Button/Button";
import "./ProfileSubMenu.css";
import Arrow from "../../Assets/Image/arrow_bottom.svg";
const ProfileSubMenu = ({
  isProfileSubMenuButtonClicked,
  setIsProfileSubMenuButtonClicked,
  isPageAthlete,
  // profileSubMenuOffresClicked,
  // setProfileSubMenuOffresClicked,
  isNftCollectionPage,
}) => {
  const [profileSubMenuOffresClicked, setProfileSubMenuOffresClicked] =
    useState(false);

  const handleOutsideProfileSubMenuClick = (e) => {
    if (
      e.target.id !== "profilesubmenu-offres" &&
      e.target.id !== "profilesubmenu-offres-formulées" &&
      e.target.id !== "profilesubmenu-offres-reçues" &&
      profileSubMenuOffresClicked
    ) {
      setProfileSubMenuOffresClicked(false);
    }
  };

  useEffect(() => {
    if (profileSubMenuOffresClicked) {
      window.addEventListener("click", handleOutsideProfileSubMenuClick);
    }
    if (!profileSubMenuOffresClicked) {
      // console.log("remove Listener");
      window.removeEventListener("click", handleOutsideProfileSubMenuClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideProfileSubMenuClick);
    };
  }, [profileSubMenuOffresClicked]);

  const handleProfileSubMenuOffresButtonClicked = (e) => {
    e.preventDefault();
    setProfileSubMenuOffresClicked(!profileSubMenuOffresClicked);
  };
  const [profileSubMenuOffersChoice, setprofileSubMenuOffersChoice] =
    useState("");
  const handleProfileSubMenuChoiceSpanClicked = (e) => {
    if (e.target.innerHTML === "Offres formulées") {
      setprofileSubMenuOffersChoice(e.target.innerHTML);
      setIsProfileSubMenuButtonClicked([
        false,
        false,
        true,
        false,
        false,
        false,
        false,
      ]);
      setProfileSubMenuOffresClicked(false);
    } else if (e.target.innerHTML === "Offres reçues") {
      setprofileSubMenuOffersChoice(e.target.innerHTML);
      setIsProfileSubMenuButtonClicked([
        false,
        false,
        false,
        true,
        false,
        false,
        false,
      ]);
      setProfileSubMenuOffresClicked(false);
    }
  };

  const handleProfileSubMenuButtonClicked = (e) => {
    if (isPageAthlete === false) {
      if (e.target.innerHTML === "NFT détenus") {
        setIsProfileSubMenuButtonClicked([true, false, false, false]);
      } else if (e.target.innerHTML === "Activité") {
        setIsProfileSubMenuButtonClicked([false, true, false, false]);
      } else if (e.target.innerHTML === "Offres formulées") {
        setIsProfileSubMenuButtonClicked([false, false, true, false]);
      } else if (e.target.innerHTML === "Offres reçues") {
        setIsProfileSubMenuButtonClicked([false, false, false, true]);
      }
    } else {
      if (
        (e.target.innerHTML === "NFT détenus" ||
          e.target.innerHTML === "NFT") &&
        isProfileSubMenuButtonClicked[0] !== true
      ) {
        setIsProfileSubMenuButtonClicked([
          true,
          false,
          false,
          false,
          false,
          false,
          false,
        ]);
      } else if (
        e.target.innerHTML === "Activité" &&
        isProfileSubMenuButtonClicked[1] !== true
      ) {
        setIsProfileSubMenuButtonClicked([
          false,
          true,
          false,
          false,
          false,
          false,
          false,
        ]);
      } else if (
        e.target.innerHTML === "Offres formulées" &&
        isProfileSubMenuButtonClicked[2] !== true
      ) {
        setIsProfileSubMenuButtonClicked([
          false,
          false,
          true,
          false,
          false,
          false,
          false,
        ]);
        setProfileSubMenuOffresClicked(true);
      } else if (
        e.target.innerHTML === "Offres reçues" &&
        isProfileSubMenuButtonClicked[3] !== true
      ) {
        setIsProfileSubMenuButtonClicked([
          false,
          false,
          false,
          true,
          false,
          false,
          false,
        ]);
        setProfileSubMenuOffresClicked(true);
      } else if (
        e.target.innerHTML === "Feed" &&
        isProfileSubMenuButtonClicked[4] !== true
      ) {
        setIsProfileSubMenuButtonClicked([
          false,
          false,
          false,
          false,
          true,
          false,
          false,
        ]);
      } else if (
        e.target.innerHTML === "NFT Collections" &&
        isProfileSubMenuButtonClicked[5] !== true
      ) {
        setIsProfileSubMenuButtonClicked([
          false,
          false,
          false,
          false,
          false,
          true,
          false,
        ]);
      } else if (
        e.target.innerHTML === "Events" &&
        isProfileSubMenuButtonClicked[6] !== true
      ) {
        setIsProfileSubMenuButtonClicked([
          false,
          false,
          false,
          false,
          false,
          false,
          true,
        ]);
      }
    }
    //
  };

  return (
    <div className="profileSubMenu-component">
      {/* ============================= */}
      {isPageAthlete === true && (
        <>
          <div
            className={
              isProfileSubMenuButtonClicked[4]
                ? "profilesubmenu-wrap-clicked profilesubmenu-wrap"
                : "profilesubmenu-wrap"
            }
          >
            <Button
              onClick={handleProfileSubMenuButtonClicked}
              text="Feed"
              style={
                isProfileSubMenuButtonClicked[4]
                  ? ProfileSubMenuButtonStyle.stylingClicked
                  : ProfileSubMenuButtonStyle.stylingNotClicked
              }
            />
          </div>
          <div
            className={
              isProfileSubMenuButtonClicked[5]
                ? "profilesubmenu-wrap-clicked profilesubmenu-wrap"
                : "profilesubmenu-wrap"
            }
          >
            <Button
              onClick={handleProfileSubMenuButtonClicked}
              text="NFT Collections"
              style={
                isProfileSubMenuButtonClicked[5]
                  ? ProfileSubMenuButtonStyle.stylingClicked
                  : ProfileSubMenuButtonStyle.stylingNotClicked
              }
            />
          </div>
          {/* <div
            className={
              isProfileSubMenuButtonClicked[6]
                ? "profilesubmenu-wrap-clicked profilesubmenu-wrap"
                : "profilesubmenu-wrap"
            }
          >
            <Button
              onClick={handleProfileSubMenuButtonClicked}
              text="Events"
              style={
                isProfileSubMenuButtonClicked[6]
                  ? ProfileSubMenuButtonStyle.stylingClicked
                  : ProfileSubMenuButtonStyle.stylingNotClicked
              }
            />
          </div> */}
        </>
      )}
      {/* ============================= */}
      <div
        className={
          isProfileSubMenuButtonClicked[0]
            ? "profilesubmenu-wrap-clicked profilesubmenu-wrap"
            : "profilesubmenu-wrap"
        }
      >
        <Button
          onClick={handleProfileSubMenuButtonClicked}
          text={isNftCollectionPage ? "NFT" : "NFT détenus"}
          style={
            isProfileSubMenuButtonClicked[0]
              ? ProfileSubMenuButtonStyle.stylingClicked
              : ProfileSubMenuButtonStyle.stylingNotClicked
          }
        />
      </div>
      <div
        className={
          isProfileSubMenuButtonClicked[1]
            ? "profilesubmenu-wrap-clicked profilesubmenu-wrap"
            : "profilesubmenu-wrap"
        }
      >
        <Button
          onClick={handleProfileSubMenuButtonClicked}
          text="Activité"
          style={
            isProfileSubMenuButtonClicked[1]
              ? ProfileSubMenuButtonStyle.stylingClicked
              : ProfileSubMenuButtonStyle.stylingNotClicked
          }
        />
      </div>
      {/*  */}
      <>
        {isNftCollectionPage ? (
          <></>
        ) : (
          <>
            {/* {profileSubMenuOffersChoice !== "Offres formulées" &&
              profileSubMenuOffersChoice !== "Offres reçues" && (
                <div
                  onClick={handleProfileSubMenuOffresButtonClicked}
                  id="profilesubmenu-offres"
                  className="profilesubmenu-wrap profilesubmenu-offres profilesubmenu-arrow-wrap"
                >
                  <Button
                    // onClick={handleProfileSubMenuOffresButtonClicked}
                    text="Offres"
                    style={ProfileSubMenuButtonStyle.stylingNotClicked}
                    id="profilesubmenu-offres"
                  />
                  <img
                    id="profilesubmenu-offres"
                    onClick={handleProfileSubMenuOffresButtonClicked}
                    src={Arrow}
                    alt="Arrow bottom"
                  />
                  <div
                    className={
                      profileSubMenuOffresClicked
                        ? "profilesubmenu-offres-dropdown-clicked"
                        : "profilesubmenu-offres-dropdown"
                    }
                  >
                    <span onClick={handleProfileSubMenuChoiceSpanClicked}>
                      Offres formulées
                    </span>
                    <span onClick={handleProfileSubMenuChoiceSpanClicked}>
                      Offres reçues
                    </span>
                  </div>
                </div>
              )}
            {profileSubMenuOffersChoice === "Offres formulées" && (
              <div
                onClick={handleProfileSubMenuOffresButtonClicked}
                id="profilesubmenu-offres"
                className={
                  isProfileSubMenuButtonClicked[2]
                    ? "profilesubmenu-wrap-clicked profilesubmenu-wrap profilesubmenu-arrow-wrap profilesubmenu-offres"
                    : "profilesubmenu-wrap profilesubmenu-arrow-wrap profilesubmenu-offres"
                }
              >
                <Button
                  onClick={handleProfileSubMenuButtonClicked}
                  text="Offres formulées"
                  style={
                    isProfileSubMenuButtonClicked[2]
                      ? ProfileSubMenuButtonStyle.stylingClicked
                      : ProfileSubMenuButtonStyle.stylingNotClicked
                  }
                  id="profilesubmenu-offres-formulées"
                />
                <img
                  onClick={handleProfileSubMenuOffresButtonClicked}
                  id="profilesubmenu-offres"
                  src={Arrow}
                  alt="Arrow bottom"
                />
                <div
                  className={
                    profileSubMenuOffresClicked
                      ? "profilesubmenu-offres-dropdown-clicked"
                      : "profilesubmenu-offres-dropdown"
                  }
                >
                  <span onClick={handleProfileSubMenuChoiceSpanClicked}>
                    Offres formulées
                  </span>
                  <span onClick={handleProfileSubMenuChoiceSpanClicked}>
                    Offres reçues
                  </span>
                </div>
              </div>
            )}
            {profileSubMenuOffersChoice === "Offres reçues" && (
              <div
                onClick={handleProfileSubMenuOffresButtonClicked}
                id="profilesubmenu-offres"
                className={
                  isProfileSubMenuButtonClicked[3]
                    ? "profilesubmenu-wrap-clicked profilesubmenu-wrap profilesubmenu-arrow-wrap profilesubmenu-offres"
                    : "profilesubmenu-wrap profilesubmenu-arrow-wrap profilesubmenu-offres"
                }
              >
                <Button
                  onClick={handleProfileSubMenuButtonClicked}
                  text="Offres reçues"
                  style={
                    isProfileSubMenuButtonClicked[3]
                      ? ProfileSubMenuButtonStyle.stylingClicked
                      : ProfileSubMenuButtonStyle.stylingNotClicked
                  }
                  id="profilesubmenu-offres-reçues"
                />
                <img
                  onClick={handleProfileSubMenuOffresButtonClicked}
                  id="profilesubmenu-offres"
                  src={Arrow}
                  alt="Arrow bottom"
                />
                <div
                  className={
                    profileSubMenuOffresClicked
                      ? "profilesubmenu-offres-dropdown-clicked"
                      : "profilesubmenu-offres-dropdown"
                  }
                >
                  <span onClick={handleProfileSubMenuChoiceSpanClicked}>
                    Offres formulées
                  </span>
                  <span onClick={handleProfileSubMenuChoiceSpanClicked}>
                    Offres reçues
                  </span>
                </div>
              </div>
            )} */}
          </>
        )}
      </>
    </div>
  );
};

export default ProfileSubMenu;

const ProfileSubMenuButtonStyle = {
  stylingNotClicked: {
    backgroundColor: "transparent",
    border: "none",
    height: "100%",
    fontFamily: "Britanica-Heavy",
    fontSize: "20px",
    fontWeight: "400",
    opacity: "0.5",
  },
  stylingClicked: {
    backgroundColor: "transparent",
    border: "none",
    height: "100%",
    fontFamily: "Britanica-Heavy",
    fontSize: "20px",
    fontWeight: "400",
    opacity: "1",
  },
  //   pseudoClasses:
  //     ".button-component:hover{border-bottom: 4px solid #F8DB4A !important}",
};

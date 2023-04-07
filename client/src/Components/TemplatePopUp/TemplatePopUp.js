import React, { useState, useEffect } from "react";
import "./TemplatePopUp.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
function TemplatePopUp({
  handleClick,
  athleteSuggestPopUp,
  athleteFollowingSupportingPopUp,
  dataAthleteProfilePageConcat,
}) {
  const [
    isNotificationPopUpSubMenuReadClicked,
    setIsNotificationPopUpSubMenuReadClicked,
  ] = useState(false);

  const handleNotificationPopUpSubMenuClicked = (e) => {
    if (athleteFollowingSupportingPopUp === true) {
      if (e.target.innerHTML === "Athlètes suivis") {
        setIsNotificationPopUpSubMenuReadClicked(true)  
      } else {
        setIsNotificationPopUpSubMenuReadClicked(false)
      }
    } 
    // ======================================
    if (e.target.innerHTML === "Lus") {
      setIsNotificationPopUpSubMenuReadClicked(true);
    } else if (e.target.innerHTML === "Non lus") {
      setIsNotificationPopUpSubMenuReadClicked(false);
    }
  };
  // console.log(athleteSuggestPopUp)
  // console.log(athleteFollowingSupportingPopUp)
  // console.log(isNotificationPopUpSubMenuReadClicked)
  return (
    <>
      <div className="notificationpopup-component">
        <span>
          {athleteSuggestPopUp ? (
            <>Suggestion d'athlètes</>
          ) : athleteFollowingSupportingPopUp ? (
            <>Athlètes suivis</>
          ) : (
            <>Notifications</>
          )}
        </span>
        <div className="notificationpopup-container">
          {athleteSuggestPopUp ? (
            <></>
          ) : (
            <>
              <div className="notificationpopup-container-submenu-wrap">
                <div
                  className={
                    isNotificationPopUpSubMenuReadClicked
                      ? "notificationpopup-container-submenu-subwrap"
                      : "notificationpopup-container-submenu-subwrap notificationpopup-container-submenu-subwrap-clicked"
                  }
                >
                  <Button
                    onClick={handleNotificationPopUpSubMenuClicked}
                    text={athleteFollowingSupportingPopUp ? "Athlètes supportés" : "Non lus"}
                  />
                </div>
                <div
                  className={
                    isNotificationPopUpSubMenuReadClicked
                      ? "notificationpopup-container-submenu-subwrap notificationpopup-container-submenu-subwrap-clicked"
                      : "notificationpopup-container-submenu-subwrap"
                  }
                >
                  <Button
                    onClick={handleNotificationPopUpSubMenuClicked}
                    text={athleteFollowingSupportingPopUp ? "Athlètes suivis" : "Lus"}
                  />
                </div>
              </div>
            </>
          )}

          {isNotificationPopUpSubMenuReadClicked ? (
            <div className="notificationpopup-container-mapping-wrap">
              {dataAthleteProfilePageConcat?.notifications.read.map(
                (notification) => (
                  <Link
                    to={`/user/${notification.userId}`}
                    className="notificationpopup-container-notification-wrap"
                  >
                    <img
                      src={notification.profilePicture}
                      alt="Sender notification profile"
                    />
                    <div className="notificationpopup-container-notification-wrap-content-wrap">
                      <div className="notificationpopup-container-notification-wrap-content-subwrap">
                        <span>{notification.username} </span>
                        <span>{notification.textTypeOffer} </span>
                        <span>{notification.nftTitle}</span>
                      </div>
                      <span>{notification.time}</span>
                    </div>
                  </Link>
                )
              )}
            </div>
          ) : (
            <div className="notificationpopup-container-mapping-wrap">
              {dataAthleteProfilePageConcat?.notifications.unread.map(
                (notification) => (
                  <Link
                    to={`/user/${notification.userId}`}
                    className="notificationpopup-container-notification-wrap"
                  >
                    <img
                      src={notification.profilePicture}
                      alt="Sender notification profile"
                    />
                    <div className="notificationpopup-container-notification-wrap-content-wrap">
                      <div className="notificationpopup-container-notification-wrap-content-subwrap">
                        <span>{notification.username} </span>
                        <span>{notification.sport} </span>
                        <span>{notification.nftTitle}</span>
                      </div>
                      <span>{notification.time}</span>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
        <div className="template-pop-up-line-separation"></div>
        <Button text="Fermer" onClick={handleClick} />
      </div>
      {(dataAthleteProfilePageConcat?.notifications.unread.length > 5 ||
        dataAthleteProfilePageConcat?.notifications.unread.length > 5) && (
        <style>
          {`
        .notificationpopup-container > div > a:nth-last-child(1){
             border: none !important;
            }
        `}
        </style>
      )}
    </>
  );
}

export default TemplatePopUp;

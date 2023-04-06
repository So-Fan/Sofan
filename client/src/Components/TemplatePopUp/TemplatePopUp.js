import React, { useState, useEffect } from "react";
import "./TemplatePopUp.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
function TemplatePopUp({ handleClick, athleteSuggestPopUp, dataAthleteProfilePageConcat }) {
  const [
    isNotificationPopUpSubMenuReadClicked,
    setIsNotificationPopUpSubMenuReadClicked,
  ] = useState(false);

  const handleNotificationPopUpSubMenuClicked = (e) => {
    if (e.target.innerHTML === "Read") {
      setIsNotificationPopUpSubMenuReadClicked(true);
    } else {
      setIsNotificationPopUpSubMenuReadClicked(false);
    }
  };

  return (
    <>
      <div className="notificationpopup-component">
        
        <span>
          {athleteSuggestPopUp ? <>Suggestion d'athlètes</> : <>Notifications</> }
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
                    text="Unread"
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
                    text="Read"
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

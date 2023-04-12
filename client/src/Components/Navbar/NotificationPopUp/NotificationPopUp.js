import React, { useState, useEffect } from "react";
import "./NotificationPopUp.css";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
const NotificationPopUp = ({ handleClick, notificationPopUpComponent }) => {
  // console.log(notificationPopUpComponent)
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
  const [dataAthleteProfilePageConcat, setDataAthleteProfilePageConcat] =
    useState();

  useEffect(() => {
    const data = {
      user: "Romain Attanasio",
      notifications: {
        read: [
          {
            username: "DonOfSomething",
            userId: "1",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            textTypeOffer: "has made an offer on your NFT",
            nftTitle: "Vip Meeting with 1200 holders.",
            time: "24 mins ago",
          },
          {
            username: "DonOfSomething",
            userId: "2",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            textTypeOffer: "has made an offer on your NFT",
            nftTitle: "Vip Meeting with 1200 holders.",
            time: "24 mins ago",
          },
        ],
        unread: [
          {
            username: "DonOfSomething",
            userId: "3",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            textTypeOffer: "has made an offer on your NFT",
            nftTitle: "Vip Meeting with 1200 holders.",
            time: "24 mins ago",
          },
          {
            username: "JOSEPH",
            userId: "4",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            textTypeOffer: "has made an offer on your NFT",
            nftTitle: "Vip Meeting with 1200 holders.",
            time: "24 mins ago",
          },
          {
            username: "JOSEPH",
            userId: "4",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            textTypeOffer: "has made an offer on your NFT",
            nftTitle: "Vip Meeting with 1200 holders.",
            time: "24 mins ago",
          },
          {
            username: "JOSEPH",
            userId: "4",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            textTypeOffer: "has made an offer on your NFT",
            nftTitle: "Vip Meeting with 1200 holders.",
            time: "24 mins ago",
          },
          {
            username: "JOSEPH",
            userId: "4",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            textTypeOffer: "has made an offer on your NFT",
            nftTitle: "Vip Meeting with 1200 holders.",
            time: "24 mins ago",
          },
          {
            username: "JOSEPH",
            userId: "4",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            textTypeOffer: "has made an offer on your NFT",
            nftTitle: "Vip Meeting with 1200 holders.",
            time: "24 mins ago",
          },
        ],
      },
    };
    setDataAthleteProfilePageConcat(data);
  }, []);
  return (
    <>
      <div className="notificationpopup-component">
        <span>Notification</span>
        <div className="notificationpopup-container">
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
          {isNotificationPopUpSubMenuReadClicked ? (
            <div 
            // style={notificationPopUpComponent ? {maxHeight: "406px !important"}: {}} 
            className={notificationPopUpComponent ? "notificationpopup-container-mapping-wrap-custom": "notificationpopup-container-mapping-wrap"}>
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
            <div 
            
            // style={notificationPopUpComponent ? {maxHeight: "406px !important"}: {}} 
            className={notificationPopUpComponent ? "notificationpopup-container-mapping-wrap-custom": "notificationpopup-container-mapping-wrap"}>
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
                        <span>{notification.textTypeOffer} </span>
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
};

export default NotificationPopUp;

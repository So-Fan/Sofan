import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AthleteSuggestPopUp.css";
import TemplatePopUp from "../TemplatePopUp";
import Button from "../../Button/Button";
function AthleteSuggestPopUp({ suggestionsAthletes, handleClick }) {
  const [dataAthleteProfilePageConcat, setDataAthleteProfilePageConcat] =
    useState();

  useEffect(() => {
    const data = {
      user: "Romain Attanasio",
      notifications: {
        unread: [
          {
            username: "Sasha Lanièce",
            userId: "4",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
          {
            username: "Sasha Lanièce",
            userId: "5",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse",
          },
        ],
      },
    };
    setDataAthleteProfilePageConcat(data);
  }, []);
  return (
    // <TemplatePopUp
    //   athleteSuggestPopUp={true}
    //   dataAthleteProfilePageConcat={dataAthleteProfilePageConcat}
    //   suggestionsAthletes={suggestionsAthletes}
    //   />
    <>
      <div className="athlete-suggest-component">
        <span>Suggestion d'athlètes</span>
        <div className="athlete-suggest-container">
          {suggestionsAthletes.map((notification) => (
            <Link
              to={`/athleteprofile/${notification.id}`}
              className="athlete-suggest-container-athlete-suggest-wrap"
            >
              <img
                src={notification.profile_avatar}
                alt="Sender notification profile"
              />
              <div className="athlete-suggest-container-athlete-suggest-wrap-content-wrap">
                <div className="athlete-suggest-container-athlete-suggest-wrap-content-subwrap">
                  <span>
                    <>{notification.display_name}</>
                  </span>
                  <span style={{ visibility: "hidden" }}>
                    {notification.sport}
                  </span>
                </div>
                <span>{notification.sport}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="athlete-suggest-template-pop-up-line-separation"></div>
        <Button
          text="Fermer"
          id="custom-close-button"
          onClick={handleClick}
          hover="button-hover-props"
        />
        {(suggestionsAthletes.length > 5 || suggestionsAthletes.length > 5) && (
          <style>
            {`
        .notificationpopup-container > div > a:nth-last-child(1){
             border: none !important;
            }
        `}
          </style>
        )}
      </div>
    </>
  );
}

export default AthleteSuggestPopUp;

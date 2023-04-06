import React, { useState, useEffect } from "react";
import "./AthleteSuggestPopUp.css";
import TemplatePopUp from "../TemplatePopUp";
function AthleteSuggestPopUp() {
  let athleteSuggestPopUp = true;
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
            sport: "Skippeuse"
          },
          {
            username: "Sasha Lanièce",
            userId: "5",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse"
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse"
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse"
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse"
          },
          {
            username: "Sasha Lanièce",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeuse"
          },
        ],
      },
    };
    setDataAthleteProfilePageConcat(data);
  }, []);
  return (
    <TemplatePopUp
      athleteSuggestPopUp={athleteSuggestPopUp}
      dataAthleteProfilePageConcat={dataAthleteProfilePageConcat}
    />
  );
}

export default AthleteSuggestPopUp;

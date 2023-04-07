import React, { useState, useEffect } from "react";
import "./AthleteFollowingSupportingPopUp.css";
import AthleteSuggestPopUp from "../AthleteSuggestPopUp/AthleteSuggestPopUp";
import TemplatePopUp from "../TemplatePopUp";
function AthleteFollowingSupportingPopUp() {
  const [dataAthleteProfilePageConcat, setDataAthleteProfilePageConcat] =
    useState();
  // let athleteFollowingSupportingPopUp = true;
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
            username: "Romain Attanasio",
            userId: "4",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "5",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "6",
            profilePicture: "https://i.imgur.com/4eGUfy3.png",
            sport: "Skippeur",
          },
        ],
      },
    };
    setDataAthleteProfilePageConcat(data);
  }, []);
  return (
      <TemplatePopUp
        athleteFollowingSupportingPopUp={true}
        dataAthleteProfilePageConcat={dataAthleteProfilePageConcat}
      />
  );
}

export default AthleteFollowingSupportingPopUp;

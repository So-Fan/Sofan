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
            username: "Romain Attanasio",
            userId: "4",
            profilePicture: "http://www.defi-azimut.net/mediacenter/uploads/xl/portrait-romain-fbw.jpeg",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "4",
            profilePicture: "http://www.defi-azimut.net/mediacenter/uploads/xl/portrait-romain-fbw.jpeg",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "4",
            profilePicture: "http://www.defi-azimut.net/mediacenter/uploads/xl/portrait-romain-fbw.jpeg",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "4",
            profilePicture: "http://www.defi-azimut.net/mediacenter/uploads/xl/portrait-romain-fbw.jpeg",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "4",
            profilePicture: "http://www.defi-azimut.net/mediacenter/uploads/xl/portrait-romain-fbw.jpeg",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "4",
            profilePicture: "http://www.defi-azimut.net/mediacenter/uploads/xl/portrait-romain-fbw.jpeg",
            sport: "Skippeur",
          },
          {
            username: "Romain Attanasio",
            userId: "4",
            profilePicture: "http://www.defi-azimut.net/mediacenter/uploads/xl/portrait-romain-fbw.jpeg",
            sport: "Skippeur",
          },
        ],
        unread: [
          {
            username: "Sacha Lanièce",
            userId: "4",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
            sport: "Skippeur",
          },
          {
            username: "Sacha Lanièce",
            userId: "5",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
            sport: "Skippeur",
          },
          {
            username: "Sacha Lanièce",
            userId: "6",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
            sport: "Skippeur",
          },
          {
            username: "Sacha Lanièce",
            userId: "6",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
            sport: "Skippeur",
          },
          {
            username: "Sacha Lanièce",
            userId: "6",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
            sport: "Skippeur",
          },
          {
            username: "Sacha Lanièce",
            userId: "6",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
            sport: "Skippeur",
          },
          {
            username: "Sacha Lanièce",
            userId: "6",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
            sport: "Skippeur",
          },
          {
            username: "Sacha Lanièce",
            userId: "6",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
            sport: "Skippeur",
          },
          {
            username: "Sacha Lanièce",
            userId: "6",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
            sport: "Skippeur",
          },
          {
            username: "Sacha Lanièce",
            userId: "6",
            profilePicture: "https://media.bateaux.com/bateaux/35474/mini-transat-parcours-gestion-de-projet-4.jpg",
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
        athleteFollowingSupportingPopUpStyle="athlete-following-supporting-popup-container-mapping-wrap"
        dataAthleteProfilePageConcat={dataAthleteProfilePageConcat}
      />
  );
}

export default AthleteFollowingSupportingPopUp;

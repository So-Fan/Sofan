import React, { useState, useEffect } from "react";
import "./AthleteFollowersFansPopUp.css";
import TemplatePopUp from "../TemplatePopUp";
function AthleteFollowersFansPopUp({isAthleteFollowersClicked, isAthleteSupportersClicked}) {
    const [dataAthleteProfilePageConcat, setDataAthleteProfilePageConcat] =
    useState();
  useEffect(() => {
    const data = {
      user: "Romain Attanasio",
      notifications: {
        read: [
          {
            username: "DonOfSomething",
            userId: "4",
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            time: "24min"
          },
          {
            username: "DonOfSomething",
            userId: "4",
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            time: "24min"
          },
          {
            username: "DonOfSomething",
            userId: "4",
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            time: "24min"
          },
          {
            username: "DonOfSomething",
            userId: "4",
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            time: "24min"
          },
          {
            username: "DonOfSomething",
            userId: "4",
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            time: "24min"
          },
          {
            username: "DonOfSomething",
            userId: "4",
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            time: "24min"
          },
          {
            username: "DonOfSomething",
            userId: "4",
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            time: "24min"
          },
        ],
        unread: [
          {
            username: "Gr3foir3",
            userId: "4",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
          {
            username: "Gr3foir3",
            userId: "5",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
          {
            username: "Gr3foir3",
            userId: "6",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
          {
            username: "Gr3foir3",
            userId: "6",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
          {
            username: "Gr3foir3",
            userId: "6",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
          {
            username: "Gr3foir3",
            userId: "6",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
          {
            username: "Gr3foir3",
            userId: "6",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
          {
            username: "Gr3foir3",
            userId: "6",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
          {
            username: "Gr3foir3",
            userId: "6",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
          {
            username: "Gr3foir3",
            userId: "6",
            profilePicture:
              "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/2563.png",
              time: "24min"
          },
        ],
      },
    };
    setDataAthleteProfilePageConcat(data);
  }, []);
  return <TemplatePopUp
    athleteFollowersFansPopUp={true}
    isAthleteFollowersClicked={isAthleteFollowersClicked}
    isAthleteSupportersClicked={isAthleteSupportersClicked}
    athleteFollowersFansPopUpStyle="athlete-following-supporting-popup-container-mapping-wrap"
    dataAthleteProfilePageConcat={dataAthleteProfilePageConcat}
  />;
}

export default AthleteFollowersFansPopUp;

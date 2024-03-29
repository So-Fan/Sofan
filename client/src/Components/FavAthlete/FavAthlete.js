import React, { useState, useEffect } from "react";
import AthleteTemplate from "./AthleteTemplate/AthleteTemplate";
import Carroussel from "./Carroussel/Carroussel";
import "./FavAthlete.css";
import LeBron from "./fakeData/lebron.svg";
import Mbappe from "./fakeData/mbappe.svg";
import FeedSuggestionTemplate from "../FeedSuggestions/FeedSuggestionTemplate/FeedSuggestionTemplate";
import { v4 as uuidv4 } from "uuid";
import useUserCollection from "../../contexts/UserContext/useUserCollection";
const FavAthlete = ({ athletesFollowing, athletesSupportingData }) => {
  const { loggedInUser } = useUserCollection();
  const [isSupportingOrFollowingAthlete, setIsSupportingOrFollowingAthlete] =
    useState();
  const fakeArray = [
    {
      firstName: "James",
      surName: "Lebron",
      img: LeBron,
      imgResponsive: "/img/sergioramos.svg",
      id: 0,
      interaction: 15,
      isFan: false,
      type: "Basketball",
    },
    {
      firstName: "Kylian",
      surName: "Mbappe",
      img: Mbappe,
      imgResponsive: "/img/sergioramos.svg",
      id: 1,
      interaction: 18,
      isFan: true,
      type: "Football",
    },
    {
      firstName: "James2",
      surName: "Lebron2",
      img: LeBron,
      imgResponsive: "/img/sergioramos.svg",
      id: 2,
      interaction: 12,
      isFan: true,
      type: "Basketball",
    },
    {
      firstName: "Kylian2",
      surName: "Mbappe2",
      img: Mbappe,
      imgResponsive: "/img/sergioramos.svg",
      id: 3,
      interaction: 8,
      isFan: false,
      type: "Football",
    },
    {
      firstName: "Kylian3",
      surName: "Mbappe3",
      img: Mbappe,
      imgResponsive: "/img/sergioramos.svg",
      id: 4,
      interaction: 1,
      isFan: false,
      type: "Football",
    },
  ];
  const userFanAthlete = fakeArray.filter((athlete) => athlete.isFan === true);
  const userRecommandationAthlete = fakeArray.filter(
    (athlete) => athlete.isFan === false
  );

  userRecommandationAthlete.sort(function (a, b) {
    return b.interaction - a.interaction;
  });

  const filteredArray = [...userFanAthlete, ...userRecommandationAthlete];
  // console.log("athletesSupportingData --> ", athletesSupportingData.length);
  function handleDisplayFavAthlete() {
    if (athletesFollowing.length > 0 || athletesSupportingData.length > 0) {
      setIsSupportingOrFollowingAthlete(true);
      console.log(
        "isSupportingOrFollowingAthlete",
        isSupportingOrFollowingAthlete
      );
    } else {
      setIsSupportingOrFollowingAthlete(false);
      // console.log(
      //   "isSupportingOrFollowingAthlete",
      //   isSupportingOrFollowingAthlete
      // );
    }
  }
  useEffect(() => {
    if (athletesFollowing.length > 0 || athletesSupportingData.length > 0) {
      setIsSupportingOrFollowingAthlete(true);
      // console.log(
      //   "isSupportingOrFollowingAthlete",
      //   isSupportingOrFollowingAthlete
      // );
    } else if (
      athletesFollowing.length < 1 ||
      athletesSupportingData.length < 1
    ) {
      setIsSupportingOrFollowingAthlete(false);
      console.log(
        "isSupportingOrFollowingAthlete",
        isSupportingOrFollowingAthlete
      );
    }
  }, [athletesFollowing,athletesSupportingData]);

  return (
    <div
      style={isSupportingOrFollowingAthlete ? {} : { display: "none" }}
      className="favAthlete-container"
    >
      <div className="favAthlete-horizontal"></div>
      <div className="favAthlete-wrap">
        <div className="favAthlete-subwrap">
          <span>Vos sportifs préférés</span>
          {/* <a href="/favathlete-details"> Voir plus</a> */}
        </div>
        <Carroussel
          athletesSupportingData={athletesSupportingData}
          athletesFollowing={athletesFollowing}
        />
        <div className="favAthlete-responsive-container">
          {/* {filteredArray.map((athlete)  => (
            <FeedSuggestionTemplate 
            key={uuidv4()}
            name={`${athlete.firstName} ${athlete.surName}`}
            type={athlete.type}
            athleteProfilePicture={athlete.imgResponsive}
            id={athlete.id}
            />
          ))} */}
        </div>
      </div>
      <div className="favAthlete-horizontal"></div>
    </div>
  );
};

export default FavAthlete;

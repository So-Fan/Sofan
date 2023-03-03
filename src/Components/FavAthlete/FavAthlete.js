import React from "react";
import AthleteTemplate from "./AthleteTemplate/AthleteTemplate";
import Carroussel from "./Carroussel/Carroussel";
import "./FavAthlete.css";
import LeBron from "./fakeData/lebron.svg";
import Mbappe from "./fakeData/mbappe.svg";
import FeedSuggestionTemplate from "../FeedSuggestions/FeedSuggestionTemplate/FeedSuggestionTemplate";
import { v4 as uuidv4 } from "uuid";
const FavAthlete = () => {
  const fakeArray = [
    {
      firstName: "James",
      surName: "Lebron",
      img: LeBron,
      imgResponsive: "/img/sergioramos.svg",
      id: 0,
      interaction: 15,
      isFan: false,
      type: "Basketball"
    },
    {
      firstName: "Kylian",
      surName: "Mbappe",
      img: Mbappe,
      imgResponsive: "/img/sergioramos.svg",
      id: 1,
      interaction: 18,
      isFan: true,
      type: "Football"
    },
    {
      firstName: "James2",
      surName: "Lebron2",
      img: LeBron,
      imgResponsive: "/img/sergioramos.svg",
      id: 2,
      interaction: 12,
      isFan: true,
      type: "Basketball"
    },
    {
      firstName: "Kylian2",
      surName: "Mbappe2",
      img: Mbappe,
      imgResponsive: "/img/sergioramos.svg",
      id: 3,
      interaction: 8,
      isFan: false,
      type: "Football"
    },
    {
      firstName: "Kylian3",
      surName: "Mbappe3",
      img: Mbappe,
      imgResponsive: "/img/sergioramos.svg",
      id: 4,
      interaction: 1,
      isFan: false,
      type: "Football"
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
  return (
    <div className="favAthlete-container">
      <div className="favAthlete-horizontal"></div>
      <div className="favAthlete-wrap">
        <div className="favAthlete-subwrap">
          <span>Vos sportifs préférés</span>
          <a href="/favathlete-details"> Voir plus</a>
        </div>
        <Carroussel />
        <div className="favAthlete-responsive-container">
          {filteredArray.map((athlete)  => (
            <FeedSuggestionTemplate 
            key={uuidv4()}
            name={`${athlete.firstName} ${athlete.surName}`}
            type={athlete.type}
            athleteProfilePicture={athlete.imgResponsive}
            id={athlete.id}
            />
          ))}
        </div>
      </div>
      <div className="favAthlete-horizontal"></div>
    </div>
  );
};

export default FavAthlete;

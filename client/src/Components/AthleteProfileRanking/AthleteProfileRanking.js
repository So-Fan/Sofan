import React, { useState, useEffect } from "react";
import "./AthleteProfileRanking.css";
import Button from "../Button/Button";
const AthleteProfileRanking = ({handleClick, isPalmaresButtonClicked}) => {
  const [dataAthleteProfilePageConcat, setDataAthleteProfilePageConcat] =
    useState();

  useEffect(() => {
    const data = {
      user: "Romain Attanasio",
      rankings: [
        {
          year: {
            start: "2020",
            end: "Today",
          },
          club: "Paris Saint-Germain",
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
        },
        {
          year: {
            start: "2019",
            end: "2020",
          },
          club: "Saint Etienne",
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
        },
        {
          year: {
            start: "2019",
            end: "2020",
          },
          club: "Saint Etienne",
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
        },
        {
          year: {
            start: "2019",
            end: "2020",
          },
          club: "Saint Etienne",
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
        },
        {
          year: {
            start: "2019",
            end: "2020",
          },
          club: "Saint Etienne",
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
        },
        {
          year: {
            start: "2019",
            end: "2020",
          },
          club: "Saint Etienne",
          description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
        },
      ],
    };
    setDataAthleteProfilePageConcat(data);
  }, []);

  return (
    <div className="athleteprofileranking-component">
      <span>Palmarès</span>
      <div className="athleteprofileranking-container">
        {dataAthleteProfilePageConcat?.rankings.map((ranking) => (
          <div className="athleteprofileranking-wrap">
            <div className="athleteprofileranking-subwrap">
              <span>
                {ranking.year.start} - {ranking.year.end}
              </span>
              <span>{ranking.club}</span>
              <div className="athleteprofileranking-subwrap-circle"></div>
              <div className="athleteprofileranking-subwrap-segment"></div>
            </div>
            <div className="athleteprofileranking-wrap-description">
              {ranking.description}
            </div>
          </div>
        ))}
      </div>
      <Button hover="button-hover-props" text="Fermer" onClick={handleClick} />
    </div>
  );
};

export default AthleteProfileRanking;

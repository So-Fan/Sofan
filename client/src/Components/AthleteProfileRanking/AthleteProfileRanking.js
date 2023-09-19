import React from "react";
import "./AthleteProfileRanking.css";
import Button from "../Button/Button";
const AthleteProfileRanking = ({ handleClick, palmaresData }) => {
  const combinedData = [];
  if (palmaresData && palmaresData[0]) {
    const dates = palmaresData[0].palmares_date;
    const descriptions = palmaresData[0].palmares_description;
    const titles = palmaresData[0].palmares_title;

    for (let i = 0; i < dates.length; i++) {
      combinedData.push({
        date: dates[i],
        club: titles[i],
        description: descriptions[i],
      });
    }
  }
  return (
    <div className="athleteprofileranking-component">
      <span>Palmarès</span>
      <div className="athleteprofileranking-container">
        {combinedData.map((palmares) => (
          <div className="athleteprofileranking-wrap">
            <div className="athleteprofileranking-subwrap">
              <span>{palmares.date}</span>
              <span>{palmares.club}</span>
              <div className="athleteprofileranking-subwrap-circle"></div>
              <div className="athleteprofileranking-subwrap-segment"></div>
            </div>
            <div className="athleteprofileranking-wrap-description">
              {palmares.description}
            </div>
          </div>
        ))}
      </div>
      <Button
        hover="button-hover-props"
        id="custom-close-button"
        text="Fermer"
        onClick={handleClick}
      />
    </div>
  );
};

export default AthleteProfileRanking;

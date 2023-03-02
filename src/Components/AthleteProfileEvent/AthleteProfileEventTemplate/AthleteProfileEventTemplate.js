import React from "react";
import "./AthleteProfileEventTemplate.css";
import Location from "../../../Assets/Image/location.svg";
import Calendar from "../../../Assets/Image/calendar.svg";
const AthleteProfileEventTemplate = ({ eventData }) => {
  return (
    <div className="athleteprofileeventtemplate-component">
      <img
        className="athleteprofileeventtemplate-background"
        src={eventData.background}
        alt="background"
      />
      <div className="athleteprofileeventtemplate-container-content">
        <div className="athleteprofileeventtemplate-wrap-content">
          <span>{eventData.title}</span>
          <div className="athleteprofileeventtemplate-subwrap-content">
            <img src={Location} alt="location" />
            <span>{eventData.location}</span>
          </div>
          <div className="athleteprofileeventtemplate-subwrap-content">
            <img src={Calendar} alt="calendar" />
            <span>{eventData.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteProfileEventTemplate;

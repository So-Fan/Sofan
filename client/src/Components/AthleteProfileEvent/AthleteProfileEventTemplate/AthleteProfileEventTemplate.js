import React from "react";
import "./AthleteProfileEventTemplate.css";
import Location from "../../../Assets/Image/location.svg";
import Calendar from "../../../Assets/Image/calendar.svg";
import { Link } from "react-router-dom";

const AthleteProfileEventTemplate = ({ eventData, isTransparent, dashboardPageStyle }) => {

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };
  

  return (
    <Link className="athleteprofileeventtemplate-component" style={isTransparent && {visibility: "hidden"}}>
      <img
        className="athleteprofileeventtemplate-background"
        src={eventData?.background}
        alt="background"
      />
      <div style={dashboardPageStyle ? {height: "42%"}: {}} className="athleteprofileeventtemplate-container-content">
        <div className="athleteprofileeventtemplate-wrap-content">
          <span>{eventData?.title}</span>
          <div className="athleteprofileeventtemplate-subwrap-content">
            <img src={Location} alt="location" />
            <span>{eventData?.location}</span>
          </div>
          <div className="athleteprofileeventtemplate-subwrap-content">
            <img src={Calendar} alt="calendar" />
            <span>{formatDate(eventData?.date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );

};

export default AthleteProfileEventTemplate;

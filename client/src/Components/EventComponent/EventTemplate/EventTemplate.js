import React from "react";
import "./EventTemplate.css";
import Location from "../../../Assets/Image/location.svg";
import Calendar from "../../../Assets/Image/calendar.svg";
import { Link } from "react-router-dom";
const EventTemplate = ({ title, location, schedule, img, id }) => {
  return (
    <Link
      to={id}
      className="event-content-container"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="event-content-wrap">
        <div className="event-content-subwrap">
          <span className="event-content-title">{title}</span>
          <span className="event-content-text">
            <img src={Location} alt="location" />
              {location}
          </span>
          <span className="event-content-text">
            <img src={Calendar} alt="calendar" />
              {schedule}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventTemplate;

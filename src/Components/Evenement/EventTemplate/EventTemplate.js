import React from 'react'
import "./EventTemplate.css"
import Location from "../../../Assets/Image/location.svg";
import Calendar from "../../../Assets/Image/calendar.svg";
import { Link } from "react-router-dom";
const EventTemplate = ({title, location, schedule, img, id}) => {
  return (
    <Link to={id}
        className="evenement-content-container"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="evenement-content-wrap">
          <div className="evenement-content-subwrap">
            <span className="evenement-content-title">
              {title}
            </span>
            <span className="evenement-content-text">
              <img src={Location} alt="location" />
                {location}
            </span>
            <span className="evenement-content-text">
              <img src={Calendar} alt="calendar" />
                {schedule}
            </span>
          </div>
        </div>
      </Link>
  )
}

export default EventTemplate

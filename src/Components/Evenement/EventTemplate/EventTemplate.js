import React from 'react'
import "./EventTemplate.css"
import Location from "../../../Assets/Image/location.svg";
import Calendar from "../../../Assets/Image/calendar.svg";
import Event from "../fakedata/event.svg";
const EventTemplate = ({title, location, schedule}) => {
  return (
    <div
        className="evenement-content-container"
        style={{ backgroundImage: `url(${Event})` }}
      >
        <div className="evenement-content-wrap">
          <div className="evenement-content-subwrap">
            <span className="evenement-content-title">
              VIP MEETING WITH 1200 HOLDERS
            </span>
            <span className="evenement-content-text">
              <img src={Location} alt="location" />
                Paris, France
            </span>
            <span className="evenement-content-text">
              <img src={Calendar} alt="calendar" />
                14 dec 2022 - 9:00pm
            </span>
          </div>
        </div>
      </div>
  )
}

export default EventTemplate

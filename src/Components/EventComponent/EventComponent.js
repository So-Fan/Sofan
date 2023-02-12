import React from "react";
import "./EventComponent.css";
import DataEvent from "./fakedata/dataEvent.json";
import { Link } from "react-router-dom";
import EventTemplate from "./EventTemplate/EventTemplate";
const EventComponent = ({}) => {
  return (
    <div className="event-component">
      <div className="event-header-container">
        <span className="event-header-title">Vos events</span>
        <Link to="/" className="event-header-button">
          see all
        </Link>
      </div>
      {DataEvent.events.map((event) => (
        <EventTemplate
          title={event.title}
          location={event.location}
          schedule={event.schedule}
          img={event.img}
          id={event.id}
        />
      ))}
    </div>
  );
};

export default EventComponent;

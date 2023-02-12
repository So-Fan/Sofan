import React from "react";
import "./FeedEvent.css";
import DataEvent from "./fakedata/dataEvent.json";
import { Link } from "react-router-dom";
import EventTemplate from "./EventTemplate/EventTemplate";
const FeedEvent = ({}) => {
  return (
    <div className="event-component">
      <div className="event-header-container">
        <span className="event-header-title">Vos évènements</span>
        <Link to="/" className="event-header-button">
          voir plus
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

export default FeedEvent;

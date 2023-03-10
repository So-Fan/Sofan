import React from "react";
import "./FeedEvent.css";
import DataEvent from "./fakedata/dataEvent.json";
import { Link } from "react-router-dom";
import EventTemplate from "./EventTemplate/EventTemplate";
import { v4 as uuidv4 } from "uuid";
const FeedEvent = () => {
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
        key={uuidv4()}
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

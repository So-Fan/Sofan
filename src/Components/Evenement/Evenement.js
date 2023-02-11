import React from "react";
import "./Evenement.css";
import DataEvent from "./fakedata/dataEvent.json"
import { Link } from "react-router-dom";
import EventTemplate from "./EventTemplate/EventTemplate";
const Evenement = ({}) => {
  return (
    <div className="evenement-component">
      <div className="evenement-header-container">
        <span className="evenement-header-title">Vos Evenements</span>
        <Link to="/" className="evenement-header-button">
          see all
        </Link>
      </div>
      {DataEvent.events.map((event) => (
        <EventTemplate title={event.title} location={event.location} schedule={event.schedule} img={event.img} id={event.id} />
      ))}
    </div>
  );
};

export default Evenement;

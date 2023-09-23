import React, { useState, useEffect } from "react";
import "./FeedEvent.css";
import { Link } from "react-router-dom";
import EventTemplate from "./EventTemplate/EventTemplate";
import { db } from '../../Configs/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from "uuid";

const FeedEvent = () => {
  const [events, setEvent] = useState([]);
  const [displayEventsComponent, setDisplayEventsComponent] = useState("")
  const eventCollectionRef = collection(db, 'feed_event');
  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(eventCollectionRef);
      setEvent(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    getEvents();
  }, []);

  useEffect(() => {
    if (events.length === 0) {
      setDisplayEventsComponent("none")
    } else if (events.length >= 1 ){
      setDisplayEventsComponent("")
    }
}, [events])

  const firstEvent = events.slice(0, 1);

  return (
    <div style={{display: displayEventsComponent}} className="event-component">
      <div className="event-header-container">
        <span className="event-header-title">Vos évènements</span>
        {/* <Link to="/" className="event-header-button">
          voir plus
        </Link> */}
      </div>
      {firstEvent.map((event) => (
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
import React, { useState, useEffect } from "react";
import "./AthleteProfileEvent.css";
import AthleteProfileEventTemplate from "./AthleteProfileEventTemplate/AthleteProfileEventTemplate";

const AthleteProfileEvent = ({ dataEvents }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    if (dataEvents) {
      const now = Date.now();
      const upcoming = dataEvents.filter((event) => event.date > now);
      const past = dataEvents.filter((event) => event.date <= now);
      setUpcomingEvents(upcoming);
      setPastEvents(past);
    }
  }, [dataEvents]);

  return (
    <>
      <div className="athleteprofileevent-event-past-title">
        Evenements à venir
      </div>
      <div className="athleteprofileevent-component">
        {upcomingEvents?.map((event) => (
          <AthleteProfileEventTemplate eventData={event} />
        ))}
        {upcomingEvents?.length % 3 === 1 && (
          <>
            <AthleteProfileEventTemplate isTransparent={true} />
            <AthleteProfileEventTemplate isTransparent={true} />
          </>
        )}
        {upcomingEvents?.length % 3 === 2 && (
          <AthleteProfileEventTemplate isTransparent={true} />
        )}
      </div>
      <div className="athleteprofileevent-event-past-title">
        Evenements passés
      </div>
      <div className="athleteprofileevent-component">
        {pastEvents?.map((event) => (
          <AthleteProfileEventTemplate eventData={event} />
        ))}
        {pastEvents?.length % 3 === 1 && (
          <>
            <AthleteProfileEventTemplate isTransparent={true} />
            <AthleteProfileEventTemplate isTransparent={true} />
          </>
        )}
        {pastEvents?.length % 3 === 2 && (
          <AthleteProfileEventTemplate isTransparent={true} />
        )}
      </div>
    </>
  );
};

export default AthleteProfileEvent;

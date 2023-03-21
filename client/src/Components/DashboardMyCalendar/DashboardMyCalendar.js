import React from "react";
import "./DashboardMyCalendar.css";
import AthleteProfileNFTCollectionTemplate from "../AthleteProfileEvent/AthleteProfileEventTemplate/AthleteProfileEventTemplate";
function DashboardMyEvents({dashboardPageStyle, events}) {
  return (
    <section className="dashboard-my-calendar-container">
      <div className="dashboard-my-calendar-date-title">Décembre 2023</div>
      <div className="dashboard-my-calendar-wrap">
        {events.map((event) => (
          <AthleteProfileNFTCollectionTemplate dashboardPageStyle={dashboardPageStyle} eventData={event} />
        ))}
        {events.length % 3 === 1 && (
          <>
            <AthleteProfileNFTCollectionTemplate isTransparent={true} />
            <AthleteProfileNFTCollectionTemplate isTransparent={true} />
          </>
        )}
        {events.length % 3 === 2 && (
          <AthleteProfileNFTCollectionTemplate isTransparent={true} />
        )}
      </div>
    </section>
  );
}

export default DashboardMyEvents;

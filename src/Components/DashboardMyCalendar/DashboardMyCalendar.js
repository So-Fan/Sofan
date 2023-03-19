import React from "react";
import "./DashboardMyCalendar.css";
import AthleteProfileNFTCollectionTemplate from "../AthleteProfileEvent/AthleteProfileEventTemplate/AthleteProfileEventTemplate";
function DashboardMyEvents() {
  const dataBackend = {
    events: [
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/I66BDmh.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
      {
        background: "https://i.imgur.com/2ybztrG.png",
        title: "VIP MEETING WITH 1200 HOLDERS ",
        location: "Paris, France",
        date: "14 dec. 2022 - 9:00pm",
      },
    ],
  };
  return (
    <section className="dashboard-my-calendar-container">
      <div className="dashboard-my-calendar-date-title">Décembre 2023</div>
      <div className="dashboard-my-calendar-wrap">
        {dataBackend?.events.map((event) => (
          <AthleteProfileNFTCollectionTemplate eventData={event} />
        ))}
        {dataBackend?.events.length % 3 === 1 && (
          <>
            <AthleteProfileNFTCollectionTemplate isTransparent={true} />
            <AthleteProfileNFTCollectionTemplate isTransparent={true} />
          </>
        )}
        {dataBackend?.events.length % 3 === 2 && (
          <AthleteProfileNFTCollectionTemplate isTransparent={true} />
        )}
      </div>
    </section>
  );
}

export default DashboardMyEvents;

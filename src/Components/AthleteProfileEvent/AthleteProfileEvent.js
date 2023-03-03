import React, {useState, useEffect} from 'react'
import "./AthleteProfileEvent.css"
import AthleteProfileEventTemplate from './AthleteProfileEventTemplate/AthleteProfileEventTemplate';
const AthleteProfileEvent = () => {
    // https://i.imgur.com/I66BDmh.png

    const [dataAthleteProfilePageConcat, setDataAthleteProfilePageConcat] =
    useState(); // sera dans le composant de la page Athlete

  useEffect(() => {
    const data = {
      user: "Romain Attanasio",
      event: [
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
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
      ],
    };
    setDataAthleteProfilePageConcat(data);
  }, []);
  return (
    <div className='athleteprofileevent-component'>
      {dataAthleteProfilePageConcat?.event.map((event) => (
        <AthleteProfileEventTemplate eventData={event} />
      ))}
    </div>
  )
}

export default AthleteProfileEvent

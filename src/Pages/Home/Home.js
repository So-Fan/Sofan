import React from "react";
import "./Home.css";

function Home({handleProfileOutClick}) {
  return (
    <>
      <h1 onClick={handleProfileOutClick}>Home</h1>
      <h1>
        <a href="http://localhost:3000/signupathlete"> Sign up Athlete</a>
      </h1>
      
    </>
  );
}

export default Home;
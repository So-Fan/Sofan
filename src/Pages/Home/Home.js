import React from "react";
import "./Home.css";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <h1>
        <ul>
          <li>
            <a href="http://localhost:3000/signupathlete"> Sign up Athlete</a>
          </li>
          <li>
            <a href="http://localhost:3000/publication">
              Publication component
            </a>
          </li>
        </ul>
      </h1>
    </>
  );
}

export default Home;

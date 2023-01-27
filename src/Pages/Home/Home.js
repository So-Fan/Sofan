import React from "react";
import "./Home.css";
import WaitingPage from "../WaitingPage/WaitingPage";

function Home({ waitingPage }) {
  return (
    <>
      {waitingPage ? (
        <>
          <WaitingPage />
        </>
      ) : (
        <>
          <section className="sofan-webapp-container">
            <h1>Home</h1>
            <h1>
              <ul>
                <li>
                  <a href="http://localhost:3000/signupathlete">
                    {" "}
                    Sign up Athlete
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/publication">
                    Publication component
                  </a>
                </li>
                <li>
                  <a href="http://localhost:3000/post938098">Full Page Post</a>
                </li>
              </ul>
            </h1>
          </section>
        </>
      )}
    </>
  );
}

export default Home;

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
                  <a href="/signupathlete">
                    {" "}
                    Sign up Athlete
                  </a>
                </li>
                <li>
                  <a href="/publication">
                    Publication component
                  </a>
                </li>
                <li>
                  <a href="/post938098">Full Page Post</a>
                </li>
                <li>
                  <a href="http://localhost:3000/pollpost">PollPost</a>
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

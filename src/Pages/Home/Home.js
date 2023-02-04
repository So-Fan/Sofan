import React from "react";
import "./Home.css";
import WaitingPage from "../WaitingPage/WaitingPage";

function Home({waitingPage}) {
  // const [waitingPage, setWaitingPage] = useState(true)
  return (
    <>
    {waitingPage ? <><WaitingPage/></> : <>
    
      <h1>Home</h1>
      <h1>
        <ul>
          <li>
            <a href="/signupathlete">Sign up Athlete</a>
          </li>
          <li>
            <a href="/publication">
              Publication component
            </a>
          </li>
        </ul>
      </h1>
    </>}
    </>
  );
}

export default Home;

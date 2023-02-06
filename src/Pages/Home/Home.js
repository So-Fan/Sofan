import React from "react";
import "./Home.css";
import WaitingPage from "../WaitingPage/WaitingPage";
import { Link } from "react-router-dom";
import AppModal from "../../Components/AppModal/AppModal";
import PollPost from "../../Components/PostsComponents/PollPost/PollPost";

function Home({ waitingPage }) {
  const [modalShow, setModalShow] = React.useState(false);

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
                  <Link to="/signupathlete">Sign-up Athlete</Link>
                </li>
                <li>
                  <Link to="/publication">Publication component</Link>
                </li>
                <li>
                  <Link to="/post938098">Full Page Post</Link>
                </li>
                <li>
                  <Link to="/pollpost">PollPost</Link>
                </li>
                <li>
                  <Link to="/favathlete">Fav Athlete</Link>
                </li>
                <li>
                  <Link to="/sidenavlink">Side Nav Link</Link>
                </li>
                <li>
                  <button onClick={() => setModalShow(true)}>Open Modal</button>
                </li>
              </ul>
            </h1>
          </section>
          <AppModal size="lg" show={modalShow} onHide={() => setModalShow(false)}>
            <PollPost />
          </AppModal>
        </>
      )}
    </>
  );
}

export default Home;

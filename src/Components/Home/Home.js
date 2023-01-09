import React from "react";
import "./Home.css";
import SignUpAthlete from "../SignUpAthlete/SignUpAthlete";
import Navbar from "../Navbar/Navbar";
import ProgressBar from "react-bootstrap/ProgressBar";

function Home() {
  return (
    <>
      <Navbar />
      <SignUpAthlete />
    </>
  );
}

export default Home;

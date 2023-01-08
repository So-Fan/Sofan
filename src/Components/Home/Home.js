import React from "react";
import "./Home.css";
import SignUpAthlete from "../SignUpAthlete/SignUpAthlete";
import Navbar from "../Navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <SignUpAthlete />
    </>
  );
}

export default Home;

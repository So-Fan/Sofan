import React from "react";
import LaunchpadAllLiveLaunches from "../../Components/LaunchpadAllLiveLaunches/LaunchpadAllLiveLaunches";
import LaunchpadAllUpcomingLaunches from "../../Components/LaunchpadAllUpcomingLaunches/LaunchpadAllUpcomingLaunches";
import LaunchpadAllHeader from "../../Components/LaunchpadAllHeader/LaunchpadAllHeader";
import "./Test.css";

const Test = () => {

  return (
    <>
    <LaunchpadAllLiveLaunches />
    <LaunchpadAllUpcomingLaunches />
    <LaunchpadAllHeader />
    </>
  );
};

export default Test;

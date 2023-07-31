import React, { useState, useEffect } from "react";
import "./FeedLaunchpad.css";
import { Link } from "react-router-dom";
import FeedLaunchpadTemplate from "./FeedLaunchpadTemplate/FeedLaunchpadTemplate";
import DataLaunchpad from "./fakedata/dataLaunchpad.json";
import { db } from "../../Configs/firebase";
import { collection, getDocs } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
const FeedLaunchpad = () => {
  const [launchpad, setLaunchpad] = useState([]);
  const launchpadCollectionRef = collection(db, "feed_launchpad");
  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(launchpadCollectionRef);
      setLaunchpad(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getEvents();
  }, []);

  return (
    <div className="feedlaunchpad-component">
      <div className="feedlaunchpad-header-container">
        <span className="feedlaunchpad-header-title">Launchpad</span>
        <Link to="/launchpad" className="feedlaunchpad-header-button">
          voir plus
        </Link>
      </div>
      {launchpad.map((launchpad) => (
        <FeedLaunchpadTemplate
          key={uuidv4()}
          title={launchpad.title}
          athlete={launchpad.athlete}
          img={launchpad.img}
          athleteProfilePicture={launchpad.avatar}
          id={launchpad.id}
        />
      ))}
    </div>
  );
};

export default FeedLaunchpad;

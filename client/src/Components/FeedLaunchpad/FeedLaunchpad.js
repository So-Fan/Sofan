import React, { useState, useEffect } from "react";
import "./FeedLaunchpad.css";
import { Link } from "react-router-dom";
import FeedLaunchpadTemplate from "./FeedLaunchpadTemplate/FeedLaunchpadTemplate";
import DataLaunchpad from "./fakedata/dataLaunchpad.json";
import { db } from "../../Configs/firebase";
import { collection, getDocs, getDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
const FeedLaunchpad = () => {
  const [launchpad, setLaunchpad] = useState([]);
  const [mostRecentLaunchpad, setMostRecentLaunchpad] = useState({});
  const launchpadCollectionRef = collection(db, "feed_launchpad");
  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(launchpadCollectionRef);
      const dataPromises = data.docs.map(async (doc) => {
        const feedLaunchpad = doc.data();

        const nftCollectionDoc = await getDoc(feedLaunchpad.nft_collection_ref);
        const userDoc = await getDoc(feedLaunchpad.athlete_ref);
        const nftCollectionsData = nftCollectionDoc.data();
        const userData = userDoc.data();
        return {
          // launchpad: feedLaunchpad,
          launch_date: feedLaunchpad.launch_date,
          collection_avatar: nftCollectionsData?.collection_avatar,
          collection_title: nftCollectionsData?.collection_title,
          collection_address: nftCollectionsData?.collection_address,
          athlete_id: userData.id,
          display_name: userData.display_name,
          profile_avatar: userData.profile_avatar,
        };
      });
      const filteredDatas = await Promise.all(dataPromises);

      const currentDate = Date.now();
      const result = filteredDatas.filter((filteredData) => {
        return filteredData.launch_date.seconds * 1000 > currentDate;
      });
      // console.log(result)
      // const smallestLaunchDate = Math.min(...result.map(obj => obj.launch_date.seconds));
      // console.log(smallestLaunchDate)
      if (result.length > 0) {
        result.sort((a, b) => a.launch_date.seconds - b.launch_date.seconds);

        const mostRecentUpcomingLaunch = result[0];
        //console.log(mostRecentUpcomingLaunch);
        setMostRecentLaunchpad(mostRecentUpcomingLaunch);
      } else {
        console.log("No upcoming launches found.");
      }
    };

    getEvents();
  }, []);
  // launchpad.splice(1);
  return (
    <div className="feedlaunchpad-component">
      <div className="feedlaunchpad-header-container">
        <span className="feedlaunchpad-header-title">Launchpad</span>
        <Link to="/launchpad" className="feedlaunchpad-header-button">
          voir plus
        </Link>
      </div>
      <FeedLaunchpadTemplate
        key={uuidv4()}
        title={mostRecentLaunchpad?.collection_title}
        athlete={mostRecentLaunchpad?.display_name}
        img={mostRecentLaunchpad?.collection_avatar}
        athleteProfilePicture={mostRecentLaunchpad.profile_avatar}
        collectionAddress={mostRecentLaunchpad.collection_address}
        id={mostRecentLaunchpad.athlete_id}
      />
    </div>
  );
};

export default FeedLaunchpad;

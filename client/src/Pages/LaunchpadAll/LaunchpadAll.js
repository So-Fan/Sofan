import "./LaunchpadAll.css";
import React, { useEffect, useState } from "react";
import LaunchpadAllHeader from "../../Components/LaunchpadAllHeader/LaunchpadAllHeader";
import LaunchpadAllLiveLaunches from "../../Components/LaunchpadAllLiveLaunches/LaunchpadAllLiveLaunches";
import LaunchpadAllUpcomingLaunches from "../../Components/LaunchpadAllUpcomingLaunches/LaunchpadAllUpcomingLaunches";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  getDoc,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../Configs/firebase";

function LaunchpadAll({
  isLiveLaunchSportDropdownClicked,
  setIsLiveLaunchSportDropdownClicked,
  isUpcomingLaunchSportDropdownClicked,
  setIsUpcomingLaunchSportDropdownClicked,
  handleLiveLaunchesSportDropdownClicked,
}) {
  const [launchpadAllDatBackend, setLaunchpadAllDataBackend] = useState([]);
  const [launchpadItems, setLaunchpadItems] = useState();
  const launchpadAllCollection = collection(db, "feed_launchpad");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const launchpadsSnapshot = await getDocs(launchpadAllCollection);
        
        const dataPromises = launchpadsSnapshot.docs.map(async doc => {
          const launchpadData = doc.data();
          
          const nftCollectionDoc = await getDoc(launchpadData.nft_collection_ref);
          const userDoc = await getDoc(launchpadData.athlete_ref);

          return {
            launchpad: launchpadData,
            nftCollection: nftCollectionDoc.data(),
            user: userDoc.data(),
          };
        });

        const resolvedData = await Promise.all(dataPromises);
        setLaunchpadItems(resolvedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(launchpadItems);

  return (
    <div className="launchpadall-page">
      <div className="launchpadall-wrap">
        <div className="launchpadall-header-wrap">
          <LaunchpadAllHeader
            data={launchpadAllDatBackend[0]}
            hidePrice={true}
          />
        </div>
        <div className="launchpad-livelaunches-wrap">
          <LaunchpadAllLiveLaunches
            isLiveLaunchSportDropdownClicked={isLiveLaunchSportDropdownClicked}
            setIsLiveLaunchSportDropdownClicked={
              setIsLiveLaunchSportDropdownClicked
            }
            handleLiveLaunchesSportDropdownClicked={
              handleLiveLaunchesSportDropdownClicked
            }
            data={launchpadAllDatBackend}
            // setDimMain={setDimMain}
            hidePrice={true}
          />
        </div>
        <div
          className="launchpad-Upcominglaunches-wrap"
          // style={launchpadallUpcomingLaunchesWrap}
        >
          <LaunchpadAllUpcomingLaunches
            hidePrice={true}
            isUpcomingLaunchSportDropdownClicked={
              isUpcomingLaunchSportDropdownClicked
            }
            setIsUpcomingLaunchSportDropdownClicked={
              setIsUpcomingLaunchSportDropdownClicked
            }
            data={launchpadAllDatBackend}
          />
        </div>
      </div>
    </div>
  );
}

export default LaunchpadAll;

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
  addDoc,
  deleteDoc,
  doc
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
  const [launchpadItems, setLaunchpadItems] = useState([]);
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
  const multiplyDocuments = async () => {
    const feedLaunchpadRef = collection(db, 'feed_launchpad');
    const snapshot = await getDocs(feedLaunchpadRef);
  
    snapshot.forEach(async (doc) => {
      // Clone le document 3 fois
      for (let i = 0; i < 3; i++) {
        await addDoc(feedLaunchpadRef, doc.data());
      }
    });
    
    console.log('Documents multipliés par 3.');
  };
  
  // Pour exécuter la fonction, décommentez la ligne suivante
  // multiplyDocuments();
  const deleteDocuments = async () => {
    const feedLaunchpadRef = collection(db, 'feed_launchpad');
    const snapshot = await getDocs(feedLaunchpadRef);
  
    let count = 0;
    for (const docSnap of snapshot.docs) {
      if (count >= 500) break;
  
      await deleteDoc(doc(db, 'feed_launchpad', docSnap.id));
      count++;
    }
    
    console.log(`Supprimé ${count} documents.`);
  };
  
  // Pour exécuter la fonction, décommentez la ligne suivante
  // deleteDocuments();
  // console.log(launchpadItems);  
  return (
    <div className="launchpadall-page">
      <div className="launchpadall-wrap">
        <div className="launchpadall-header-wrap">
          <LaunchpadAllHeader
            data={launchpadItems[0]?.nftCollection}
            dataAthlete={launchpadItems[0]?.user}
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
            data={launchpadItems}
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
            data={launchpadItems}
          />
        </div>
      </div>
    </div>
  );
}

export default LaunchpadAll;

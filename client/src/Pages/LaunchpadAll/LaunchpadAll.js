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
  doc,
  updateDoc,
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

        const dataPromises = launchpadsSnapshot.docs.map(async (doc) => {
          const launchpadData = doc.data();

          const nftCollectionDoc = await getDoc(
            launchpadData.nft_collection_ref
          );
          const userDoc = await getDoc(launchpadData.athlete_ref);

          return {
            launchpad: launchpadData,
            nftCollection: nftCollectionDoc.data(),
            user: userDoc.data(),
          };
        });

        const resolvedData = await Promise.all(dataPromises);

        setLaunchpadItems(resolvedData);
        console.log(resolvedData);
        console.log("Data fetched.");
        // Nouveau code pour mettre à jour les documents
        resolvedData.forEach(async (item) => {
          console.log(
            "Current collection_address:",
            item.nftCollection.collection_address
          );
          if (item.nftCollection.collection_address === "") {
            const docRef = doc(db, "nft_collections", item.nftCollection.id); // Assurez-vous que item.launchpad.id est correct
            await updateDoc(docRef, {
              collection_address: "0xeD8263C7E0df64bc1E9D69C5A72734DfB85Ba32c",
            });
            console.log("Updated collection_address.");
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateEmptyAddresses = async () => {
    const nftCollectionRef = collection(db, "nft_collections"); // Replace with your collection name
    const q = query(
      nftCollectionRef,
      where("collection_address", "==", "Your Hardcoded Address")
    );

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(nftCollectionRef, docSnapshot.id);
        await updateDoc(docRef, {
          collection_address: "0xeD8263C7E0df64bc1E9D69C5A72734DfB85Ba32c",
        });
        console.log(`Updated address for document ${docSnapshot.id}`);
      });
    } catch (error) {
      console.error("Error updating addresses:", error);
    }
  };

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

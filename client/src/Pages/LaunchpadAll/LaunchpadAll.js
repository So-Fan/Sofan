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
  const [launchpadAllData, setLaunchpadAllData] = useState();
  const [launchpadAllDatBackend, setLaunchpadAllDataBackend] = useState([]);
  const launchpadAllCollection = collection(db, "feed_launchpad");
  useEffect(() => {
    const data = {
      launchpad: {
        background: "https://i.imgur.com/se736B0.png",
        profilePicture: "https://i.imgur.com/StsunkC.png",
        athlename: "Romain Attanasio",
        title: "Vendée Globe Final Tour",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        nftNumber: "350",
        nftPrice: "0.31",
      },
      launchpadLive: [
        {
          background:
            "https://yacht-express.net/wp-content/uploads/2020/12/vendee-globe-doubts-about-the-launch-date.jpg",
          profilePicture: "https://i.imgur.com/StsunkC.png",
          athleName: "Romain Attanasio",
          title: "Vendée Globe Final Tour",
          nftLength: "350",
          nftPrice: "0.31",
        },
        {
          background: "https://i.imgur.com/C46TVU6.png",
          profilePicture: "https://i.imgur.com/StsunkC.png",
          athleName: "Romain Attanasio",
          title: "Vendée Globe Final Tour",
          nftLength: "350",
          nftPrice: "0.31",
        },
        {
          background: "https://i.imgur.com/C46TVU6.png",
          profilePicture: "https://i.imgur.com/StsunkC.png",
          athleName: "Romain Attanasio",
          title: "Vendée Globe Final Tour",
          nftLength: "350",
          nftPrice: "0.31",
        },
        {
          background: "https://i.imgur.com/C46TVU6.png",
          profilePicture: "https://i.imgur.com/StsunkC.png",
          athleName: "Romain Attanasio",
          title: "Vendée Globe Final Tour",
          nftLength: "350",
          nftPrice: "0.31",
        },
      ],
      launchpadUpcomings: [
        {
          background: "https://i.imgur.com/C46TVU6.png",
          profilePicture: "https://i.imgur.com/StsunkC.png",
          athleName: "Romain Attanasio",
          title: "Vendée Globe Final Tour Vendée Globe Final Tour",
          nftLength: "350",
          nftPrice: "0.31",
          date: {
            days: "1",
            hours: "12",
            minutes: "15",
            seconds: "34",
          },
        },
        {
          background: "https://i.imgur.com/C46TVU6.png",
          profilePicture: "https://i.imgur.com/StsunkC.png",
          athleName: "Romain Attanasio",
          title: "Vendée Globe Final Tour",
          nftLength: "350",
          nftPrice: "0.31",
          date: {
            days: "1",
            hours: "12",
            minutes: "15",
            seconds: "34",
          },
        },
        {
          background:
            "https://yacht-express.net/wp-content/uploads/2020/12/vendee-globe-doubts-about-the-launch-date.jpg",
          profilePicture: "https://i.imgur.com/StsunkC.png",
          athleName: "Romain Attanasio",
          title: "Vendée Globe Final Tour",
          nftLength: "350",
          nftPrice: "0.31",
          date: {
            days: "1",
            hours: "12",
            minutes: "15",
            seconds: "34",
          },
        },
        {
          background: "https://i.imgur.com/C46TVU6.png",
          profilePicture: "https://i.imgur.com/StsunkC.png",
          athleName: "Romain Attanasio",
          title: "Vendée Globe Final Tour",
          nftLength: "350",
          nftPrice: "0.31",
          date: {
            days: "1",
            hours: "12",
            minutes: "15",
            seconds: "34",
          },
        },
      ],
    };

    setLaunchpadAllData(data);
  }, []);
  useEffect(() => {
    async function getLaunchpadAllData() {
      // Create a query against the collection
      const q = query(
        launchpadAllCollection,
        orderBy("launch_date", "desc"), // pour classer en décroissant et mettre l'element le plus vieux en banniere avec l'index 0
        // where("account_type", "==", "athlete"),
        limit(10)
      );

      const data = await getDocs(q);
      setLaunchpadAllDataBackend(
        data.docs.map((doc) => {
          const docData = doc.data();
          return {
            title: docData.title,
            display_name: docData.display_name,
            profile_avatar: docData.profile_avatar,
            description: docData.description,
            item_number: docData.item_number,
            img: docData.img,
            id: doc.id, // Include the document ID if needed
          };
        })
      );
    }
    getLaunchpadAllData();
  }, []);
  // console.log(launchpadAllDatBackend[0]);
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
            data={launchpadAllData?.launchpadUpcomings}
          />
        </div>
      </div>
    </div>
  );
}

export default LaunchpadAll;

import React, { useEffect, useState } from "react";
import LaunchpadAllHeader from "../../Components/LaunchpadAllHeader/LaunchpadAllHeader";
import LaunchpadAllLiveLaunches from "../../Components/LaunchpadAllLiveLaunches/LaunchpadAllLiveLaunches";
import LaunchpadAllUpcomingLaunches from "../../Components/LaunchpadAllUpcomingLaunches/LaunchpadAllUpcomingLaunches";
import "./LaunchpadAll.css";
function LaunchpadAll({
  isLiveLaunchSportDropdownClicked,
  setIsLiveLaunchSportDropdownClicked,
  isUpcomingLaunchSportDropdownClicked,
  setIsUpcomingLaunchSportDropdownClicked,
  handleLiveLaunchesSportDropdownClicked,
}) {
  const [launchpadAllData, setLaunchpadAllData] = useState();
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
          background: "https://yacht-express.net/wp-content/uploads/2020/12/vendee-globe-doubts-about-the-launch-date.jpg",
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
          background: "https://yacht-express.net/wp-content/uploads/2020/12/vendee-globe-doubts-about-the-launch-date.jpg",
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

  return (
    <div className="launchpadall-page">
      <div className="launchpadall-wrap">
        <div className="launchpadall-header-wrap">
          <LaunchpadAllHeader
            data={launchpadAllData?.launchpad}
            hidePrice={true}
          />
        </div>
        <div
          className="launchpad-livelaunches-wrap"
        >
          <LaunchpadAllLiveLaunches
            isLiveLaunchSportDropdownClicked={isLiveLaunchSportDropdownClicked}
            setIsLiveLaunchSportDropdownClicked={
              setIsLiveLaunchSportDropdownClicked
            }
            handleLiveLaunchesSportDropdownClicked={
              handleLiveLaunchesSportDropdownClicked
            }
            data={launchpadAllData?.launchpadLive}
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

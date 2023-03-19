import React, {useState, useEffect} from 'react'
import "./LaunchpadAllUpcomingLaunches.css"
import Arrow from "../../Assets/Image/arrow_bottom.svg";
import { useHorizontalScroll } from "./CustomHook/useHorizontalScroll";
import LaunchpadAllUpcomingLaunchesTemplate from './LaunchpadAllUpcomingLaunchesTemplate/LaunchpadAllUpcomingLaunchesTemplate';

const LaunchpadAllUpcomingLaunches = ({
    setIsUpcomingLaunchSportDropdownClicked,
    isUpcomingLaunchSportDropdownClicked,
  }) => {
    const scrollRef = useHorizontalScroll();
  const [dimLaunchpadAllUpcomingLaunches, setDimLaunchpadAllUpcomingLaunches] = useState(window.innerWidth);
  const handleDimLaunchpadAllUpcomingLaunches = () => {
    setDimLaunchpadAllUpcomingLaunches(window.innerWidth);
  };
  var launchpadAllUpcomingLaunchesDynamicWidth;
  var responsiveWidthLanchpadAllUpcomingLaunches;
  var respMaxWidthLaunchpadAllUpcomingLaunches;
  var respWidthTopLaunchpadAllUpcomingLaunches;

  const data = {
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
            seconds: "34"
        }
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
            seconds: "34"
        }
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
            seconds: "34"
        }
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
            seconds: "34"
        }
      },
    ],
  };
  useEffect(() => {
    window.addEventListener("resize", handleDimLaunchpadAllUpcomingLaunches, false);
  }, []);

  if (dimLaunchpadAllUpcomingLaunches > 1300) {
    launchpadAllUpcomingLaunchesDynamicWidth = {
      minWidth: `${data?.launchpadUpcomings.length * 520}px`,
    };
    responsiveWidthLanchpadAllUpcomingLaunches = {
      marginRight: "20px",
    };
  } else {
    launchpadAllUpcomingLaunchesDynamicWidth = {
      minWidth: `${
        data?.launchpadUpcomings.length * (520 - (1300 - dimLaunchpadAllUpcomingLaunches) * (38 / 100))
      }px`,
    };
    respMaxWidthLaunchpadAllUpcomingLaunches = {
      maxWidth: `${1300 - (1300 - dimLaunchpadAllUpcomingLaunches)}px`,
    };
    responsiveWidthLanchpadAllUpcomingLaunches = {
      marginRight: "20px",
    };
    respWidthTopLaunchpadAllUpcomingLaunches = {
      width: `${1246 - (1300 - dimLaunchpadAllUpcomingLaunches)}px`,
    };
  }
  const [currentUpcomingLaunchesSportSelectorSelected, setCurrentUpcomingLaunchesSportSelectorSelected] = useState("All sports")
  const handleUpcomingLaunchesSportDropdownClicked = () => {
    setIsUpcomingLaunchSportDropdownClicked(true);
  };
  const handleUpcomingLaunchesSportChoiceClicked = e => {
    setCurrentUpcomingLaunchesSportSelectorSelected(e.target.innerHTML)
  }

  return (
      <div className="launchpadallupcominglaunches-component">
      <div onClick={handleUpcomingLaunchesSportDropdownClicked} className="launchpadallupcominglaunches-top-wrap" style={respWidthTopLaunchpadAllUpcomingLaunches}>
        <span>Upcoming launches</span>
        <div className="launchpadallupcominglaunches-top-wrap-dropdown">
          <span>{currentUpcomingLaunchesSportSelectorSelected}</span>
          <img src={Arrow} alt="dropdown" />
          {isUpcomingLaunchSportDropdownClicked && (
        <>
          <div className="sortbyselector-menu">
            <ul>
              {currentUpcomingLaunchesSportSelectorSelected !== "Voile" && <li onClick={handleUpcomingLaunchesSportChoiceClicked}>Voile</li>}
              {currentUpcomingLaunchesSportSelectorSelected !== "Tennis" && <li onClick={handleUpcomingLaunchesSportChoiceClicked}>Tennis</li>}
              {currentUpcomingLaunchesSportSelectorSelected !== "Football" && <li onClick={handleUpcomingLaunchesSportChoiceClicked}>Football</li>}
              {currentUpcomingLaunchesSportSelectorSelected !== "Esport" && <li onClick={handleUpcomingLaunchesSportChoiceClicked}>Esport</li>}
            </ul>
          </div>
        </>
      )}
        </div>
      </div>
      <div
        className="launchpadallupcominglaunches-bottom-wrap"
        style={respMaxWidthLaunchpadAllUpcomingLaunches}
        ref={scrollRef}
      >
        <div style={launchpadAllUpcomingLaunchesDynamicWidth}>
          {data?.launchpadUpcomings.map((launchpadUpcoming) => (
            <div style={responsiveWidthLanchpadAllUpcomingLaunches}>
              <LaunchpadAllUpcomingLaunchesTemplate
                background={launchpadUpcoming.background}
                profilePicture={launchpadUpcoming.profilePicture}
                athleteName={launchpadUpcoming.athleName}
                title={launchpadUpcoming.title}
                nftLength={launchpadUpcoming.nftLength}
                nftPrice={launchpadUpcoming.nftPrice}
                date={launchpadUpcoming.date}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LaunchpadAllUpcomingLaunches

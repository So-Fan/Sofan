import React, { useEffect, useState } from "react";
import "./LaunchpadAllLiveLaunches.css";
import Arrow from "../../Assets/Image/arrow_bottom.svg";
import LaunchpadAllLiveLaunchesTemplate from "./LaunchpadAllLiveLaunchesTemplate/LaunchpadAllLiveLaunchesTemplate";
import { useHorizontalScroll } from "./CustomHook/useHorizontalScroll";
// Ajouter props quand build page
const LaunchpadAllLiveLaunches = ({
  setIsLiveLaunchSportDropdownClicked,
  isLiveLaunchSportDropdownClicked,
}) => {
  const scrollRef = useHorizontalScroll();
  const [dim, setDim] = useState(window.innerWidth);
  const handleDim = () => {
    setDim(window.innerWidth);
    console.log("pip");
  };
  var launchpadAllLiveLaunchesDynamicWidth;
  var responsiveWidth;
  var respMaxWidth;
  var respWidthTop;

  const data = {
    launchpadLive: [
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
      {
        background: "https://i.imgur.com/C46TVU6.png",
        profilePicture: "https://i.imgur.com/StsunkC.png",
        athleName: "Romain Attanasio",
        title: "Vendée Globe Final Tour",
        nftLength: "350",
        nftPrice: "0.31",
      },
    ],
  };
  useEffect(() => {
    window.addEventListener("resize", handleDim, false);
  }, []);

  if (dim > 1300) {
    launchpadAllLiveLaunchesDynamicWidth = {
      minWidth: `${data?.launchpadLive.length * 520}px`,
    };
    responsiveWidth = {
      marginRight: "20px",
    };
  } else {
    launchpadAllLiveLaunchesDynamicWidth = {
      minWidth: `${
        data?.launchpadLive.length * (520 - (1300 - dim) * (38 / 100))
      }px`,
    };
    respMaxWidth = {
      maxWidth: `${1300 - (1300 - dim)}px`,
    };
    responsiveWidth = {
      marginRight: "20px",
    };
    respWidthTop = {
      width: `${1246 - (1300 - dim)}px`,
    };
  }
  const [currentLiveLaunchesSportSelectorSelected, setCurrentLiveLaunchesSportSelectorSelected] = useState("All sports")
  const handleLiveLaunchesSportDropdownClicked = () => {
    setIsLiveLaunchSportDropdownClicked(true);
  };
  const handleLiveLaunchesSportChoiceClicked = e => {
    console.log(e);
    setCurrentLiveLaunchesSportSelectorSelected(e.target.innerHTML)
  }
  return (
    <div className="launchpadalllivelaunches-component">
      <div onClick={handleLiveLaunchesSportDropdownClicked} className="launchpadalllivelaunches-top-wrap" style={respWidthTop}>
        <span>Live launches</span>
        <div className="launchpadalllivelaunches-top-wrap-dropdown">
          <span>{currentLiveLaunchesSportSelectorSelected}</span>
          <img src={Arrow} alt="dropdown" />
          {isLiveLaunchSportDropdownClicked && (
        <>
          <div className="sortbyselector-menu">
            <ul>
              {currentLiveLaunchesSportSelectorSelected !== "Voile" && <li onClick={handleLiveLaunchesSportChoiceClicked}>Voile</li>}
              {currentLiveLaunchesSportSelectorSelected !== "Tennis" && <li onClick={handleLiveLaunchesSportChoiceClicked}>Tennis</li>}
              {currentLiveLaunchesSportSelectorSelected !== "Football" && <li onClick={handleLiveLaunchesSportChoiceClicked}>Football</li>}
              {currentLiveLaunchesSportSelectorSelected !== "Esport" && <li onClick={handleLiveLaunchesSportChoiceClicked}>Esport</li>}
            </ul>
          </div>
        </>
      )}
        </div>
      </div>
      <div
        className="launchpadalllivelaunches-bottom-wrap"
        style={respMaxWidth}
        ref={scrollRef}
      >
        <div style={launchpadAllLiveLaunchesDynamicWidth}>
          {data?.launchpadLive.map((launchpadlive) => (
            <div style={responsiveWidth}>
              <LaunchpadAllLiveLaunchesTemplate
                background={launchpadlive.background}
                profilePicture={launchpadlive.profilePicture}
                athleteName={launchpadlive.athleName}
                title={launchpadlive.title}
                nftLength={launchpadlive.nftLength}
                nftPrice={launchpadlive.nftPrice}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaunchpadAllLiveLaunches;

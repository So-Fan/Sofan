import React, { useState, useEffect } from "react";
import "./LaunchpadAllUpcomingLaunches.css";
import Arrow from "../../Assets/Image/arrow_bottom.svg";
import { useHorizontalScroll } from "../../CustomHook/useHorizontalScroll";
import LaunchpadAllUpcomingLaunchesTemplate from "./LaunchpadAllUpcomingLaunchesTemplate/LaunchpadAllUpcomingLaunchesTemplate";

const LaunchpadAllUpcomingLaunches = ({
  setIsUpcomingLaunchSportDropdownClicked,
  isUpcomingLaunchSportDropdownClicked,
  data,
}) => {
  const scrollRef = useHorizontalScroll();
  const [
    currentUpcomingLaunchesSportSelectorSelected,
    setCurrentUpcomingLaunchesSportSelectorSelected,
  ] = useState("All sports");
  const [dimLaunchpadAllUpcomingLaunches, setDimLaunchpadAllUpcomingLaunches] =
    useState(window.innerWidth);
  const handleUpcomingLaunchesSportDropdownClicked = () => {
    setIsUpcomingLaunchSportDropdownClicked(true);
  };
  const handleUpcomingLaunchesSportChoiceClicked = (e) => {
    setCurrentUpcomingLaunchesSportSelectorSelected(e.target.innerHTML);
  };
  const handleDimLaunchpadAllUpcomingLaunches = () => {
    setDimLaunchpadAllUpcomingLaunches(window.innerWidth);
  };
  let launchpadAllUpcomingLaunchesDynamicWidth;
  let responsiveWidthLanchpadAllUpcomingLaunches;
  let respMaxWidthLaunchpadAllUpcomingLaunches;
  let respWidthTopLaunchpadAllUpcomingLaunches;

  let launchpadallUpcominglaunchesTopWrapSpan;
  let launchpadallUpcominglaunchesTopWrapDropdown;
  let launchpadallUpcominglaunchesTopWrapDropdownSpan;
  let launchpadallUpcominglaunchesTopWrapDropdownImg;
  let launchpadallUpcominglaunchesTopWrapDropdownChoiceWrap;
  let launchpadallUpcominglaunchesTopWrapDropdownChoiceWrapUlLiChild1;
  const LaunchpadAllUpcomingLaunchesCalcProportional = (obj, totalPx) => {
    let Obj = {};
    for (let key in obj) {
      let temp = {
        temp: `${
          obj[key] * (1 - (1 - dimLaunchpadAllUpcomingLaunches / totalPx))
        }px`,
      };
      Obj[key] = temp["temp"];
    }
    return Obj;
  };

  if (dimLaunchpadAllUpcomingLaunches > 1337) {
    launchpadAllUpcomingLaunchesDynamicWidth = {
      minWidth: `${data?.length * 520}px`,
    };
    responsiveWidthLanchpadAllUpcomingLaunches = {
      marginRight: "20px",
    };
  } else {
    launchpadAllUpcomingLaunchesDynamicWidth = {
      minWidth: `${
        data?.length *
        (520 - (1337 - dimLaunchpadAllUpcomingLaunches) * (38 / 100))
      }px`,
    };
    respMaxWidthLaunchpadAllUpcomingLaunches = {
      maxWidth: `${1337 - (1337 - dimLaunchpadAllUpcomingLaunches)}px`,
      maxHeight: `${
        550 * (1 - (1 - dimLaunchpadAllUpcomingLaunches / 1300))
      }px`,
      marginTop: `${20 * (1 - (1 - dimLaunchpadAllUpcomingLaunches / 1300))}px`,
    };
    responsiveWidthLanchpadAllUpcomingLaunches = {
      marginRight: "20px",
    };
    respWidthTopLaunchpadAllUpcomingLaunches = {
      width: `${1246 - (1337 - dimLaunchpadAllUpcomingLaunches)}px`,
    };

    launchpadallUpcominglaunchesTopWrapSpan =
      LaunchpadAllUpcomingLaunchesCalcProportional(
        { fontSize: 35, lineHeight: 42, height: 42 },
        1337
      );
    launchpadallUpcominglaunchesTopWrapDropdown =
      LaunchpadAllUpcomingLaunchesCalcProportional(
        { width: 207, height: 37, borderRadius: 10 },
        1337
      );
    launchpadallUpcominglaunchesTopWrapDropdownSpan =
      LaunchpadAllUpcomingLaunchesCalcProportional(
        { fontSize: 16, lineHeight: 19, paddingLeft: 10 },
        1337
      );
    launchpadallUpcominglaunchesTopWrapDropdownImg =
      LaunchpadAllUpcomingLaunchesCalcProportional(
        {
          paddingRight: 10,
          width: 13,
          heigth: 8,
        },
        1337
      );
    launchpadallUpcominglaunchesTopWrapDropdownChoiceWrap =
      LaunchpadAllUpcomingLaunchesCalcProportional(
        {
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          width: 197,
          height: 90,
          top: 37,
          left: -1,
          paddingLeft: 10,
          lineHeight: 19,
          fontSize: 16,
        },
        1337
      );
    launchpadallUpcominglaunchesTopWrapDropdownChoiceWrapUlLiChild1 =
      LaunchpadAllUpcomingLaunchesCalcProportional({ paddingTop: 5 }, 1337);
  }

  useEffect(() => {
    window.addEventListener(
      "resize",
      handleDimLaunchpadAllUpcomingLaunches,
      false
    );
  }, []);
  return (
    <div className="launchpadallupcominglaunches-component">
      <div
        onClick={handleUpcomingLaunchesSportDropdownClicked}
        className="launchpadallupcominglaunches-top-wrap"
        style={respWidthTopLaunchpadAllUpcomingLaunches}
      >
        <span style={launchpadallUpcominglaunchesTopWrapSpan}>
          Upcoming launches
        </span>
        <div
          className={
            isUpcomingLaunchSportDropdownClicked
              ? "launchpadallupcominglaunches-top-wrap-dropdown launchpadallupcominglaunches-top-wrap-dropdown-clicked"
              : "launchpadallupcominglaunches-top-wrap-dropdown"
          }
          style={launchpadallUpcominglaunchesTopWrapDropdown}
          id="launchpadallupcominglaunches-dropdown-main"
        >
          <span
            id="launchpadallupcominglaunches-dropdown-span"
            style={launchpadallUpcominglaunchesTopWrapDropdownSpan}
          >
            {currentUpcomingLaunchesSportSelectorSelected}
          </span>
          <img
            id="launchpadallupcominglaunches-dropdown-img"
            src={Arrow}
            alt="dropdown"
            style={launchpadallUpcominglaunchesTopWrapDropdownImg}
          />
          {isUpcomingLaunchSportDropdownClicked && (
            <>
              <div
                className="launchpadallupcominglaunches-top-wrap-dropdown-choice-wrap"
                style={launchpadallUpcominglaunchesTopWrapDropdownChoiceWrap}
              >
                <ul>
                  {currentUpcomingLaunchesSportSelectorSelected !== "Voile" && (
                    <li
                      onClick={handleUpcomingLaunchesSportChoiceClicked}
                      style={
                        launchpadallUpcominglaunchesTopWrapDropdownChoiceWrapUlLiChild1
                      }
                    >
                      Voile
                    </li>
                  )}
                  {currentUpcomingLaunchesSportSelectorSelected !==
                    "Tennis" && (
                    <li onClick={handleUpcomingLaunchesSportChoiceClicked}>
                      Tennis
                    </li>
                  )}
                  {currentUpcomingLaunchesSportSelectorSelected !==
                    "Football" && (
                    <li onClick={handleUpcomingLaunchesSportChoiceClicked}>
                      Football
                    </li>
                  )}
                  {currentUpcomingLaunchesSportSelectorSelected !==
                    "Esport" && (
                    <li onClick={handleUpcomingLaunchesSportChoiceClicked}>
                      Esport
                    </li>
                  )}
                  {currentUpcomingLaunchesSportSelectorSelected !==
                    "All sports" && (
                    <li onClick={handleUpcomingLaunchesSportChoiceClicked}>
                      All sports
                    </li>
                  )}
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
          {data?.map((launchpadUpcoming) => (
            <div style={responsiveWidthLanchpadAllUpcomingLaunches}>
              <LaunchpadAllUpcomingLaunchesTemplate
                background={launchpadUpcoming.background}
                profilePicture={launchpadUpcoming.profilePicture}
                athleteName={launchpadUpcoming.athleName}
                title={launchpadUpcoming.title}
                nftLength={launchpadUpcoming.nftLength}
                nftPrice={launchpadUpcoming.nftPrice}
                date={launchpadUpcoming.date}
                dim={dimLaunchpadAllUpcomingLaunches}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaunchpadAllUpcomingLaunches;

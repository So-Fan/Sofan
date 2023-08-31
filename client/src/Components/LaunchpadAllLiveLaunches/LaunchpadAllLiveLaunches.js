import React, { useEffect, useState } from "react";
import "./LaunchpadAllLiveLaunches.css";
import Arrow from "../../Assets/Image/arrow_bottom.svg";
import LaunchpadAllLiveLaunchesTemplate from "./LaunchpadAllLiveLaunchesTemplate/LaunchpadAllLiveLaunchesTemplate";
import { useHorizontalScroll } from "../../CustomHook/useHorizontalScroll";
import { v4 as uuidv4 } from "uuid";

const LaunchpadAllLiveLaunches = ({
  setIsLiveLaunchSportDropdownClicked,
  isLiveLaunchSportDropdownClicked,
  data,
  // setDimMain,
  hidePrice,
  handleLiveLaunchesSportDropdownClicked,
}) => {
  const scrollRef = useHorizontalScroll();
  const [dim, setDim] = useState(window.innerWidth);
  const [
    currentLiveLaunchesSportSelectorSelected,
    setCurrentLiveLaunchesSportSelectorSelected,
  ] = useState("All sports");
  const handleDim = () => {
    setDim(window.innerWidth);
    // setDimMain(window.innerWidth);
  };
  function handleLiveLaunchesSportDropdownClicked(e) {
    // console.log(e.target.id);
    if (
      e.target.className == "launchpadalllivelaunches-top-wrap-dropdown" ||
      e.target.className ===
        "launchpadalllivelaunches-top-wrap-dropdown launchpadalllivelaunches-top-wrap-dropdown-clicked" ||
      e.target.id === "launchpadalllivelaunches-dropdown-main" ||
      e.target.id === "launchpadalllivelaunches-dropdown-img" ||
      e.target.id === "launchpadalllivelaunches-dropdown-span"
    ) {
      setIsLiveLaunchSportDropdownClicked(!isLiveLaunchSportDropdownClicked);
    } else {
      setIsLiveLaunchSportDropdownClicked(false);
    }
  }
  const handleLiveLaunchesSportChoiceClicked = (e) => {
    // console.log(e);
    setCurrentLiveLaunchesSportSelectorSelected(e.target.innerHTML);
  };
  let launchpadAllLiveLaunchesDynamicWidth;
  let responsiveWidth;
  let respMaxWidth;
  let respWidthTop;

  let launchpadalllivelaunchesTopWrapSpan;
  let launchpadalllivelaunchesTopWrapDropdown;
  let launchpadalllivelaunchesTopWrapDropdownSpan;
  let launchpadalllivelaunchesTopWrapDropdownImg;
  let launchpadalllivelaunchesTopWrapDropdownChoiceWrap;
  let launchpadalllivelaunchesTopWrapDropdownChoiceWrapUlLiChild1;
  const LaunchpadAllLiveLaunchesCalcProportional = (obj, totalPx) => {
    let Obj = {};
    for (let key in obj) {
      let temp = {
        temp: `${obj[key] * (1 - (1 - dim / totalPx))}px`,
      };
      Obj[key] = temp["temp"];
    }
    return Obj;
  };

  if (dim > 1337) {
    launchpadAllLiveLaunchesDynamicWidth = {
      minWidth: `${data?.length * 520}px`,
    };
    responsiveWidth = {
      marginRight: "20px",
    };
  } else {
    launchpadAllLiveLaunchesDynamicWidth = {
      minWidth: `${data?.length * (520 - (1337 - dim) * (38 / 100))}px`,
    };
    respMaxWidth = {
      maxWidth: `${1337 - (1337 - dim)}px`,
      maxHeight: `${550 * (1 - (1 - dim / 1300))}px`,
      marginTop: `${20 * (1 - (1 - dim / 1300))}px`,
    };
    responsiveWidth = {
      marginRight: "20px",
    };
    respWidthTop = {
      width: `${1246 - (1337 - dim)}px`,
    };
    launchpadalllivelaunchesTopWrapSpan =
      LaunchpadAllLiveLaunchesCalcProportional(
        { fontSize: 35, lineHeight: 42, height: 42 },
        1337
      );
    launchpadalllivelaunchesTopWrapDropdown =
      LaunchpadAllLiveLaunchesCalcProportional(
        { width: 207, height: 37, borderRadius: 10 },
        1337
      );
    launchpadalllivelaunchesTopWrapDropdownSpan =
      LaunchpadAllLiveLaunchesCalcProportional(
        { fontSize: 16, lineHeight: 19, paddingLeft: 10 },
        1337
      );
    launchpadalllivelaunchesTopWrapDropdownImg =
      LaunchpadAllLiveLaunchesCalcProportional(
        {
          paddingRight: 10,
          width: 13,
          heigth: 8,
        },
        1337
      );
    launchpadalllivelaunchesTopWrapDropdownChoiceWrap =
      LaunchpadAllLiveLaunchesCalcProportional(
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
    launchpadalllivelaunchesTopWrapDropdownChoiceWrapUlLiChild1 =
      LaunchpadAllLiveLaunchesCalcProportional({ paddingTop: 5 }, 1337);
  }

  useEffect(() => {
    window.addEventListener("resize", handleDim, false);
  }, []);
  document.documentElement.style.setProperty("--dim", window.innerWidth + "px");

  const liveLaunches = data?.filter((launch, index) => {
    const launchDateSeconds = launch?.launchpad?.launch_date?.seconds;
    return launchDateSeconds ? launchDateSeconds * 1000 < Date.now() : false;
  });
  
  return (
    <div className="launchpadalllivelaunches-component">
      <div
        onClick={handleLiveLaunchesSportDropdownClicked}
        className="launchpadalllivelaunches-top-wrap"
        style={respWidthTop}
      >
        <span style={launchpadalllivelaunchesTopWrapSpan}>Live launches</span>
        {/* Filter */}
        <div
          id="launchpadalllivelaunches-dropdown-main"
          className={
            isLiveLaunchSportDropdownClicked
              ? "launchpadalllivelaunches-top-wrap-dropdown launchpadalllivelaunches-top-wrap-dropdown-clicked"
              : "launchpadalllivelaunches-top-wrap-dropdown"
          }
          style={launchpadalllivelaunchesTopWrapDropdown}
        >
          <span
            id="launchpadalllivelaunches-dropdown-span"
            style={launchpadalllivelaunchesTopWrapDropdownSpan}
          >
            {currentLiveLaunchesSportSelectorSelected}
          </span>
          <img
            id="launchpadalllivelaunches-dropdown-img"
            style={launchpadalllivelaunchesTopWrapDropdownImg}
            src={Arrow}
            alt="dropdown"
          />
          {isLiveLaunchSportDropdownClicked && (
            <>
              <div
                className="launchpadalllivelaunches-top-wrap-dropdown-choice-wrap"
                style={launchpadalllivelaunchesTopWrapDropdownChoiceWrap}
              >
                <ul>
                  {currentLiveLaunchesSportSelectorSelected !== "Voile" && (
                    <li
                      onClick={handleLiveLaunchesSportChoiceClicked}
                      style={
                        launchpadalllivelaunchesTopWrapDropdownChoiceWrapUlLiChild1
                      }
                    >
                      Voile
                    </li>
                  )}
                  {currentLiveLaunchesSportSelectorSelected !== "Tennis" && (
                    <li onClick={handleLiveLaunchesSportChoiceClicked}>
                      Tennis
                    </li>
                  )}
                  {currentLiveLaunchesSportSelectorSelected !== "Football" && (
                    <li onClick={handleLiveLaunchesSportChoiceClicked}>
                      Football
                    </li>
                  )}
                  {currentLiveLaunchesSportSelectorSelected !== "Esport" && (
                    <li onClick={handleLiveLaunchesSportChoiceClicked}>
                      Esport
                    </li>
                  )}
                  {currentLiveLaunchesSportSelectorSelected !==
                    "All sports" && (
                    <li onClick={handleLiveLaunchesSportChoiceClicked}>
                      All sports
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
        {/* ----------------------------------------------------------------------------- */}
      </div>
      <div
        className="launchpadalllivelaunches-bottom-wrap"
        style={respMaxWidth}
        ref={scrollRef}
      >
        <div
          className="launchpadalllivelaunches-bottom-subwrap"
          style={launchpadAllLiveLaunchesDynamicWidth}
        >
          {liveLaunches?.map((launchpadlive, i) => (
            <div key={uuidv4()} style={responsiveWidth}>
              <LaunchpadAllLiveLaunchesTemplate
                key={uuidv4()}
                profilePicture={launchpadlive?.user?.profile_avatar}
                hidePrice={hidePrice}
                background={launchpadlive?.nftCollection?.collection_avatar}
                athleteName={launchpadlive?.user?.display_name}
                title={launchpadlive?.nftCollection?.collection_title}
                nftLength={launchpadlive?.nftCollection?.nft_collection_limit}
                launchDate={launchpadlive?.launch_date}
                // nftPrice={launchpadlive[i].nftPrice}
                dim={dim}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaunchpadAllLiveLaunches;

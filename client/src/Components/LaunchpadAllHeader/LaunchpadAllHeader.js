import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./LaunchpadAllHeader.css";
const LaunchpadAllHeader = ({ data, hidePrice }) => {
  const [dimLaunchpadHeader, setDimLaunchpadHeader] = useState(
    window.innerWidth
  );
  const handleDimLaunchpadHeader = () => {
    setDimLaunchpadHeader(window.innerWidth);
  };
  let launchpadallheaderComponentImg;
  let launchpadallheaderDataContainer;
  let launchpadallheaderDataWrap;
  let launchpadallheaderDataWrapImg;
  let launchpadallheaderDataWrapImgImg;
  let launchpadallheaderDataWrapthletename;
  let launchpadallheaderDataWrapTitle;
  let launchpadallheaderDataWrapDescription;
  let launchpadallheaderDataWrapNft;
  let launchpadallheaderDataWrapButton;
  const LaunchpadAllHeaderCalcProportional = (obj) => {
    let Obj = {};
    for (let key in obj) {
      let temp = {
        temp: `${obj[key] * (1 - (1 - dimLaunchpadHeader / 1300))}px`,
      };
      Obj[key] = temp["temp"];
    }
    return Obj;
  };
  if (dimLaunchpadHeader < 1300) {
    launchpadallheaderComponentImg = LaunchpadAllHeaderCalcProportional({
      borderRadius: 20,
    });
    launchpadallheaderDataContainer = LaunchpadAllHeaderCalcProportional({
      borderRadius: 20,
    });
    launchpadallheaderDataWrap = LaunchpadAllHeaderCalcProportional({
      marginLeft: 40,
    });
    launchpadallheaderDataWrapImg = LaunchpadAllHeaderCalcProportional({
      borderRadius: 5,
      width: 50,
      height: 50,
      marginBottom: 10,
    });
    launchpadallheaderDataWrapImgImg = LaunchpadAllHeaderCalcProportional({
      borderRadius: 5,
      width: 46,
      height: 46,
    });
    launchpadallheaderDataWrapthletename = LaunchpadAllHeaderCalcProportional({
      lineHeight: 19,
      fontSize: 16,
    });
    launchpadallheaderDataWrapTitle = LaunchpadAllHeaderCalcProportional({
      lineHeight: 42,
      fontSize: 35,
      marginTop: 6,
    });
    launchpadallheaderDataWrapDescription = LaunchpadAllHeaderCalcProportional({
      lineHeight: 19,
      fontSize: 16,
      maxWidth: 552,
      marginTop: 5,
    });
    launchpadallheaderDataWrapNft = LaunchpadAllHeaderCalcProportional({
      lineHeight: 19,
      fontSize: 16,
      marginTop: 15,
      marginBottom: 25,
    });
    launchpadallheaderDataWrapButton = LaunchpadAllHeaderCalcProportional({
      marginBottom: 40,
      width: 117,
      height: 44,
      borderRadius: 5,
      fontSize: 20,
    });
  }
  useEffect(() => {
    window.addEventListener("resize", handleDimLaunchpadHeader, false);
  }, []);
  function redirectTo() {
    window.location.href = "/collectionlive";
  }
  return (
    <div className="launchpadallheader-component">
      <img
        src={data?.img}
        alt="background"
        style={launchpadallheaderComponentImg}
      />
      <div
        className="launchpadallheader-data-container"
        style={launchpadallheaderDataContainer}
      >
        <div
          className="launchpadallheader-data-wrap"
          style={launchpadallheaderDataWrap}
        >
          <a href="/athleteprofile" className="launchpadallheader-data-wrap-img-and-name">
            <div
              className="launchpadallheader-data-wrap-img"
              style={launchpadallheaderDataWrapImg}
            >
              <img
                src={data?.profile_avatar}
                alt="profile"
                style={launchpadallheaderDataWrapImgImg}
              />
            </div>
            <span
              className="launchpadallheader-data-wrap-athletename"
              style={launchpadallheaderDataWrapthletename}
            >
              by {data?.display_name}
            </span>
          </a>
          <span
            className="launchpadallheader-data-wrap-title"
            style={launchpadallheaderDataWrapTitle}
          >
            {data?.title}
          </span>
          <span
            className="launchpadallheader-data-wrap-description"
            style={launchpadallheaderDataWrapDescription}
          >
            {data?.description}
          </span>
          <span
            className="launchpadallheader-data-wrap-nft"
            style={launchpadallheaderDataWrapNft}
          >
            {data?.item_number} items{" "}
            {hidePrice ? <></> : <>- {data?.item_number} ETH</>}
          </span>
          <Button onClick={redirectTo} active="button-active-props" hover="button-hover-props" text="Découvrir" style={launchpadallheaderDataWrapButton} />
        </div>
      </div>
    </div>
  );
};

export default LaunchpadAllHeader;

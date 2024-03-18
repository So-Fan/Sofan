import React, { useState, useEffect } from "react";
import "./LaunchpadAllLiveLaunchesTemplate.css";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
const LaunchpadAllLiveLaunchesTemplate = ({
  background,
  profilePicture,
  athleteName,
  title,
  nftLength,
  // nftPrice,
  dim,
  hidePrice,
  launchDate,
  launchpadlive,
}) => {
  const [isComponentActive, setIsComponentActive] = useState(true);

  const handleMouseDown = () => {
    setIsComponentActive(false);
  };

  const handleMouseUp = () => {
    setIsComponentActive(true);
  };
  let launchpadalllivelaunchestemplateComponentImg;
  let launchpadalllivelaunchestemplateDataContainer;
  let launchpadalllivelaunchestemplateDataContainerLiveWrap;
  let launchpadalllivelaunchestemplateDataContainerLiveWrapDiv;
  let launchpadalllivelaunchestemplateDataContainerLiveWrapSpan;
  let launchpadalllivelaunchestemplateDataWrap;
  let launchpadalllivelaunchestemplateDataWrapImg;
  let launchpadalllivelaunchestemplateDataWrapImgImg;
  let launchpadalllivelaunchestemplateDataWrapAthletename;
  let launchpadalllivelaunchestemplateDataWrapTitle;
  let launchpadalllivelaunchestemplateDataWrapNft;
  let launchpadalllivelaunchestemplateDataWrapButton;
  const LaunchpadAllLiveLaunchesTemplateCalcProportional = (obj, totalPx) => {
    let Obj = {};
    for (let key in obj) {
      let temp = {
        temp: `${obj[key] * (1 - (1 - dim / totalPx))}px`,
      };
      Obj[key] = temp["temp"];
    }
    return Obj;
  };
  if (dim < 1337) {
    launchpadalllivelaunchestemplateComponentImg =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { borderRadius: 20 },
        1337
      );
    launchpadalllivelaunchestemplateDataContainer =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { borderRadius: 20 },
        1337
      );
    launchpadalllivelaunchestemplateDataContainerLiveWrap =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        {
          top: 20,
          left: 20,
          width: 86.05,
          height: 34.68,
          borderRadius: 7.36842,
        },
        1337
      );
    launchpadalllivelaunchestemplateDataContainerLiveWrapDiv =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { width: 9.21, height: 9.21, marginRight: 9.21 },
        1337
      );
    launchpadalllivelaunchestemplateDataContainerLiveWrapSpan =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { fontSize: 25.7895, lineHeight: 17 },
        1337
      );
    launchpadalllivelaunchestemplateDataWrap =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { marginLeft: 30 },
        1337
      );
    launchpadalllivelaunchestemplateDataWrapImg =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { borderRadius: 5, width: 50, height: 50, marginBottom: 10 },
        1337
      );
    launchpadalllivelaunchestemplateDataWrapImgImg =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { width: 46, height: 46, borderRadius: 5 },
        1337
      );
    launchpadalllivelaunchestemplateDataWrapAthletename =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { lineHeight: 19, fontSize: 16 },
        1337
      );
    launchpadalllivelaunchestemplateDataWrapTitle =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { fontSize: 35, lineHeight: 42, marginTop: 6 },
        1337
      );
    launchpadalllivelaunchestemplateDataWrapNft =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        { fontSize: 16, lineHeight: 19, marginTop: 15, marginBottom: 25 },
        1337
      );
    launchpadalllivelaunchestemplateDataWrapButton =
      LaunchpadAllLiveLaunchesTemplateCalcProportional(
        {
          width: 117,
          height: 44,
          borderRadius: 5,
          fontSize: 20,
          marginBottom: 30,
        },
        1337
      );
  }
  useEffect(() => {
    const currentTime = Date.now();
    // console.log(launchDate)
  }, []);

  function redirectTo() {
    window.location.href = `/collectionlive/${launchpadlive?.nftCollection?.athlete_id}/${launchpadlive.nftCollection?.collection_address}`;
  }
  return (
    <div
      className={`launchpadalllivelaunchestemplate-component ${
        isComponentActive ? "" : "no-active-effect"
      }`}
    >
      <Link
        to={`/collectionlive/${launchpadlive?.nftCollection?.athlete_id}/${launchpadlive.nftCollection?.collection_address}`}
        className="launchpadalllivelaunchestemplate-link"
      >
        <img
          src={background}
          alt="background"
          style={launchpadalllivelaunchestemplateComponentImg}
        />
        <div
          className="launchpadalllivelaunchestemplate-data-container"
          style={launchpadalllivelaunchestemplateDataContainer}
        >
          <div
            className="launchpadalllivelaunchestemplate-data-container-live-wrap"
            style={launchpadalllivelaunchestemplateDataContainerLiveWrap}
          >
            <div
              style={launchpadalllivelaunchestemplateDataContainerLiveWrapDiv}
            ></div>
            <span
              style={launchpadalllivelaunchestemplateDataContainerLiveWrapSpan}
            >
              live
            </span>
          </div>
          <div
            className="launchpadalllivelaunchestemplate-data-wrap"
            style={launchpadalllivelaunchestemplateDataWrap}
          >
            <Link
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              to={`/athleteprofile/${launchpadlive.nftCollection?.athlete_id}`}
              className="launchpadalllivelaunchestemplate-data-image-and-name"
            >
              <div
                className="launchpadalllivelaunchestemplate-data-wrap-img"
                style={launchpadalllivelaunchestemplateDataWrapImg}
              >
                <img
                  src={profilePicture}
                  alt="profile"
                  style={launchpadalllivelaunchestemplateDataWrapImgImg}
                />
              </div>
              <span
                className="launchpadalllivelaunchestemplate-data-wrap-athletename"
                style={launchpadalllivelaunchestemplateDataWrapAthletename}
              >
                by {athleteName}
              </span>
            </Link>
            <span
              className="launchpadalllivelaunchestemplate-data-wrap-title"
              style={launchpadalllivelaunchestemplateDataWrapTitle}
            >
              {title}
            </span>
            <span
              className="launchpadalllivelaunchestemplate-data-wrap-nft"
              style={launchpadalllivelaunchestemplateDataWrapNft}
            >
              {nftLength} items
              {/* {hidePrice ? <></> : <>- {nftPrice} ETH</>} */}
            </span>
            <Button
              onClick={redirectTo}
              text="Découvrir"
              style={launchpadalllivelaunchestemplateDataWrapButton}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LaunchpadAllLiveLaunchesTemplate;

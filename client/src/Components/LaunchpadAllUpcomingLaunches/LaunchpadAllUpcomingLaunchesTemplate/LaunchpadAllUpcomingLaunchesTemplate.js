import React, { useState, useEffect } from "react";
import "./LaunchpadAllUpcomingLaunchesTemplate.css";
const LaunchpadAllUpcomingLaunchesTemplate = ({
  background,
  profilePicture,
  athleteName,
  title,
  nftLength,
  nftPrice,
  date,
  dim,
  hidePrice,
}) => {
  const [isComponentActive, setIsComponentActive] = useState(true);
  const [isSecondPlural, setIsSecondPlural] = useState(false);
  const [isMinutePlural, setIsMinutePlural] = useState(false);
  const [isHourPlural, setIsHourPlural] = useState(false);
  const [isDayPlural, setIsDayPlural] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // function handlePlural() {
  //   if (date?.seconds > 1) {
  //     setIsSecondPlural(true);
  //   }
  //   if (date?.minutes > 1) {
  //     setIsMinutePlural(true);
  //   }
  //   if (date?.hours > 1) {
  //     setIsHourPlural(true);
  //   }
  //   if (date?.days > 1) {
  //     setIsDayPlural(true);
  //   }
  // }
  useEffect(() => {
    // handlePlural();
  }, []);
  const handleMouseDown = () => {
    setIsComponentActive(false);
  };

  const handleMouseUp = () => {
    setIsComponentActive(true);
  };

  let launchpadallUpcominglaunchestemplateComponentImg;
  let launchpadallUpcominglaunchestemplateDataContainer;
  let launchpadallUpcominglaunchestemplateDataWrap;
  let launchpadallUpcominglaunchestemplateDataWrapImg;
  let launchpadallUpcominglaunchestemplateDataWrapImgImg;
  let launchpadallUpcominglaunchestemplateDataWrapAthletename;
  let launchpadallUpcominglaunchestemplateDataWrapTitle;
  let launchpadallUpcominglaunchestemplateDataWrapNft;
  let launchpadallUpcominglaunchestemplateDataWrapHourWrap;
  let launchpadallUpcominglaunchestemplateDataWrapHourWrapDiv;
  let launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan;
  const LaunchpadAllUpcomingLaunchesTemplateCalcProportional = (obj) => {
    let Obj = {};
    for (let key in obj) {
      let temp = {
        temp: `${obj[key] * (1 - (1 - dim / 1337))}px`,
      };
      Obj[key] = temp["temp"];
    }
    return Obj;
  };
  if (dim < 1337) {
    launchpadallUpcominglaunchestemplateComponentImg =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        borderRadius: 20,
      });
    launchpadallUpcominglaunchestemplateDataContainer =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        borderRadius: 20,
      });
    launchpadallUpcominglaunchestemplateDataWrap =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({ marginLeft: 30 });
    launchpadallUpcominglaunchestemplateDataWrapImg =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        borderRadius: 5,
        width: 50,
        height: 50,
        marginBottom: 10,
      });
    launchpadallUpcominglaunchestemplateDataWrapImgImg =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        width: 46,
        height: 46,
        borderRadius: 5,
      });
    launchpadallUpcominglaunchestemplateDataWrapAthletename =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        lineHeight: 19,
        fontSize: 16,
      });
    launchpadallUpcominglaunchestemplateDataWrapTitle =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        fontSize: 35,
        lineHeight: 42,
        marginTop: 6,
      });
    launchpadallUpcominglaunchestemplateDataWrapNft =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        fontSize: 16,
        lineHeight: 19,
        marginTop: 15,
        marginBottom: 25,
      });
    launchpadallUpcominglaunchestemplateDataWrapHourWrap =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        maxWidth: 240,
        maxHeight: 50,
        marginBottom: 30,
      });
    launchpadallUpcominglaunchestemplateDataWrapHourWrapDiv =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        borderRadius: 10,
        width: 50,
        height: 50,
        marginRight: 10,
      });
    launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan =
      LaunchpadAllUpcomingLaunchesTemplateCalcProportional({
        fontSize: 14,
        lineHeight: 17,
      });
  }
  useEffect(() => {
    // Mettre à jour le compte à rebours toutes les secondes
    const intervalId = setInterval(() => {
      const now = Date.now();
      const distance = date * 1000 - now;

      const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesLeft = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(daysLeft);
      setHours(hoursLeft);
      setMinutes(minutesLeft);
      setSeconds(secondsLeft);

      // Mettre à jour les états de pluriel
      setIsDayPlural(daysLeft !== 1);
      setIsHourPlural(hoursLeft !== 1);
      setIsMinutePlural(minutesLeft !== 1);
      setIsSecondPlural(secondsLeft !== 1);
    }, 1000);

    // Effacer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [date]); // Dépendance à 'date' pour recalculer si la date change
  //console.log(date);
  return (
    <div
      className={`launchpadallupcominglaunchesTemplate-component ${
        isComponentActive ? "" : "no-active-effect"
      }`}
    >
      <a
        className="launchpadallupcominglaunchesTemplate-link"
        href="/nftcollection"
      >
        <img
          src={background}
          alt="background"
          style={launchpadallUpcominglaunchestemplateComponentImg}
        />
        <div
          className="launchpadallupcominglaunchesTemplate-data-container"
          style={launchpadallUpcominglaunchestemplateDataContainer}
        >
          <div
            className="launchpadallupcominglaunchesTemplate-data-wrap"
            style={launchpadallUpcominglaunchestemplateDataWrap}
          >
            <a
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              href="/athleteprofile"
              className="launchpadallupcominglaunchesTemplate-data-img-and-name"
            >
              <div
                className="launchpadallupcominglaunchesTemplate-data-wrap-img"
                style={launchpadallUpcominglaunchestemplateDataWrapImg}
              >
                <img
                  src={profilePicture}
                  alt="profile"
                  style={launchpadallUpcominglaunchestemplateDataWrapImgImg}
                />
              </div>
              <span
                className="launchpadallupcominglaunchesTemplate-data-wrap-athletename"
                style={launchpadallUpcominglaunchestemplateDataWrapAthletename}
              >
                by {athleteName}
              </span>
            </a>
            <span
              className="launchpadallupcominglaunchesTemplate-data-wrap-title"
              style={launchpadallUpcominglaunchestemplateDataWrapTitle}
            >
              {title}
            </span>
            <span
              className="launchpadallupcominglaunchesTemplate-data-wrap-nft"
              style={launchpadallUpcominglaunchestemplateDataWrapNft}
            >
              {nftLength} items
              {hidePrice ? <></> : <>- {nftPrice} ETH</>}
            </span>
            <div
              className="launchpadallupcominglaunchesTemplate-data-wrap-hour-wrap"
              style={launchpadallUpcominglaunchestemplateDataWrapHourWrap}
            >
              <div
                style={launchpadallUpcominglaunchestemplateDataWrapHourWrapDiv}
              >
                <span
                  style={
                    launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan
                  }
                >
                  {days}
                </span>
                <span
                  style={
                    launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan
                  }
                >
                  jour{isDayPlural && <>s</>}
                </span>
              </div>
              <div
                style={launchpadallUpcominglaunchestemplateDataWrapHourWrapDiv}
              >
                <span
                  style={
                    launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan
                  }
                >
                  {hours}
                </span>
                <span
                  style={
                    launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan
                  }
                >
                  heure{isHourPlural && <>s</>}
                </span>
              </div>
              <div
                style={launchpadallUpcominglaunchestemplateDataWrapHourWrapDiv}
              >
                <span
                  style={
                    launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan
                  }
                >
                  {minutes}
                </span>
                <span
                  style={
                    launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan
                  }
                >
                  min{isMinutePlural && <>s</>}
                </span>
              </div>
              <div
                style={launchpadallUpcominglaunchestemplateDataWrapHourWrapDiv}
              >
                <span
                  style={
                    launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan
                  }
                >
                  {seconds}
                </span>
                <span
                  style={
                    launchpadallUpcominglaunchestemplateDataWrapHourWrapDivSpan
                  }
                >
                  sec{isSecondPlural && <>s</>}
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default LaunchpadAllUpcomingLaunchesTemplate;

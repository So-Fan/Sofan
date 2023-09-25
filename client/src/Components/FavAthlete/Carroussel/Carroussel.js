import React, { useEffect, useState } from "react";
import AthleteTemplate from "../AthleteTemplate/AthleteTemplate";
import LeBron from "../fakeData/lebron.svg";
import Mbappe from "../fakeData/mbappe.svg";
import RightArrow from "../../../Assets/Image/right_arrow.svg";
import "./Carroussel.css";
import { v4 as uuidv4 } from "uuid";
const Carroussel = ({ athletesFollowing, athletesSupportingData }) => {
  const [rightArrowClicked, setRightArrowClicked] = useState(false);
  const [leftArrowClicked, setLeftArrowClicked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isTotalElementsEqualTwo, setIsTotalElementsEqualTwo] = useState();

  const fakeArray = [
    {
      firstName: "James",
      surName: "Lebron",
      img: LeBron,
      id: 0,
      interaction: 15,
      isFan: false,
    },
    {
      firstName: "Kylian",
      surName: "Mbappe",
      img: Mbappe,
      id: 1,
      interaction: 18,
      isFan: true,
    },
    {
      firstName: "James2",
      surName: "Lebron2",
      img: LeBron,
      id: 2,
      interaction: 12,
      isFan: true,
    },
    {
      firstName: "Kylian2",
      surName: "Mbappe2",
      img: Mbappe,
      id: 3,
      interaction: 8,
      isFan: false,
    },
  ];
  const userFanAthlete = fakeArray.filter((athlete) => athlete.isFan === true);
  const userRecommandationAthlete = fakeArray.filter(
    (athlete) => athlete.isFan === false
  );

  userRecommandationAthlete.sort(function (a, b) {
    return b.interaction - a.interaction;
  });

  const filteredArray = [...userFanAthlete, ...userRecommandationAthlete];
  const arrayLength = fakeArray.length;

  const handleRightArrowClicked = () => {
    setRightArrowClicked(true);
  };
  const handleLeftArrowClicked = () => {
    setLeftArrowClicked(true);
  };

  const style = {
    transform: `translateX(${
      counter +
      10 -
      (athletesFollowing.length + athletesSupportingData.length) * 5
    }px)`,
    transition: "all .5s ease-in-out",
  };
  const style2 = {
    transform: `translateX(${counter}px)`,
    transition: "all .5s ease-in-out",
  };

  useEffect(() => {
    if (rightArrowClicked) {
      setCounter(counter - 120);
      setRightArrowClicked(false);
    }
    if (leftArrowClicked) {
      setCounter(counter + 120);
      setLeftArrowClicked(false);
    }
  }, [rightArrowClicked, leftArrowClicked, counter]);
  // console.log("athletesSupportingData --> ",athletesSupportingData)
  useEffect(() => {
    if (athletesSupportingData.length + athletesFollowing.length === 2) {
      // console.log(
      //   "il y a moins de 3 éléments --> ",
      //   athletesFollowing.length + athletesSupportingData.length
      // );
      setIsTotalElementsEqualTwo(true);
    } else {
      setIsTotalElementsEqualTwo(false);
    }
  }, [athletesFollowing, athletesSupportingData]);
  // console.log(athletesFollowing)
  const maxTranslateX = -(
    (athletesFollowing.length + athletesSupportingData.length - 1) *
    120
  );
  athletesFollowing = athletesFollowing.filter((athleteFollowing) => {
    return !athletesSupportingData.some((athleteSupporting) => {
      return athleteFollowing.athleteId === athleteSupporting.athlete_id;
    });
  });
  return (
    <div className="carroussel-section">
      <div className="carroussel-athlete-wrap">
        <div
          className="carroussel-athlete-subwrap"
          style={{
            ...(athletesSupportingData.length + athletesFollowing.length === 2
              ? {}
              : { justifyContent: "space-between" }),
            ...(counter !==
            (athletesSupportingData.length + athletesFollowing.length - 2) *
              120 *
              -1
              ? style2
              : style),
          }}
        >
          {athletesSupportingData.map((athleteSupporting) => {
            return (
              <div key={uuidv4()} className="athlete-template-container">
                <AthleteTemplate
                  href={`/athleteprofile/${athleteSupporting.athlete_id}`}
                  src={athleteSupporting.profile_avatar}
                  athleteName={athleteSupporting.display_name}
                  isFan={true}
                />
              </div>
            );
          })}
          {athletesFollowing.map((athlete) => {
            return (
              <div key={uuidv4()} className="athlete-template-container">
                <AthleteTemplate
                  href={`/athleteprofile/${athlete.athleteId}`}
                  src={athlete.profile_avatar}
                  athleteName={athlete.display_name}
                  // isFan={athlete.isFan}
                />
              </div>
            );
          })}
          {/* {isTotalElementsEqualTwo && (
            <>
            <div
              // style={{ visibility: "hidden" }}
              className="athlete-template-container"
              >
              
              <AthleteTemplate
              // href={`/athleteprofile/${athlete.athleteId}`}
              // src={athlete.profile_avatar}
              // athleteName={athlete.username}
              // isFan={athlete.isFan}
              />
            </div>
            <div
              // style={{ visibility: "hidden" }}
              className="athlete-template-container"
              >
              
              <AthleteTemplate
              // href={`/athleteprofile/${athlete.athleteId}`}
              // src={athlete.profile_avatar}
              // athleteName={athlete.username}
              // isFan={athlete.isFan}
              />
            </div>
              </>
          )} */}
        </div>
      </div>
      {athletesSupportingData.length + athletesFollowing.length <= 2 ? (
        <></>
      ) : (
        <>
          {counter !== maxTranslateX && (
            <div
              onClick={handleRightArrowClicked}
              className="carroussel-right-arrow-wrap"
            >
              <img src={RightArrow} alt="right arrow" />
            </div>
          )}
        </>
      )}
      {counter <= -120 && (
        <div
          onClick={handleLeftArrowClicked}
          className="carroussel-left-arrow-wrap"
        >
          <img src={RightArrow} alt="left arrow" />
        </div>
      )}
    </div>
  );
};

export default Carroussel;

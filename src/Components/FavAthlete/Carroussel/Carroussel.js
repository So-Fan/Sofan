import React, { useEffect, useState } from "react";
import AthleteTemplate from "../AthleteTemplate/AthleteTemplate";
import LeBron from "../fakeData/lebron.svg";
import Mbappe from "../fakeData/mbappe.svg";
import RightArrow from "../../../Assets/image/right_arrow.svg";
import "./Carroussel.css";
const Carroussel = () => {
  const [rightArrowClicked, setRightArrowClicked] = useState(false);
  const [leftArrowClicked, setLeftArrowClicked] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleRightArrowClicked = () => {
    setRightArrowClicked(true);
  };
  const handleLeftArrowClicked = () => {
    setLeftArrowClicked(true);
  };

  const style = {
    transform: `translateX(${counter + 60}px)`,
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
  }, [rightArrowClicked, leftArrowClicked]);

  const fakeArray = [
    {
      firstName: "James",
      surName: "Lebron",
      img: LeBron,
      id: 0,
      interaction: 15,
    },
    {
      firstName: "Kylian",
      surName: "Mbappe",
      img: Mbappe,
      id: 1,
      interaction: 18,
    },
    {
      firstName: "James",
      surName: "Lebron",
      img: LeBron,
      id: 2,
      interaction: 12,
    },
    {
      firstName: "Kylian",
      surName: "Mbappe",
      img: Mbappe,
      id: 3,
      interaction: 8,
    },
  ];
  fakeArray.forEach((athlete)=> {
    
  })
  const arrayLength = fakeArray.length;

  return (
    <div className="carroussel-section">
      <div className="carroussel-athlete-wrap">
        <div className="carroussel-athlete-subwrap" style={counter !== ((arrayLength - 2) * 120) * -1 ? style2 : style}>
          {fakeArray.map((athlete) => {
            return (
              <div className="athlete-template-container">
                <AthleteTemplate
                  href={`/profile/${athlete.id}`}
                  src={athlete.img}
                  athleteName={athlete.surName + " " + athlete.firstName}
                />
              </div>
            );
          })}
        </div>
      </div>
      {counter !== ((arrayLength - 2) * 120) * -1 &&<div
        onClick={handleRightArrowClicked}
        className="carroussel-right-arrow-wrap"
      >
        <img src={RightArrow} alt="right arrow" />
      </div>}
      {counter <= -120 && <div
        onClick={handleLeftArrowClicked}
        className="carroussel-left-arrow-wrap"
      >
        <img src={RightArrow} alt="left arrow" />
      </div>}
    </div>
  );
};

export default Carroussel;

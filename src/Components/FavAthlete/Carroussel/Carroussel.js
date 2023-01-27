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
    setRightArrowClicked(true)
  }
  const handleLeftArrowClicked = () => {
    setLeftArrowClicked(true)
  }

  const style ={
    transform: `translateX(${counter}px)`,
    transition: "all .5s ease-in-out"
  }
  useEffect(() => {
    if(rightArrowClicked){
      setCounter(counter-120)
      setRightArrowClicked(false)
    }
    if(leftArrowClicked){
      setCounter(counter+120)
      setLeftArrowClicked(false)
    }
  
  }, [rightArrowClicked, leftArrowClicked]);
  

  return (
    <div className="carroussel-section">
      <div className="carroussel-athlete-wrap">
        <div className="carroussel-athlete-subwrap" style={style}>
          <AthleteTemplate
            href={"/profile/lebron"}
            src={LeBron}
            athleteName={"Lebron James"}
          />
          <AthleteTemplate
            href={"/profile/lebron"}
            src={Mbappe}
            athleteName={"Kylian Mbappe"}
          />
          <AthleteTemplate
            href={"/profile/lebron"}
            src={LeBron}
            athleteName={"Lebron James"}
          />
        </div>
      </div>
      <div onClick={handleRightArrowClicked} className="carroussel-right-arrow-wrap">
        <img src={RightArrow} alt="right arrow" />
      </div>
      <div onClick={handleLeftArrowClicked} className="carroussel-left-arrow-wrap">
        <img src={RightArrow} alt="left arrow" />
      </div>
    </div>
  );
};

export default Carroussel;

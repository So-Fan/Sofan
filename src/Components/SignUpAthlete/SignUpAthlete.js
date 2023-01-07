import React, { useState } from "react";
import FirstStep from "../Form/FirstStep/FirstStep";
import SecondStep from "../Form/SecondStep/SecondStep";
import ThirdStep from "../Form/ThirdStep/ThirdStep";
import PageNumber from "../Form/PageNumber/PageNumber";
import "./SignUpAthlete.css";

function SignUpAthlete() {
  const [buttonNextSelected, setButtonNextSelected] = useState(false);
  const [pageNumberState, setPageNumberState] = useState(1);
  const [allPagesNumber, setAllPagesNumber] = useState({
    stepOne: false,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
  });
  function stepDisplayer() {
    console.log("pgkjigjroj")
    if (pageNumberState === 1) {
      setAllPagesNumber(allPagesNumber.stepOne === true);
    }
    else if (pageNumberState === 2) {
      setAllPagesNumber(allPagesNumber.stepTwo ===true )
    }
  }
  return (
    <>
      <div onClick={stepDisplayer} className="page-container">
      
        <PageNumber pageNumberState={pageNumberState} />
        {allPagesNumber.stepOne && 
        <>LA VIE Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim non quia similique dolorum accusamus delectus animi fugit cum neque, saepe voluptatem vero cumque architecto debitis recusandae. Quo aliquam accusantium debitis.</>
        }
        <FirstStep
          pageNumberState={pageNumberState}
          setPageNumberState={setPageNumberState}
          buttonNextSelected={buttonNextSelected}
          setButtonNextSelected={setButtonNextSelected}
        />
        {/* <SecondStep /> */}
        {/* <ThirdStep/> */}
      </div>
    </>
  );
}
export default SignUpAthlete;

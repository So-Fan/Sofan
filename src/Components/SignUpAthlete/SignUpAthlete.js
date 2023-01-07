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
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
  });
  function stepDisplayer() {
    if (pageNumberState === 1) {
      setAllPagesNumber({
        ...allPagesNumber,
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        stepFour: false,
      });
    } else if (pageNumberState === 2) {
      setAllPagesNumber({
        ...allPagesNumber,
        stepOne: false,
        stepTwo: true,
        stepThree: false,
        stepFour: false,
      });
    } else if (pageNumberState === 3) {
      setAllPagesNumber({
        ...allPagesNumber,
        stepOne: false,
        stepTwo: false,
        stepThree: true,
        stepFour: false,
      });
    } else if (pageNumberState === 4) {
      setAllPagesNumber({
        ...allPagesNumber,
        stepOne: false,
        stepTwo: false,
        stepThree: false,
        stepFour: true,
      });
    }
  }
  return (
    <>
      <div onClick={stepDisplayer} className="page-container">
        <PageNumber pageNumberState={pageNumberState} />
        {allPagesNumber.stepOne && (
          <FirstStep
            pageNumberState={pageNumberState}
            setPageNumberState={setPageNumberState}
            buttonNextSelected={buttonNextSelected}
            setButtonNextSelected={setButtonNextSelected}
          />
        )}

        {allPagesNumber.stepTwo && (
          <>
            <SecondStep />
          </>
        )}
        {allPagesNumber.stepThree && (
          <>
            <ThirdStep />
          </>
        )}
      </div>
    </>
  );
}
export default SignUpAthlete;

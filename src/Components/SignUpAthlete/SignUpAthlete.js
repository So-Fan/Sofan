import React, { useState } from "react";
import FirstStep from "../Form/FirstStep/FirstStep";
import SecondStep from "../Form/SecondStep/SecondStep";
import ThirdStep from "../Form/ThirdStep/ThirdStep";
import FourthStep from "../Form/FourthStep/FourthStep";
import "./SignUpAthlete.css";

function SignUpAthlete() {
  const [buttonNextSelected, setButtonNextSelected] = useState(false);
  const [pageNumberState, setPageNumberState] = useState(1);
  const [step, setStep] = useState(1);
  const [agent, setAgent] = useState(false);
  const [sportif, setSportif] = useState(false);
  
  if (step === 1) {
    return (
      <>
        <div className="page-container">
          <div style={{ fontSize: "18px" }}>{step}/4</div>
          <FirstStep
            // état sélections boutons en props
            agent={agent}
            setAgent={setAgent}
            sportif={sportif}
            setSportif={setSportif}
            setStep={setStep}
            pageNumberState={pageNumberState}
            setPageNumberState={setPageNumberState}
            buttonNextSelected={buttonNextSelected}
            setButtonNextSelected={setButtonNextSelected}
          />
        </div>
      </>
    );
  } else if (step === 2) {
    return (
      <>
        <div className="page-container">
          <div style={{ fontSize: "18px" }}>{step}/4</div>
          <SecondStep setStep={setStep} />
        </div>
      </>
    );
  } 
  else if (step === 3) {
    return (
      <>
        <div className="page-container">
          <div style={{ fontSize: "18px" }}>{step}/4</div>
          <ThirdStep
          setStep={setStep}
          />
        </div>
      </>
    );
  }
  else if (step === 4) {
    return (
      <>
        <div className="page-container">
          <div style={{ fontSize: "18px" }}>{step}/4</div>
          <FourthStep
          setStep={setStep}
          />
        </div>
      </>
    );
  }
}
export default SignUpAthlete;

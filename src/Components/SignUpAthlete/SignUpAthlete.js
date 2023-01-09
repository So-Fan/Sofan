import React, { useState } from "react";
import AppProgressBar from "../Form/ProgressBar/AppProgressBar.js";
import FirstStep from "../Form/FirstStep/FirstStep";
import SecondStep from "../Form/SecondStep/SecondStep";
import ThirdStep from "../Form/ThirdStep/ThirdStep";
import FourthStep from "../Form/FourthStep/FourthStep";
import "./SignUpAthlete.css";

function SignUpAthlete() {
  const [step, setStep] = useState(1);
  const [agent, setAgent] = useState(false);
  const [sportif, setSportif] = useState(false);
  const [progressValue, setProgressValue] = useState(5);
  // Delete the return code when styling CSS is finish
  // -------------------------------------------
  return (
    <>
      <div className="page-container">
        <div style={{ fontSize: "18px" }}>{step}/4</div>
        <FirstStep
          agent={agent}
          setAgent={setAgent}
          sportif={sportif}
          setSportif={setSportif}
          setStep={setStep}
        />
        <div className="progress-bar-container">
          <AppProgressBar 
            min={5}
            progressValue={10}
          />
        </div>
      </div>
    </>
  );
  // ---------------------------------------------
  if (step === 1) {
    return (
      <>
        <div className="page-container">
          <div style={{ fontSize: "18px" }}>{step}/4</div>
          <FirstStep
            agent={agent}
            setAgent={setAgent}
            sportif={sportif}
            setSportif={setSportif}
            setStep={setStep}
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
  } else if (step === 3) {
    return (
      <>
        <div className="page-container">
          <div style={{ fontSize: "18px" }}>{step}/4</div>
          <ThirdStep setStep={setStep} />
        </div>
      </>
    );
  } else if (step === 4) {
    return (
      <>
        <div className="page-container">
          <div style={{ fontSize: "18px" }}>{step}/4</div>
          <FourthStep setStep={setStep} />
        </div>
      </>
    );
  }
}
export default SignUpAthlete;

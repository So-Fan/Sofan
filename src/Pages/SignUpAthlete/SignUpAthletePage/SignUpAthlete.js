import React, { useState } from "react";
import AppProgressBar from "../../ProgressBar/AppProgressBar.js";
import FirstStep from "../../FormSteps/FirstStep/FirstStep";
import SecondStep from "../../FormSteps/SecondStep/SecondStep";
import ThirdStep from "../../FormSteps/ThirdStep/ThirdStep";
import FourthStep from "../../FormSteps/FourthStep/FourthStep";


function SignUpAthlete() {
  const [step, setStep] = useState(1);
  const [agent, setAgent] = useState(false);
  const [sportif, setSportif] = useState(false);
  const [progressValue, setProgressValue] = useState(5);
  // Delete the return code when styling CSS is finish
  // -------------------------------------------
  return (
    <>
        <FirstStep
          agent={agent}
          setAgent={setAgent}
          sportif={sportif}
          setSportif={setSportif}
          setStep={setStep}
        />
    </>
  );
  // ---------------------------------------------
  if (step === 1) {
    return (
      <>
          <FirstStep
            agent={agent}
            setAgent={setAgent}
            sportif={sportif}
            setSportif={setSportif}
            setStep={setStep}
          />
      </>
    );
  } else if (step === 2) {
    return (
      <>
          <SecondStep setStep={setStep} />
      </>
    );
  } else if (step === 3) {
    return (
      <>
          <ThirdStep setStep={setStep} />
      </>
    );
  } else if (step === 4) {
    return (
      <>
          <FourthStep setStep={setStep} />
      </>
    );
  }
}
export default SignUpAthlete;

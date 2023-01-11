import React, { useState } from "react";
import AppProgressBar from "../../Components/AppProgressBar/AppProgressBar";
import FirstStep from "./FormSteps/FirstStep/FirstStep";
import SecondStep from "./FormSteps/SecondStep/SecondStep";
import ThirdStep from "./FormSteps/ThirdStep/ThirdStep";
import FourthStep from "./FormSteps/FourthStep/FourthStep";
import "../SignUpAthlete/SignUpAthletePage/SignUpAthlete.css";

function SignUpAthletePage() {
  const [step, setStep] = useState(1);
  const [agent, setAgent] = useState(false);
  const [sportif, setSportif] = useState(false);
  const [progressValue, setProgressValue] = useState(5);
  const [isFirstStepValidated, setIsFirstStepValidated] = useState(false);
  const [isSecondStepValidated, setSecondStepValidated] = useState(false);
  const [isThirdStepValidated, setIsThirdStepValidated] = useState(false);
  
  const handleStepPages = () => {
    if (step === 1) {
      return (
        <FirstStep
          agent={agent}
          setAgent={setAgent}
          sportif={sportif}
          setSportif={setSportif}
          setIsFirstStepValidated={setIsFirstStepValidated}
        />
      );
    } else if (step === 2) {
      return <SecondStep setSecondStepValidated={setSecondStepValidated} />;
    } else if (step === 3) {
      return <ThirdStep setIsThirdStepValidated={setIsThirdStepValidated} />;
    } else if (step === 4) {
      return (
        <FourthStep
        // setIsFourthStepValidated={setIsFourthStepValidated}
        />
      );
    }
  };
  const progressBar = () => {
    if (step === 1) return 10;
    else if (step === 2) {
      return 25;
    } else if (step === 3) {
      return 50;
    } else if (step === 4) {
      return 75;
    }
  };

  const handleNextStep = () => {
    if (isFirstStepValidated) {
      setStep(2);
      console.log("isFirstStepValidated est " + isFirstStepValidated);
    } else if (isSecondStepValidated) {
      console.log("isSecondStepValidated est " + isSecondStepValidated);
      setStep(3);
    } else if (isThirdStepValidated) {
      setStep(4);
    }
  };

  return (
    <>
      {/* rename class of container */}
      <div className="page-container">
        <div style={{ fontSize: "18px" }}>{step}/4</div>
        {handleStepPages()}
        {/* move location of css class for button and container + change font */}
        <div className="button-container">
          <button className="form-button" onClick={handleNextStep}>
            Étape suivante
          </button>
        </div>
        <div className="progress-bar-container">
          <AppProgressBar min={5} progressValue={progressBar()} />
        </div>
      </div>
    </>
  );
}

export default SignUpAthletePage;

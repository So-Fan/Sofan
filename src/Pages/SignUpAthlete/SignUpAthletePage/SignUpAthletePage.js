import React, { useState } from "react";
import AppProgressBar from "../../../Components/AppProgressBar/AppProgressBar";
import FirstStep from "../FormSteps/FirstStep/FirstStep";
import SecondStep from "../FormSteps/SecondStep/SecondStep";
import ThirdStep from "../FormSteps/ThirdStep/ThirdStep";
import FourthStep from "../FormSteps/FourthStep/FourthStep";
import "./SignUpAthlete.css";

function SignUpAthletePage() {
  const [step, setStep] = useState(4);
  const [agent, setAgent] = useState(false);
  const [sportif, setSportif] = useState(false);
  const [progressValue, setProgressValue] = useState(5);
  const [isFirstStepValidated, setIsFirstStepValidated] = useState(false);
  const [isSecondStepValidated, setSecondStepValidated] = useState(false);
  const [isThirdStepValidated, setIsThirdStepValidated] = useState(false);
  const [fourthState, setFourthState] = useState(false); // for disable next step button to submit button
  const [progressBarState, setProgressBarState] = useState();

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
      return <FourthStep step={step} />;
    }
  };
  const progressBar = () => {
    if (step === 1) return "10%";
    else if (step === 2) {
      return "25%";
    } else if (step === 3) {
      return "50%";
    } else if (step === 4) {
      return "75%";
    }
  };

  const handleNextStep = (e) => {
    console.log(e);
    lastStepFormValidation();
    if (isFirstStepValidated) {
      setStep(2);
    } else if (isSecondStepValidated) {
      setStep(3);
    } else if (isThirdStepValidated) {
      setStep(4);
    }
  };

  const lastStepFormValidation = () => {
    if (step === 4) setFourthState(true);
  };
  return (
    <>
      <div className="signup-athlete-page">
        <div className="signup-athlete-elements">
          <div className="steps-signup" style={{ fontSize: "18px" }}>
            {step}/4
          </div>
          {handleStepPages()}
          {/* move location of css class for button and container */}
          {fourthState ? (
            <></>
          ) : (
            <>
              <div className="button-container">
                <button
                  className={
                    fourthState
                      ? "hide-textbutton-signup-athlete"
                      : "signup-athlete-button"
                  }
                  onClick={handleNextStep}
                >
                  Étape suivante
                </button>
              </div>
            </>
          )}
          {/* <AppProgressBar min={5} progressValue={progressBar()} /> */}
          <div className="progress-bar-container">
            <div className="progress-bar-total">
              <div
                className="progress-bar-first"
                style={{ width: progressBar(), transition: "500ms" }}
                
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpAthletePage;

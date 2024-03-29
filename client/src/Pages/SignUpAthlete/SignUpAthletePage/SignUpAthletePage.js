import React, { useState } from "react";
import FirstStep from "../FormSteps/FirstStep/FirstStep";
import SecondStep from "../FormSteps/SecondStep/SecondStep";
import ThirdStep from "../FormSteps/ThirdStep/ThirdStep";
import FourthStep from "../FormSteps/FourthStep/FourthStep";
import FormValidation from "../FormSteps/FormValidation/FormValidation";
import "./SignUpAthlete.css";

function SignUpAthletePage() {
  const [step, setStep] = useState(1);
  const [agent, setAgent] = useState(false);
  const [sportif, setSportif] = useState(false);
  const [isFirstStepValidated, setIsFirstStepValidated] = useState(false);
  const [isSecondStepValidated, setSecondStepValidated] = useState(false);
  const [isThirdStepValidated, setIsThirdStepValidated] = useState(false);
  const [isFourthStepValidated, setFourthStepValidated] = useState(false);
  const [fourthState, setFourthState] = useState(false); // for disable next step button to submit button
  function changePositionButtonAndProgressBar() {
    if (step === 1) {
      return "10%";
    } else {
      return "2.5%";
    }
  }
  const handleStepPages = () => {
    // displayValidationPage()
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
          lastStepFormValidation={lastStepFormValidation}
          setFourthStepValidated={setFourthStepValidated}
          handleNextStep={handleNextStep}
          step={step}
        />
      );
    } else if (step === 5) {
      // Last page after form submitted
      return <FormValidation />;
    }
  };
  const progressBar = () => {
    if (step === 1) return "25%";
    else if (step === 2) {
      return "50%";
    } else if (step === 3) {
      return "75%";
    } else if (step === 4) {
      return "90%";
    }
  };

  const handleNextStep = (e) => {
    console.log(e);
    // lastStepFormValidation();
    if (isFirstStepValidated) {
      setStep(2);
    }
    if (isSecondStepValidated) {
      console.log("on passe à l'étape 3");
      setStep(3);
    }
    if (isThirdStepValidated) {
      setStep(4);
    }
    if (isFourthStepValidated) {
      setStep(5);
    }
  };
  function handlePreviousStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }
  const lastStepFormValidation = () => {
    if (step === 4) {
      setFourthState(true);
    }
  };
  console.log(isThirdStepValidated);
  return (
    <>
      <div className="signup-athlete-page">
        <div className="signup-athlete-elements">
          {step === 5 ? (
            <></>
          ) : (
            <>
              <div className="steps-signup" style={{ fontSize: "18px" }}>
                {step}/4
              </div>
            </>
          )}

          {handleStepPages()}
          {fourthState ? (
            <>
              <div className="progress-bar-container">
                <div className="progress-bar-total">
                  <div
                    className="progress-bar-current"
                    style={{ width: progressBar(), transition: "500ms" }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {step !== 5 && (
                <>
                  <div
                    className="button-and-progressbar-container"
                    style={{ bottom: changePositionButtonAndProgressBar() }}
                  >
                    <div className="button-container">
                      <button
                        onClick={handlePreviousStep}
                        style={{ marginRight: "15px" }}
                        className="signup-athlete-button"
                      >
                        Etape précédent
                      </button>
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
                    <div className="progress-bar-container">
                      <div className="progress-bar-total">
                        <div
                          className="progress-bar-current"
                          style={{ width: progressBar(), transition: "500ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SignUpAthletePage;

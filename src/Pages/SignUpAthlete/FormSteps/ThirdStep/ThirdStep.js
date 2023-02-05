import React from "react";
import "./ThirdStep.css";
import { useState } from "react";

function ThirdStep({setIsThirdStepValidated}) {
  const [veryLowLvlBlockchain, setVeryLowLvlBlockchain] = useState(false);
  const [lowLvlBlockchain, setLowLvlBlockchain] = useState(false);
  const [mediumLowLvlBlockchain, setMediumLowLvlBlockchain] = useState(false);
  const [mediumHighLvlBlockchain, setMediumHighLvlBlockchain] = useState(false);

  const handleClickVeryLow = (e) => {
    e.preventDefault();
    setVeryLowLvlBlockchain(true);
    setLowLvlBlockchain(false);
    setMediumLowLvlBlockchain(false);
    setMediumHighLvlBlockchain(false);
    setIsThirdStepValidated(true);
  };
  const handleClickLow = (e) => {
    e.preventDefault();
    setVeryLowLvlBlockchain(false);
    setLowLvlBlockchain(true);
    setMediumLowLvlBlockchain(false);
    setMediumHighLvlBlockchain(false);
    setIsThirdStepValidated(true);
  };
  const handleClickMedium = (e) => {
    e.preventDefault();
    setVeryLowLvlBlockchain(false);
    setLowLvlBlockchain(false);
    setMediumLowLvlBlockchain(true);
    setMediumHighLvlBlockchain(false);
    setIsThirdStepValidated(true);
  };
  const handleClickMediumHigh = (e) => {
    e.preventDefault();
    setVeryLowLvlBlockchain(false);
    setLowLvlBlockchain(false);
    setMediumLowLvlBlockchain(false);
    setMediumHighLvlBlockchain(true);
    setIsThirdStepValidated(true);
  };

  function handleNext(e) {
    // vérification que l'un des deux boutons est sélectionné avant de passer à la seconde page
    e.preventDefault();
    if (
      veryLowLvlBlockchain ||
      lowLvlBlockchain ||
      mediumLowLvlBlockchain ||
      mediumHighLvlBlockchain
    ) {
      // setStep(4);
    }
  }

  return (
    <section className="container-thirdstep">
      <section className="form-lvl-blockchain-container">
        <div className="thirdstep-title-container">
          <h2 className="title-lvl-blockchain">
            Votre niveau de connaissance en Blockchain, NFT est...
          </h2>
        </div>
        <form className="form-lvl-blockchain">
          <div className="lvl-blockchain-buttons-container">
            <button
              className={
                veryLowLvlBlockchain
                  ? "lvl-blockchain-button-selected"
                  : "lvl-blockchain-button"
              }
              onClick={handleClickVeryLow}
            >
              Non, absolument pas. C'est tout à fait nouveau pour moi
            </button>
            <button
              onClick={handleClickLow}
              className={
                lowLvlBlockchain
                  ? "lvl-blockchain-button-selected"
                  : "lvl-blockchain-button"
              }
            >
              Oui, un peu. J'en ai entendu parler par-ici par là
            </button>
            <button
              onClick={handleClickMedium}
              className={
                mediumLowLvlBlockchain
                  ? "lvl-blockchain-button-selected"
                  : "lvl-blockchain-button"
              }
            >
              Oui, sans être un expert, je sais en parler
            </button>
            <button
              onClick={handleClickMediumHigh}
              className={
                mediumHighLvlBlockchain
                  ? "lvl-blockchain-button-selected"
                  : "lvl-blockchain-button"
              }
            >
              Totalement, je sais tout ce qu'il faut savoir !
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
export default ThirdStep;

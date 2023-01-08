import React from "react";
import "./FirstStep.css";

function FirstStep({
  agent,
  setAgent,
  sportif,
  setSportif,
  setStep,
}) {
  const handleClickAgent = (e) => {
    e.preventDefault();
    setAgent(true);
    setSportif(false);
  };
  const handleClickSportif = (e) => {
    e.preventDefault();
    setAgent(false);
    setSportif(true);
  };

  // gestionnaire de clic sur le bouton "suivant"
  function handleNext(e) {
    // vérification que l'un des deux boutons est sélectionné avant de passer à la seconde page
    e.preventDefault();
    if (agent || sportif) {
      setStep(2);
    }
  }
  return (
    <>
      <section className="firststep-container">
        <h2 className="title-firststep">Vous êtes..</h2>
        <form>
          <div className="btns-firststep-container">
            <button
              onClick={handleClickAgent}
              className={agent ? "btn-firststep-selected" : "btn-firststep"}
            >
              <div className="title-btn-firststep">L'agent</div>
              <div className="content-btn-firststep">
                Vous êtes en charge de la communication d’un sportif
              </div>
            </button>
            <button
              onClick={handleClickSportif}
              className={sportif ? "btn-firststep-selected" : "btn-firststep"}
            >
              <div className="title-btn-firststep">Le sportif</div>
              <div className="content-btn-firststep">
                Vous êtes en charge de votre propre communication
              </div>
            </button>
          </div>
          <div className="figma"></div>
          <button onClick={handleNext} className="form-button">
            Étape suivante
          </button>
        </form>
      </section>
    </>
  );
}
export default FirstStep;

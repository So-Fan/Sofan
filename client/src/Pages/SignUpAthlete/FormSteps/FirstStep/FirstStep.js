import React from "react";
import "./FirstStep.css";

function FirstStep({
  agent,
  setAgent,
  sportif,
  setSportif,
  setIsFirstStepValidated
}) {
  const handleClickAgent = (e) => {
    e.preventDefault();
    setAgent(true);
    setSportif(false);
    setIsFirstStepValidated(true)
  };
  const handleClickSportif = (e) => {
    e.preventDefault();
    setAgent(false);
    setSportif(true);
    setIsFirstStepValidated(true)
  };
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
        </form>
      </section>
    </>
  );
}
export default FirstStep;

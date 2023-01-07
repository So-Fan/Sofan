import React from "react";
import "./FirstStep.css";
import { useState } from "react";

function FirstStep({
  buttonNextSelected,
  pageNumberState,
  setPageNumberState,
}) {
  const handleNextStep = (e) => {
    e.preventDefault();
    if (booleanObject.button1 === true || booleanObject.button2 === true) {
      if (pageNumberState < 4) {
        setPageNumberState(pageNumberState + 1);
      }
    }
    // console.log(pageNumberState);
  };
  const [booleanObject, setBooleanObject] = useState({
    button1: false,
    button2: false,
  });
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === "btn1-firststep") {
      setBooleanObject({
        ...booleanObject,
        button1: true,
        button2: false,
      });
    } else if (e.target.id === "btn2-firststep") {
      setBooleanObject({
        ...booleanObject,
        button1: false,
        button2: true,
      });
    }
  };

  return (
    <>
      <>{buttonNextSelected ? <>Suivant ! </> : <>Pas suivant !</>}</>
      <section className="firststep-container">
        <h2 className="title-firststep">Vous êtes..</h2>
        <form>
          <div className="btns-firststep-container">
            <button
              onClick={handleClick}
              id="btn1-firststep"
              className={
                booleanObject.button1
                  ? "btn-firststep-selected"
                  : "btn-firststep"
              }
            >
              <div className="title-btn-firststep">L'agent</div>
              <div className="content-btn-firststep">
                Vous êtes en charge de la communication d’un sportif
              </div>
            </button>
            <button
              onClick={handleClick}
              id="btn2-firststep"
              className={
                booleanObject.button2
                  ? "btn-firststep-selected"
                  : "btn-firststep"
              }
            >
              <div className="title-btn-firststep">Le sportif</div>
              <div className="content-btn-firststep">
                Vous êtes en charge de votre propre communication
              </div>
            </button>
          </div>
          <button onClick={handleNextStep} className="form-button">
            Étape suivante
          </button>
        </form>
      </section>
    </>
  );
}

export default FirstStep;

import React from "react";
import "./ThirdStep.css";
import { useState } from "react";

function ThirdStep() {
  const [booleanObject, setBooleanObject] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === "btn1") {
      setBooleanObject({
        ...booleanObject,
        button1: true,
        button2: false,
        button3: false,
        button4: false,
      });
    } else if (e.target.id === "btn2") {
      setBooleanObject({
        ...booleanObject,
        button1: false,
        button2: true,
        button3: false,
        button4: false,
      });
    } else if (e.target.id === "btn3") {
      setBooleanObject({
        ...booleanObject,
        button1: false,
        button2: false,
        button3: true,
        button4: false,
      });
    } else if (e.target.id === "btn4") {
      setBooleanObject({
        ...booleanObject,
        button1: false,
        button2: false,
        button3: false,
        button4: true,
      });
    }
  };

  return (
    <section className="form-lvl-blockchain-container">
      <div className="thirdstep-title-container">
        <h2 className="title-lvl-blockchain">
          Votre niveau de connaissance en Blockchain, NFT est...
        </h2>
      </div>
      <form className="form-lvl-blockchain">
        <div className="lvl-blockchain-buttons-container">
          <button
            id="btn1"
            className={
              booleanObject.button1
                ? "lvl-blockchain-button-selected"
                : "lvl-blockchain-button"
            }
            onClick={handleClick}
          >
            Non, absolument pas. C'est tout à fait nouveau pour moi
          </button>
          <button
            id="btn2"
            onClick={handleClick}
            className={
              booleanObject.button2
                ? "lvl-blockchain-button-selected"
                : "lvl-blockchain-button"
            }
          >
            Oui, un peu. J'en ai entendu parler par-ici par là
          </button>
          <button
            id="btn3"
            onClick={handleClick}
            className={
              booleanObject.button3
                ? "lvl-blockchain-button-selected"
                : "lvl-blockchain-button"
            }
          >
            Oui, sans être un expert, je sais en parler
          </button>
          <button
            id="btn4"
            onClick={handleClick}
            className={
              booleanObject.button4
                ? "lvl-blockchain-button-selected"
                : "lvl-blockchain-button"
            }
          >
            Totalement, je sais tout ce qu'il faut savoir !
          </button>
        </div>
      </form>
    </section>
  );
}

export default ThirdStep;

import React, { useState, useRef } from "react";
import "./ConfirmationCode.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";

function InputCodeSquare(props) {
  return (
    <input
      type="text"
      className="signup-user-confirmation-code-input"
      maxLength="1"
      pattern="\d"
      onKeyUp={(e) => {
        if (e.target.value) {
          e.target.nextSibling && e.target.nextSibling.focus();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
          props.handleDelete(e.target.dataset.index);
        }
      }}
      ref={props.inputRef}
      data-index={props.index}
    />
  );
}

function ConfirmationCode() {
  const [code, setCode] = useState("");
  const inputRefs = useRef([]);

  function handleKeyUp(e) {
    const codeIndex = Number(e.target.dataset.index);
    const inputCode = e.target.value;

    if (inputCode.length > 0) {
      setCode((prevCode) => {
        const newCode = prevCode.split("");
        newCode[codeIndex] = inputCode;
        return newCode.join("");
      });

      if (codeIndex < 5) {
        inputRefs.current[codeIndex + 1] &&
          inputRefs.current[codeIndex + 1].focus();
      }
    } else {
      setCode((prevCode) => {
        const newCode = prevCode.split("");
        newCode[codeIndex] = "";
        return newCode.join("");
      });

      if (codeIndex > 0) {
        inputRefs.current[codeIndex - 1] &&
          inputRefs.current[codeIndex - 1].focus();
      }
    }
  }

  function handleDelete(index) {
    if (index < 0) return;

    setCode((prevCode) => {
      const newCode = prevCode.split("");
      newCode[index] = "";
      return newCode.join("");
    });

    inputRefs.current[index].value = "";
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  return (
    <div className="signup-user-confirmation-code-wrap">
      <div className="signup-user-confirmation-code-previous-step">
        <img src={previousArrow} alt="FLÈCHE ÉTAPE PRÉCÉDENTE" />
      </div>
      <div className="signup-user-confirmation-code-title">Entrer le code</div>
      <div className="signup-user-confirmation-code-description">
        Nous vous avons envoyé un code de confirmation à 6 chiffres par mail.
      </div>
      <div className="signup-user-confirmation-code-mail">
        donofsomething@gmail.com
      </div>
      <div className="signup-user-confirmation-code-input-container">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <InputCodeSquare
            key={i}
            index={i}
            inputRef={(el) => (inputRefs.current[i] = el)}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <button className="signup-user-confirmation-code-next-button">
        Suivant
      </button>
    </div>
  );
}

export default ConfirmationCode;

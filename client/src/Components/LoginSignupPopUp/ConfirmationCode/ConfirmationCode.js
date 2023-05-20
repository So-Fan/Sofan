import React, { useState, useRef, useEffect } from "react";
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

function ConfirmationCode({
  setIsConfirmCodeValid,
  isConfirmCodeValid,
  handleSubmitConfirmationCodeClick,
  handleConfirmationCodePreviousStep,
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  useEffect(() => {
    const isAllCodeFilled = code.every((value) => value !== "");
    setIsConfirmCodeValid(isAllCodeFilled);
  }, [code, setIsConfirmCodeValid]);
  function handleChange(index, value) {
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1] && inputRefs.current[index + 1].focus();
    }
  }

  function handleDelete(index) {
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = "";
      return newCode;
    });

    if (index > 0) {
      inputRefs.current[index - 1] && inputRefs.current[index - 1].focus();
    }
  }

  const inputRefs = useRef([]);

  return (
    <div className="signup-user-confirmation-code-wrap">
      <div
        onClick={handleConfirmationCodePreviousStep}
        className="signup-user-confirmation-code-previous-step"
      >
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
        {code.map((value, index) => (
          <input
            key={index}
            type="text"
            className="signup-user-confirmation-code-input"
            maxLength="1"
            pattern="\d"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyUp={(e) => {
              if (e.target.value) {
                e.target.nextSibling && e.target.nextSibling.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" || e.key === "Delete") {
                handleDelete(index);
              }
            }}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <button
        onClick={handleSubmitConfirmationCodeClick}
        className="signup-user-confirmation-code-next-button"
      >
        Suivant
      </button>
      <div className="signup-user-confirmation-code-progress-bar-container">
        <div
          style={{ width: "25%" }}
          className="signup-user-confirmation-code-progress-bar"
        ></div>
      </div>
    </div>
  );
}

export default ConfirmationCode;
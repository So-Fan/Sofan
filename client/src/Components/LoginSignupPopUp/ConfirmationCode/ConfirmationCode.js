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
  UserEmail,
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isResendCodeMailLoading, setIsResendCodeMailLoading] = useState();
  const [confirmCodeResend, setConfirmCodeResend] = useState();
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

  function handlePaste(event, index) {
    const pastedData = event.clipboardData.getData("text");
    if (pastedData.length === 6 && /^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);
      event.preventDefault(); // Prevent the default paste action
    }
  }

  const inputRefs = useRef([]);
  function handleConfirmMailResendCode() {
    setIsResendCodeMailLoading(true);
    setTimeout(() => {
      setIsResendCodeMailLoading(false);
      setConfirmCodeResend(true);
    }, 2000);
  }
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
      <div className="signup-user-confirmation-code-mail">{UserEmail}</div>
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
            onPaste={(e) => handlePaste(e, index)}
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
      <p className="signup-user-confirmation-code-message-resend">
        Vous n'avez pas reçu de mail ? Cliquez{" "}
        <span onClick={handleConfirmMailResendCode}>ICI</span> pour le renvoyer.
      </p>
      {isResendCodeMailLoading ? (
        <>
          <div className="signup-user-confirmation-code-animation-container">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </>
      ) : (
        <>
          {confirmCodeResend ? (
            <>
              <p className="signup-user-confirmation-code-message-resend-confirmation">
                Un nouveau mail a été envoyé. Pensez à vérifier vos spams.
              </p>
            </>
          ) : (
            <></>
          )}
        </>
      )}

      <button
        onClick={(event) =>
          handleSubmitConfirmationCodeClick(event, code.join(""))
        }
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

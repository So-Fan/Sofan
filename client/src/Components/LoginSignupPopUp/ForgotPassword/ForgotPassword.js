import React, { useState } from "react";
import "./ForgotPassword.css";
import Button from "../../Button/Button";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailRegexError, setEmailRegexError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  function handleEmailChange(event) {
    const emailValue = event.target.value;
    setEmail(emailValue);
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setEmailRegexError(!emailRegex.test(emailValue));
  }
  function handleMailInput(e) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (emailRegex.test(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }
  
  return (
    <div className="forgot-password-popup-container">
      <div className="forgot-password-popup-wrap">
        <div className="forgot-password-popup-title">
          Rénitialisez votre mot de passe
        </div>
        <div className="forgot-password-popup-description-and-input-container">
          <div className="forgot-password-popup-description">
            Entrez votre mail pour trouver nous aider à retrouver votre compte
          </div>
          {/* <div className="forgot-password-popup-input"> */}
            <input
              className="forgot-passord-popup-mail-input"
              type="Email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleMailInput}
              placeholder="Entrez votre mail"
              name=""
              id=""
            />
            {emailError && (
              <p className="signup-user-error-mail">
                Veuillez entrer une adresse e-mail valide.
              </p>
            )}
          {/* </div> */}
        </div>
        <button className="forgot-password-popup-validation-button">Valider</button>
      </div>
    </div>
  );
}

export default ForgotPassword;

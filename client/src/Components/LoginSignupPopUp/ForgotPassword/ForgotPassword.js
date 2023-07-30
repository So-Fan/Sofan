import React, { useState } from "react";
import "./ForgotPassword.css";
import Button from "../../Button/Button";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  function handleEmailChange(event) {
    const emailValue = event.target.value;
    setEmail(emailValue);
    
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const isValid = emailRegex.test(emailValue);
    setIsValidEmail(isValid);
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

          <input 
            className="forgot-passord-popup-mail-input"
            type="Email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Entrez votre mail"
          />
          
          { email && !isValidEmail && 
            <p className="signup-user-error-mail">
              Veuillez entrer une adresse e-mail valide.
            </p>
          }

        </div>

        <button
          className="forgot-password-popup-validation-button"
          disabled={!isValidEmail} 
        >
          Valider
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;
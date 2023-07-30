import React, { useState } from "react";
import "./ForgotPassword.css";
import Button from "../../Button/Button";
import greenCross from "../../../Assets/Image/greencross-offers.svg";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isMailValidAndButtonClicked, setIsMailValidAndButtonClicked] =
    useState();
  const [
    isForgotPasswordResendMailLoading,
    setIsForgotPasswordResendMailLoading,
  ] = useState(false);
  const [
    forgotPasswordDisplayMessageResend,
    setForgotPasswordDisplayMessageResend,
  ] = useState(false);
  function handleEmailVerificationRegex(event) {
    const emailValue = event.target.value;
    setEmail(emailValue);

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const isValid = emailRegex.test(emailValue);
    setIsValidEmail(isValid);
  }
  function handleClickSendResetPasswordLink() {
    if (isValidEmail === true) {
      setIsMailValidAndButtonClicked(true);
    } else {
      setIsMailValidAndButtonClicked(false);
    }
  }
  function handleForgotPasswordResendMailClick() {
    setIsForgotPasswordResendMailLoading(true);
    setTimeout(() => {
      setIsForgotPasswordResendMailLoading(false);
      setForgotPasswordDisplayMessageResend(true);
    }, 2000);
  }
  return (
    <>
      <>
        <div className="forgot-password-popup-container">
          <div className="forgot-password-popup-wrap">
            {isMailValidAndButtonClicked ? (
              <>
                <div className="forgot-password-popup-validation-message-container">
                  <div className="forgot-password-popup-validation-message-title">
                    <img src={greenCross} alt="logo validé" />
                    <p>
                      Si vous avez déjà créer un compte vérifiez vos mails !
                      Vous devriez avoir reçu un courriel pour réinitialiser
                      votre mot de passe.
                    </p>
                    <p className="forgot-password-popup-validation-message-resend">
                      Vous n'avez pas reçu de mail ? Cliquez{" "}
                      <span onClick={handleForgotPasswordResendMailClick}>
                        ICI
                      </span>{" "}
                      pour le renvoyer.
                    </p>
                    
                    {isForgotPasswordResendMailLoading ? (
                      <>
                        <div
                          className="lds-ellipsis"
                        >
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </>
                    ) : (
                      <>
                        {forgotPasswordDisplayMessageResend ? (
                          <>
                            <p className="forgot-password-popup-validation-message-resend-confirmation">
                              Un nouveau mail a été envoyé. Pensez à vérifier
                              vos spams
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="forgot-password-popup-title">
                  Rénitialisez votre mot de passe
                </div>

                <div className="forgot-password-popup-description-and-input-container">
                  <div className="forgot-password-popup-description">
                    Entrez votre mail pour trouver nous aider à retrouver votre
                    compte
                  </div>

                  <input
                    className="forgot-passord-popup-mail-input"
                    type="Email"
                    value={email}
                    onChange={handleEmailVerificationRegex}
                    placeholder="Entrez votre mail"
                  />

                  {email && !isValidEmail && (
                    <p className="signup-user-error-mail">
                      Veuillez entrer une adresse e-mail valide.
                    </p>
                  )}
                </div>

                <button
                  onClick={handleClickSendResetPasswordLink}
                  className="forgot-password-popup-validation-button"
                  disabled={!isValidEmail}
                >
                  Valider
                </button>
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
}

export default ForgotPassword;

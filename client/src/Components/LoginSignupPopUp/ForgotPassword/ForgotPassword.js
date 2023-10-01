import React, { useState } from "react";
import "./ForgotPassword.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import greenCross from "../../../Assets/Image/greencross-offers.svg";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../Configs/firebase";
function ForgotPassword({ setIsForgotPasswordClicked }) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isMailValidAndButtonClicked, setIsMailValidAndButtonClicked] =
    useState();
  const [
    isForgotPasswordFirstSendMailLoading,
    setIsForgotPasswordFirstSendMailLoading,
  ] = useState();
  const [
    isForgotPasswordResendMailLoading,
    setIsForgotPasswordResendMailLoading,
  ] = useState(false);
  const [
    forgotPasswordDisplayMessageResend,
    setForgotPasswordDisplayMessageResend,
  ] = useState(false);

  function handlePreviousStepButtonClick() {
    setIsForgotPasswordClicked(false);
  }

  function handleEmailVerificationRegex(event) {
    const emailValue = event.target.value;
    setEmail(emailValue);

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const isValid = emailRegex.test(emailValue);
    setIsValidEmail(isValid);
  }

  async function handleClickSendResetPasswordLink() {
    if (isValidEmail === true) {
      setIsForgotPasswordFirstSendMailLoading(true);
      try {
        await sendPasswordResetEmail(auth, email);
        setIsForgotPasswordFirstSendMailLoading(false);
        setIsMailValidAndButtonClicked(true);
      } catch (error) {
        console.error("Error sending password reset email: ", error);
        setIsForgotPasswordFirstSendMailLoading(false);
        setIsMailValidAndButtonClicked(false);
      }
    } else {
      setIsMailValidAndButtonClicked(false);
    }
  }

  async function handleForgotPasswordResendMailClick() {
    setIsForgotPasswordResendMailLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setIsForgotPasswordResendMailLoading(false);
      setForgotPasswordDisplayMessageResend(true);
    } catch (error) {
      console.error("Error resending password reset email: ", error);
      setIsForgotPasswordResendMailLoading(false);
      setForgotPasswordDisplayMessageResend(false);
    }
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
                      votre mot de passe à cette addresse:{" "}
                      <div className="forgot-password-popup-validation-message-email-address">
                        {email}
                      </div>
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
                        <div className="lds-ellipsis">
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
                              vos spams.
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
            ) : isForgotPasswordFirstSendMailLoading ? (
              <>
                <div className="forgot-password-popup-validation-message-loading">
                  <div className="lds-ripple">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="forgot-password-popup-title">
                  Rénitialisez votre mot de passe
                </div>
                <img
                  onClick={handlePreviousStepButtonClick}
                  className="forgot-password-previous-step-button"
                  src={previousArrow}
                  alt="bouton étape précédente"
                />

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClickSendResetPasswordLink(e);
                      }
                    }}
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

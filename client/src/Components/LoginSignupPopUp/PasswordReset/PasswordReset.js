import React, { useState } from "react";
import "./PasswordReset.css";
import { confirmPasswordReset } from "firebase/auth"; // Import Firebase auth methods
import { auth } from "../../../Configs/firebase";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import greenCross from "../../../Assets/Image/greencross-offers.svg";
// import { countNonPushOnlyOPs } from "bitcoinjs-lib/src/script";
function PasswordReset() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isPasswordResetLoading, setIsPasswordResetLoading] = useState();
  const [
    isDisplayCurrentPasswordButtonClicked,
    setIsDisplayCurrentPasswordButtonClicked,
  ] = useState(false);
  const [
    isDisplayConfirmPasswordButtonClicked,
    setIsDisplayConfirmPasswordButtonClicked,
  ] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode"); // This is the token from the URL

  function validatePassword(password) {
    if (!password) {
      return false;
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};:,'".<>?~=-])[A-Za-z\d!@#$%^&*()_+[\]{};:,'".<>?~=-]{8,100}$/;

    return regex.test(password);
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage(
        "Votre pseudo doit comporter 1 à 14 caractères alphanumériques ou des underscores."
      );
      return;
    }
    setIsPasswordResetLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      // setTimeout(() => {
      setMessage("Mot de passe réinitialisé avec succès!");
      setIsPasswordResetLoading(false);
      setIsPasswordChanged(true);
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("isUserLogged");
      setTimeout(()=> {
        window.location.href = '/'; 
      }, 2200)
      // }, 1300);
    } catch (error) {
      // setTimeout(() => {
      setIsPasswordResetLoading(false);
      setMessage("Erreur lors de la réinitialisation du mot de passe.");
      // }, 1300);
      console.error(error);
    }
  };
  function handleDisplayPasswordButtonClick() {
    setIsDisplayCurrentPasswordButtonClicked(
      !isDisplayCurrentPasswordButtonClicked
    );
  }
  function handleDisplayConfirmPasswordButtonClick() {
    setIsDisplayConfirmPasswordButtonClicked(
      !isDisplayConfirmPasswordButtonClicked
    );
  }
  function handleKeyDown(event) {
    // Si la touche pressée est "ENTRÉE", déclenchez le clic sur le bouton
    if (event.key === "Enter") {
      handlePasswordReset();
    }
  }
  return (
    <div className="password-reset-container">
      {isPasswordChanged ? (
        <div className="password-reset-validation-message">
          <img src={greenCross} alt="" />
          Mot de passe changé avec succès!
        </div>
      ) : isPasswordResetLoading ? (
        <>
          <div className="password-reset-loading-container">
            <LoadingAnimation ellipsisAnimation={true} />
          </div>
        </>
      ) : (
        <>
          <div className="password-reset-title">Changer le mot de passe</div>
          <form onSubmit={handlePasswordReset}>
            <label htmlFor="new-password">Nouveau mot de passe:</label>
            <br />
            <input
              type={isDisplayCurrentPasswordButtonClicked ? "text" : "password"}
              id="new-password"
              name="new-password"
              required
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {isDisplayCurrentPasswordButtonClicked ? (
              <>
                <svg
                  onClick={handleDisplayPasswordButtonClick}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </>
            ) : (
              <>
                <svg
                  onClick={handleDisplayPasswordButtonClick}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
              </>
            )}
            <br />
            {/* {password !== "" && !validatePassword(password) && (
                <p className="settings-page-error-password-change">
                  Le mot de passe doit contenir au moins une majuscule, un
                  chiffre et un caractère spécial et 8 caractères minimum.
                </p>
              )} */}
            <br />

            <label htmlFor="confirm-password">Confirmer le mot de passe:</label>
            <br />
            <input
              type={isDisplayConfirmPasswordButtonClicked ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={() => handleKeyDown}
            />
            {isDisplayConfirmPasswordButtonClicked ? (
              <>
                <svg
                  onClick={handleDisplayConfirmPasswordButtonClick}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </>
            ) : (
              <>
                <svg
                  onClick={handleDisplayConfirmPasswordButtonClick}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
              </>
            )}
            <br />
            <br />

            <button type="submit" className="change-password-button">
              Changer le mot de passe
            </button>
            {message && (
              <p
                className={
                  message === "Mot de passe réinitialisé avec succès!"
                    ? "reset-password-message-validation"
                    : "reset-password-message-error"
                }
              >
                {message}
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default PasswordReset;

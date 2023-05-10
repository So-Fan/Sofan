import React, { useState } from "react";
import "./Signup.css";
function Signup() {
  const [isDisplayPasswordButtonClicked, setIsDisplayPasswordButtonClicked] =
    useState(false);
  const [
    isDisplayConfirmationPasswordButtonClicked,
    setIsDisplayConfirmationPasswordButtonClicked,
  ] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null); // backend
  //   const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  function handleDisplayPasswordButtonClick() {
    setIsDisplayPasswordButtonClicked(!isDisplayPasswordButtonClicked);
  }

  function handleDisplayConfirmationPasswordButtonClick() {
    setIsDisplayConfirmationPasswordButtonClicked(
      !isDisplayConfirmationPasswordButtonClicked
    );
  }
  function passwordsMatch() {
    return password === passwordConfirmation;
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setShowError(false);
  }

  function handleConfirmPasswordChange(e) {
    setPasswordConfirmation(e.target.value);
    setShowError(password !== e.target.value);
  }

  function handlePasswordBlur() {
    setShowError(
      password !== passwordConfirmation && passwordConfirmation !== ""
    );
  }

  return (
    <div className="signup-user-container">
      <form action="#" className="signup-user-wrap-form">
        <div className="signup-user-title">S'inscrire</div>
        <div className="signup-user-title-description">
          Sign up now to connect with athletes and explore exclusive NFT content
          within a vibrant community of sports enthusiasts!
        </div>
        <div className="signup-user-mail-title">E-mail</div>
        <input
          className="signup-user-mail-input"
          type="Email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Entrez votre mail"
          name=""
          id=""
        />

        <div className="signup-user-username-title">Pseudo</div>
        <input
          className="signup-user-username-input"
          type="text"
          placeholder="Choisissez votre pseudo"
          name=""
          id=""
        />

        <div className="signup-user-phone-title">Numéro de téléphone</div>
        <input
          className="signup-user-phone-input"
          type="tel"
          placeholder="+33 06 06 06 06"
          name=""
          id=""
        />
        <div className="signup-user-password-title">Mot de passe</div>
        <div className="signup-user-password-input-container">
          <input
            className="signup-user-password-input"
            type={isDisplayPasswordButtonClicked ? "text" : "password"}
            placeholder="Mot de passe"
            onChange={handlePasswordChange}
            name=""
            id=""
          />
          <div className="signup-user-input-display-button">
            {isDisplayPasswordButtonClicked ? (
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
          </div>
        </div>
        <div className="signup-user-confirmation-password-title">
          Confirmer mot de passe
        </div>
        <div className="signup-user-confirm-password-input-container">
          <input
            className="signup-user-confirmation-password-input"
            type={
              isDisplayConfirmationPasswordButtonClicked ? "text" : "password"
            }
            placeholder="Confirmez votre mot de passe"
            onChange={handleConfirmPasswordChange}
            onBlur={handlePasswordBlur}
            name=""
            id=""
          />
          <div className="signup-user-input-display-button">
            {isDisplayConfirmationPasswordButtonClicked ? (
              <>
                <svg
                  onClick={handleDisplayConfirmationPasswordButtonClick}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </>
            ) : (
              <>
                <svg
                  onClick={handleDisplayConfirmationPasswordButtonClick}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
              </>
            )}
          </div>
          {showError && (
            <div className="password-error-message-signup">
              Les mots de passes ne correspondent pas.
            </div>
          )}
        </div>
        <button className="signup-user-create-account-button">
          Créer mon compte
        </button>
        <div className="signup-page-confirmation-accept-cgu">
          En cliquant sur "S'inscrire", vous acceptez nos 
          <a target="blank" href="cgu">Conditions générales d'utilisation</a>.
        </div>
        <div className="signup-user-separation-line-container">
          <div className="signup-user-separation-line-left"></div>
          <div className="signup-user-separation-or">OU</div>
          <div className="signup-user-separation-line-right"></div>
        </div>
        <div className="signup-user-google-signup">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/google%201.png?alt=media&token=3a8d7bf6-eaf1-46d1-a1b4-0c73eb8ac18f"
            alt="google logo"
          />
          <div className="signup-user-google-signup-text">
            S'inscrire avec Google
          </div>
        </div>
        <div className="signup-user-already-an-account">
          Vous avez déjà un compte ? <span>Se connecter</span>
        </div>
      </form>
    </div>
  );
}

export default Signup;

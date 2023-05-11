import React, { useState, useEffect } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "./Signup.css";
import ConfirmationCode from "./ConfirmationCode/ConfirmationCode";
function Signup() {
  //
  const [isFormValid, setIsFormValid] = useState(true);
  const [displayConfirmationCode, setDisplayConfirmationCode] = useState(false);
  const [isConfirmCodeValid, setIsConfirmCodeValid] = useState(false);
  const [displaySetupProfile, setDisplaySetupProfile] = useState(false);
  //
  const [isDisplayPasswordButtonClicked, setIsDisplayPasswordButtonClicked] =
    useState(false);
  const [
    isDisplayConfirmationPasswordButtonClicked,
    setIsDisplayConfirmationPasswordButtonClicked,
  ] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null); // backend
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailRegexError, setEmailRegexError] = useState(false);
  const [usernameRegexError, setUsernameRegexError] = useState(false);
  const [passwordRegexError, setPasswordRegexError] = useState(false);
  const [passwordConfirmRegexError, setPasswordConfirmRegexError] =
    useState(false);
  const [phoneRegexError, setPhoneRegexError] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [opacityInputPhone, setOpacityInputPhone] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(true);
  //   const navigate = useNavigate();
  function handleEmailChange(event) {
    const emailValue = event.target.value;
    setEmail(emailValue);
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setEmailRegexError(!emailRegex.test(emailValue));
  }

  function handleDisplayPasswordButtonClick() {
    setIsDisplayPasswordButtonClicked(!isDisplayPasswordButtonClicked);
  }

  function handleDisplayConfirmationPasswordButtonClick() {
    setIsDisplayConfirmationPasswordButtonClicked(
      !isDisplayConfirmationPasswordButtonClicked
    );
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
  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;

    return regex.test(password);
  }

  function handlePasswordChange(event) {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    setPasswordRegexError(!passwordRegex.test(passwordValue));
    setPasswordConfirmRegexError(
      passwordConfirmation !== "" && passwordConfirmation !== passwordValue
    );
  }
  function handleConfirmPasswordChange(event) {
    const passwordConfirmValue = event.target.value;
    setPasswordConfirmation(passwordConfirmValue);
    setPasswordConfirmRegexError(
      password !== "" && password !== passwordConfirmValue
    );
  }
  function handlePasswordBlur() {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
    }
    setShowError(
      password !== passwordConfirmation && passwordConfirmation !== ""
    );
  }
  function handleConfirmPasswordBlur() {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    if (!passwordRegex.test(passwordConfirmation)) {
      setPasswordError(true);
    }
    setShowError(
      password !== passwordConfirmation && passwordConfirmation !== ""
    );
  }
  function handleMailInput(e) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (emailRegex.test(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }
  //
  function handleUsernameChange(event) {
    const usernameValue = event.target.value;
    setUsername(usernameValue);
    const usernameRegex = /^[a-zA-Z0-9_]{1,14}$/;
    setUsernameRegexError(!usernameRegex.test(usernameValue));
  }

  //
  function handlePhoneInput(value) {
    setPhone(value);
    setPhoneRegexError(value && !isValidPhoneNumber(value));
  }
  function handleClickPhoneInput(e) {
    var element = document.querySelector("#signup-user-phone-input-id");
    element.classList.add("PhoneInputInputOpacity");
  }
  function verifyFormIsValid(e) {
    e.preventDefault();
    setIsSubmitClicked(true);
    if (emailError === false && usernameRegexError === false) {
      if (
        password !== "" &&
        passwordConfirmation !== "" &&
        validatePassword(password) &&
        password === passwordConfirmation
      ) {
        console.log("tout est rempli");
        setIsFormValid(true);
      } else {
        console.log("la deuxième condition n'est pas remplie");
        setIsFormValid(false);
      }
    } else {
      console.log("la première condition n'est pas remplie");
      setIsFormValid(false);
    }
    console.log("oui");
  }
  // function displayConfirmationCode() {
  // }

  useEffect(() => {
    if (isFormValid && isSubmitClicked) {
      setTimeout(() => {
        setDisplayConfirmationCode(true);
      }, 5000);
    }
  }, [isFormValid, isSubmitClicked]);
  function handleSubmitConfirmationCodeClick() {
    console.log("click");
    if (isConfirmCodeValid) {
      setDisplayConfirmationCode(false);
      // setDisplaySetupProfile(true);
      setTimeout(() => {
        setDisplaySetupProfile(true);
      }, 5000);
    }
  }
  return (
    <>
      {isFormValid && isSubmitClicked ? (
        <>
          <div
            className={
              displayConfirmationCode
                ? "signup-user-confirmation-code-container"
                : "signup-user-container"
            }
          >
            {displayConfirmationCode ? (
              <>
                <ConfirmationCode
                  setIsConfirmCodeValid={setIsConfirmCodeValid}
                  isConfirmCodeValid={isConfirmCodeValid}
                  handleSubmitConfirmationCodeClick={
                    handleSubmitConfirmationCodeClick
                  }
                />
              </>
            ) : displaySetupProfile ? (
              <>Setup Profile</>
            ) : (
              <>
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="signup-user-container">
            <form action="#" className="signup-user-wrap-form">
              <div className="signup-user-title">S'inscrire</div>
              <div className="signup-user-title-description">
                Sign up now to connect with athletes and explore exclusive NFT
                content within a vibrant community of sports enthusiasts!
              </div>
              <div className="signup-user-mail-title">E-mail*</div>
              <input
                className="signup-user-mail-input"
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

              <div className="signup-user-username-title">Pseudo*</div>
              <input
                className="signup-user-username-input"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Choisissez votre pseudo"
              />
              {usernameRegexError && (
                <p className="signup-user-error-username">
                  Veuillez entrer un pseudo valide. Il doit comporter 1 à 14
                  caractères alphanumériques ou des underscores.
                </p>
              )}
              <div className="signup-user-phone-title">Numéro de téléphone</div>
              <PhoneInput
                id="signup-user-phone-input-id"
                onClick={handleClickPhoneInput}
                international
                defaultCountry="FR"
                value={phone}
                onChange={handlePhoneInput}
                className="signup-user-phone-input"
                placeholder="Entrez votre numéro de téléphone"
              />
              {phoneRegexError && (
                <p className="signup-user-error-phone">
                  Veuillez entrer un numéro de téléphone valide.
                </p>
              )}
              <div className="signup-user-password-title">Mot de passe*</div>
              <div className="signup-user-password-input-container">
                <input
                  className="signup-user-password-input"
                  type={isDisplayPasswordButtonClicked ? "text" : "password"}
                  placeholder="Mot de passe"
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  name=""
                  id=""
                />
                {password !== "" && !validatePassword(password) && (
                  <p className="signup-user-error-password">
                    Le mot de passe doit contenir au moins une majuscule, un
                    chiffre et un caractère spécial et 8 caractères minimum.
                  </p>
                )}

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
                Confirmer mot de passe*
              </div>
              <div className="signup-user-confirm-password-input-container">
                <input
                  className="signup-user-confirmation-password-input"
                  type={
                    isDisplayConfirmationPasswordButtonClicked
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirmez votre mot de passe"
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
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
              <button
                onClick={verifyFormIsValid}
                className="signup-user-create-account-button"
              >
                Créer mon compte
              </button>
              {!isFormValid && isSubmitClicked && (
                <>
                  <p className="signup-user-error-fill-form">
                    Veuillez remplir tout les champs obligatoires. Ils
                    contiennent une astérisque (*)
                  </p>
                </>
              )}
              <div className="signup-page-confirmation-accept-cgu">
                En cliquant sur "S'inscrire", vous acceptez nos 
                <a target="blank" href="cgu">
                  Conditions générales d'utilisation
                </a>
                .
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
        </>
      )}
    </>
  );
}

export default Signup;

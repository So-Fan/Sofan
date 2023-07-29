import React, { useState } from "react";
import "./SettingsPage.css";
import validationLogo from "../../Assets/Image/cross-validation-black.svg";
import Button from "../../Components/Button/Button";

function SettingsPage() {
  const [isFocusDisplayName, setIsFocusDisplayName] = useState(false);
  const [valueInputDisplayName, setValueInputDisplayName] = useState();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameRegexError, setUsernameRegexError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRegexError, setPasswordRegexError] = useState(false);
  const [passwordConfirmRegexError, setPasswordConfirmRegexError] =
    useState(false);
  const [
    isDisplayCurrentPasswordButtonClicked,
    setIsDisplayCurrentPasswordButtonClicked,
  ] = useState(false);
  const [
    isDisplayNewPasswordButtonClicked,
    setIsDisplayNewPasswordButtonClicked,
  ] = useState(false);
  const [
    isDisplayConfirmNewPasswordButtonClicked,
    setIsDisplayConfirmNewPasswordButtonClicked,
  ] = useState(false);
  const [showError, setShowError] = useState(false);

  let displayName = "ramiabdou";

  function handleFocusDisplayName() {
    setIsFocusDisplayName(true);
  }
  function handleBlurDisplayName(e) {
    if (valueInputDisplayName === displayName) {
      setIsFocusDisplayName(false);
    }
  }
  function onChangeInputDisplayName(e) {
    // setIsFocusDisplayName(true);
    setValueInputDisplayName(e.target.value);
    const displayNameRegex = /^[A-Za-z0-9 ][A-Za-z0-9 ]{1,29}$/;
    setUsernameRegexError(!displayNameRegex.test(e.target.value));
  }
  //   function handleUsernameChange(e) {
  //     const usernameValue = e.target.value;
  //     setUsername(usernameValue);
  //     const usernameRegex = /^[a-zA-Z0-9_]{1,14}$/;
  //     setUsernameRegexError(!usernameRegex.test(e.target.value));
  //   }
  function handleDisplayPasswordButtonClick() {
    setIsDisplayCurrentPasswordButtonClicked(
      !isDisplayCurrentPasswordButtonClicked
    );
  }
  function handleDisplayNewPasswordButtonClick() {
    setIsDisplayNewPasswordButtonClicked(!isDisplayNewPasswordButtonClicked);
  }
  function handleDisplayConfirmNewPasswordButtonClick() {
    setIsDisplayConfirmNewPasswordButtonClicked(
      !isDisplayConfirmNewPasswordButtonClicked
    );
  }
  function handleConfirmPasswordChange(event) {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\S])[A-Za-z\d\S]{8,100}$/;
    setPasswordRegexError(!passwordRegex.test(passwordValue));
    setPasswordConfirmRegexError(
      passwordConfirmation !== "" && passwordConfirmation !== passwordValue
    );
  }
  function handlePasswordChange(event) {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\S])[A-Za-z\d\S]{8,100}$/;
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
  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\S])[A-Za-z\d\S]{8,100}$/;
    return regex.test(password);
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
  return (
    <div className="settings-page-container">
      <div className="setting-page-wrap">
        <div className="settings-page-title">Settings</div>
        <div className="settings-page-display-name-container">
          <div className="settings-page-display-name-wrap">
            <div className="settings-page-display-name-title">
              Nom d'affichage
            </div>
            <div className="settings-page-display-name-input">
              <input
                style={isFocusDisplayName ? { color: "black" } : {}}
                onClick={onChangeInputDisplayName}
                onChange={onChangeInputDisplayName}
                onFocus={handleFocusDisplayName}
                onBlur={handleBlurDisplayName}
                type="text"
                // value={username}
                defaultValue="ramiabdou"
                // onChange={handleUsernameChange}
              />
              {usernameRegexError && (
                <p className="settings-page-error-display-name">
                  Veuillez entrer un nom d'affichage valide. Il doit comporter 2
                  à 29 caractères alphanumérique.
                </p>
              )}
              {/* <img src={validationLogo} alt="" /> */}
            </div>
            {/* <button className="settings-page-validation-button">Changer pseudo</button> */}
            <div className="settings-page-validation-button-container">
              <Button
                text={"Changer nom d'affichage"}
                hover="button-hover-props"
                active="button-active-props"
              />
            </div>
          </div>
        </div>
        <div className="settings-page-line-separation"></div>
        {/* ========== MOT DE PASSE ACTUEL ========== */}
        <div className="settings-page-password-change-container">
          <div className="settings-page-password-change-wrap">
            <div className="settings-page-password-change-title">
              Changer mon mot de passe
            </div>
            <div
              style={{ color: "black" }}
              className="settings-page-password-change-input"
            >
              <div className="settings-page-password-change-current-password-and-display-button">
                <input
                  type={
                    isDisplayCurrentPasswordButtonClicked ? "text" : "password"
                  }
                  placeholder="Mot de passe actuel"
                  // onChange={handlePasswordChange}
                  // onBlur={handlePasswordBlur}
                  // value={username}
                  // onChange={handleUsernameChange}
                />
                <div className="settings-page-input-display-button">
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
                </div>
              </div>
              {/* {password !== "" && !validatePassword(password) && (
                <p className="settings-page-error-password-change">
                  Le mot de passe doit contenir au moins une majuscule, un
                  chiffre et un caractère spécial et 8 caractères minimum.
                </p>
              )} */}
            </div>
            {/* ========== NOUVEAU MOT DE PASSE ========== */}
            <div className="settings-page-password-change-title"></div>
            <div
              style={{ color: "black" }}
              className="settings-page-password-change-input"
            >
              <div className="settings-page-password-change-new-password-and-display-button">
                <input
                  type={isDisplayNewPasswordButtonClicked ? "text" : "password"}
                  placeholder="Nouveau mot de passe"
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  // value={username}
                  // onChange={handleUsernameChange}
                />
                <div className="settings-page-input-display-button">
                  {isDisplayNewPasswordButtonClicked ? (
                    <>
                      <svg
                        onClick={handleDisplayNewPasswordButtonClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                      {/* <img src={eyeOpenLogo} alt="" /> */}
                    </>
                  ) : (
                    <>
                      <svg
                        onClick={handleDisplayNewPasswordButtonClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                      </svg>
                    </>
                  )}
                </div>
              </div>
              {password !== "" && !validatePassword(password) && (
                <p className="settings-page-error-password-change">
                  Le mot de passe doit contenir au moins une majuscule, un
                  chiffre et un caractère spécial et 8 caractères minimum.
                </p>
              )}
            </div>
            {/* ========== CONFIRMATION NOUVEAU MOT DE PASSE ========== */}
            <div className="settings-page-password-change-title"></div>
            <div
              style={{ color: "black" }}
              className="settings-page-password-change-input"
            >
              <div className="settings-page-password-change-current-password-and-display-button">
                <input
                  type={
                    isDisplayConfirmNewPasswordButtonClicked
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirmez nouveau mot de passe"
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
                  // value={username}
                />
                <div className="settings-page-input-display-button">
                  {isDisplayConfirmNewPasswordButtonClicked ? (
                    <>
                      <svg
                        onClick={handleDisplayConfirmNewPasswordButtonClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        onClick={handleDisplayConfirmNewPasswordButtonClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                      </svg>
                    </>
                  )}
                </div>
              </div>
              {showError && (
                <div className="password-error-message-signup">
                  Les mots de passes ne correspondent pas.
                </div>
              )}
              {/* {password !== "" && !validatePassword(password) && (
                <p className="settings-page-error-password-change">
                  Le mot de passe doit contenir au moins une majuscule, un
                  chiffre et un caractère spécial et 8 caractères minimum.
                </p>
              )} */}
            </div>

            <div className="settings-page-validation-button-container">
              <Button
                text={"Changer mot de passe"}
                hover="button-hover-props"
                active="button-active-props"
              />
            </div>
            <div className="settings-page-line-separation"></div>
            <div className="settings-page-wallet-change-container">
              <div className="settings-page-wallet-change-wrap">
                <div className="settings-page-wallet-change-title">Wallet</div>
                <div className="settings-page-wallet-change-current-wallet">
                  0x6Bde457Df68E2c4Ec1b2d8CFb951324195E6a7Be
                </div>

                <div className="settings-page-validation-button-container">
                  <Button
                    text={"Changer de wallet"}
                    hover="button-hover-props"
                    active="button-active-props"
                  />
                </div>
              </div>
              <div className="settings-page-line-separation"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

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
    const displayNameRegex =  /^[A-Za-z0-9][A-Za-z0-9 ]{1,29}$/;
    setUsernameRegexError(!displayNameRegex.test(e.target.value));
  }
//   function handleUsernameChange(e) {
//     const usernameValue = e.target.value;
//     setUsername(usernameValue);
//     const usernameRegex = /^[a-zA-Z0-9_]{1,14}$/;
//     setUsernameRegexError(!usernameRegex.test(e.target.value));
//   }
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
                  Veuillez entrer un nom d'affichage valide. Il doit comporter 2 à 29 caractères
                   alphanumérique
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
      </div>
    </div>
  );
}

export default SettingsPage;

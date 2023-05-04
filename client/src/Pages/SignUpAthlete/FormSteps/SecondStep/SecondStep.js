import React, { useState, useEffect, useRef } from "react";
import "./SecondStep.css";
import { isValidNumber, parsePhoneNumber } from "libphonenumber-js";
import CountryFlag from "react-country-flag";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function SecondStep({ setSecondStepValidated }) {
  const [firstInputValidated, setFirstInputValidated] = useState(false);
  const [secondInputValidated, setSecondInputValidated] = useState(false);
  const [thirdInputValidated, setThirdInputValidated] = useState(false);
  const [fourthInputValidated, setFourthInputValidated] = useState(false);
  const [fifthInputValidated, setFifthInputValidated] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const inputRef = useRef([]);

  // Backend here
  const defaultValue = {
    name: "Votre nom",
    athletename: "Nom d'athlete",
    sport: "Sport",
    mail: "Votre mail",
    phone: "Numéro de téléphone",
  };

  const array = [
    { defaultValue: "Votre nom", name: "name" },
    { defaultValue: "Nom d'athlete", name: "athletename" },
    { defaultValue: "Sport", name: "sport" },
    { defaultValue: "Votre mail", name: "mail" },
    { defaultValue: "Numéro de téléphone: +33 06 06 06 06", name: "phone" },
  ];

  const handleChange = (e) => {
    if (
      e.target.value === "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "";
    }
    if (
      e.target.value !== "" &&
      e.target.value !== defaultValue[e.target.name]
    ) {
      e.target.className = "typed";
      console.log("on ajoute la classe typed");
    }
    if (e.target.name === "phone") {
      const phoneInputElement = document.querySelector(".PhoneInputInput");
      if (phoneNumber !== "") {
        phoneInputElement.classList.add("typed");
      } else {
        phoneInputElement.classList.remove("typed");
      }
    }
  };

  const handleFocus = (e) => {
    e.target.placeholder = "";
  };

  function handleBlurFirstInput(e) {
    // console.log(e.target.value)
    if (
      e.target.name === "name" &&
      e.target.value !== defaultValue[e.target.name] &&
      e.target.name === "name" &&
      e.target.value !== ""
    ) {
      setFirstInputValidated(true);
      console.log("input 1 validée");
    } else {
      setFirstInputValidated(false);
    }
    const inputName = e.target.name;

    if (!e.target.value) {
      e.target.placeholder = defaultValue[inputName];
    }

    if (
      e.target.value === "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "";
    }
  }
  function handleBlurSecondInput(e) {
    if (
      e.target.name === "athletename" &&
      e.target.value !== defaultValue[e.target.name] &&
      e.target.name === "athletename" &&
      e.target.value !== ""
    ) {
      setSecondInputValidated(true);
      console.log("input 2 validée");
    }
    const inputName = e.target.name;

    if (!e.target.value) {
      e.target.placeholder = defaultValue[inputName];
    }

    if (
      e.target.value === "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "";
    }
  }
  function handleBlurThirdInput(e) {
    if (
      e.target.name === "sport" &&
      e.target.value !== defaultValue[e.target.name] &&
      e.target.name === "sport" &&
      e.target.value !== ""
    ) {
      setThirdInputValidated(true);
      console.log("input 3 validée");
    }
    const inputName = e.target.name;

    if (!e.target.value) {
      e.target.placeholder = defaultValue[inputName];
    }

    if (
      e.target.value === "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "";
    }
  }
  function handleBlurFourthInput(e) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const inputName = e.target.name;

    if (!e.target.value) {
      e.target.placeholder = defaultValue[inputName];
    }

    if (
      e.target.value === "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "";
    }

    if (emailRegex.test(e.target.value)) {
      setFourthInputValidated(true);
      setEmailError(false);
      console.log("input 4 validée");
    } else {
      setFourthInputValidated(false);
      setEmailError(true);
    }
  }
  function handleBlurFifthInput(e) {
    const inputName = e.target.name;

    if (!e.target.value) {
      e.target.placeholder = defaultValue[inputName];
    }

    if (
      e.target.value === "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "";
    }

    if (phoneNumber) {
      if (isValidNumber(phoneNumber)) {
        const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
        setFifthInputValidated(true);
        setPhoneError(false);
        setPhoneCountryCode(parsedPhoneNumber.country);
        console.log("input 5 validée");
      } else {
        setFifthInputValidated(false);
        setPhoneError(true);
        setPhoneCountryCode(null);
      }
    } else {
      setFifthInputValidated(false);
      setPhoneError(true);
    }
  }
  const handlePhoneInputChange = (value) => {
    setPhoneNumber(value);
    setFifthInputValidated(false);
    handleChange({ target: { name: "phone", value } });
  };
  if (
    firstInputValidated === true &&
    secondInputValidated === true &&
    thirdInputValidated === true &&
    fourthInputValidated === true &&
    fifthInputValidated === true
  ) {
    console.log("tout est validé !");
    setSecondStepValidated(true);
  } else {
    setSecondStepValidated(false)
  }
  return (
    <div className="secondstep-container">
      <div className="second-step-form-container">
        <form>
          <div className="form-and-title">
            <h2 className="title-signup-athlete-form">
              Vos informations personnelles
            </h2>
            <div className="input-container-secondstep">
              <input
                name={array[0].name}
                placeholder={array[0].defaultValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlurFirstInput}
                type="text"
              />
              <input
                name={array[1].name}
                placeholder={array[1].defaultValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlurSecondInput}
                type="text"
              />
              <input
                name={array[2].name}
                placeholder={array[2].defaultValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlurThirdInput}
                type="text"
              />
              <input
                name={array[3].name}
                placeholder={array[3].defaultValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlurFourthInput}
                type="text"
              />
              {emailError && (
                <p className="second-step-form-error-message">
                  Veuillez entrer une adresse e-mail valide.
                </p>
              )}
              {/* <input
                name={array[4].name}
                placeholder={array[4].defaultValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlurFifthInput}
                type="tel"
              /> */}
              <PhoneInput
                international
                withCountryCallingCode
                countryCallingCodeEditable={false}
                defaultCountry="FR"
                value={phoneNumber}
                onChange={handlePhoneInputChange}
                onBlur={handleBlurFifthInput}
                placeholder={array[4].defaultValue}
                inputClassName="phone-input-custom"
              />
              {phoneError && (
                <p className="second-step-form-error-message">
                  Veuillez entrer un numéro de téléphone valide.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SecondStep;

import React, { useState, useEffect, useRef } from "react";
import "./SecondStep.css";
import { v4 as uuidV4 } from "uuid";

function SecondStep({ setSecondStepValidated }) {
  const [firstInputValidated, setFirstInputValidated] = useState(false);
  const [secondInputValidated, setSecondInputValidated] = useState(false);
  const [thirdInputValidated, setThirdInputValidated] = useState(false);
  const [fourthInputValidated, setFourthInputValidated] = useState(false);
  const [fifthInputValidated, setFifthInputValidated] = useState(false);

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
    { defaultValue: "Numéro de téléphone", name: "phone" },
  ];

  const handleChange = (e) => {
    if (
      e.target.value === "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "";
    }
    if (
      e.target.value !== "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "typed";
    }
  };

  const handleFocus = (e) => {
    e.target.placeholder = "";
  };

  const handleBlur = (e) => {
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
    if (
      e.target.name === "mail" &&
      e.target.value !== defaultValue[e.target.name] &&
      e.target.name === "mail" &&
      e.target.value !== ""
    ) {
      setFourthInputValidated(true);
      console.log("input 4 validée");
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
  function handleBlurFifthInput(e) {
    if (
      e.target.name === "phone" &&
      e.target.value !== defaultValue[e.target.name] &&
      e.target.name === "phone" &&
      e.target.value !== ""
    ) {
      setFifthInputValidated(true);
      console.log("input 5 validée");
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
  if (
    firstInputValidated === true &&
    secondInputValidated === true &&
    thirdInputValidated === true &&
    fourthInputValidated === true &&
    fifthInputValidated === true
  ) {
    console.log("tout est validé !");
    setSecondStepValidated(true);
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
              {/* {array.map((element, index) => {
                return (
                  <input
                    name={element.name}
                    type="text"
                    onFocus={handleFocus}
                    ref={(el) => (inputRef.current[index] = el)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    key={uuidV4()}
                    placeholder={array[0].defaultValue}
                  />
                );
              })} */}
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
              <input
                name={array[4].name}
                placeholder={array[4].defaultValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlurFifthInput}
                type="text"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SecondStep;

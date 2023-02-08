import React, { useRef } from "react";
import "./SecondStep.css";
import { v4 as uuidV4 } from "uuid";

function SecondStep({ setSecondStepValidated }) {
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
    const inputName = e.target.name;

    array.forEach((element) => {
      const i = array.indexOf(element);
      console.log(defaultValue[inputName]);
      if (inputRef.current[i].value === defaultValue[inputName]) {
        inputRef.current[i].value = "";
        inputRef.current[i].className = "typed";
      }
    });
  };

  const handleBlur = (e) => {
    const inputName = e.target.name;

    if (!e.target.value) {
      e.target.value = defaultValue[inputName];
    }
    if (
      e.target.value === "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "";
    }
  };



  return (
    <>
      <div className="secondstep-container">
        <div className="second-step-form-container">
          <form>
            <div className="form-and-title">
              <h2 className="title-signup-athlete-form">
                Vos informations personnelles
              </h2>
              <div className="input-container-secondstep">
                {array.map((element, index) => {
                  return (
                    <input
                      name={element.name}
                      type="text"
                      onFocus={handleFocus}
                      ref={(el) => (inputRef.current[index] = el)}
                      onBlur={handleBlur}
                      defaultValue={element.defaultValue}
                      onChange={handleChange}
                      key={uuidV4()}
                    />
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SecondStep;

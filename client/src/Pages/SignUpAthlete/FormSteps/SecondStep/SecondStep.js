import React, { useState, useRef } from "react";
import "./SecondStep.css";
import { v4 as uuidV4 } from "uuid";

function SecondStep({ setSecondStepValidated, setStateFormValues }) {
  const [mailError, setMailError] = useState(false);
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
    // setState(e.target.value);
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
      // console.log(defaultValue[inputName]);
      if (inputRef.current[i].value === defaultValue[inputName]) {
        inputRef.current[i].value = "";
        inputRef.current[i].className = "typed";
      }
    });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleBlur = (e) => {
    const inputName = e.target.name;

    if (!e.target.value) {
        // if (e.target.id === "first-imput-signup-athlete") {
        //   e.target.value = "Votre nom";
          
        // }
        e.target.value = defaultValue[inputName];
        // if (e.target.name === "Votre mail" && !emailRegex.test(e.target.value)) {
        //   setMailError(true);
        // } else {
        //   setMailError(false);
        // }
    }
    if (
      e.target.value === "" ||
      e.target.value === defaultValue[e.target.name]
    ) {
      e.target.className = "";
    }
    if (e.target.name === "Votre mail" && !emailRegex.test(e.target.value)) {
      setMailError(true);
    } else {
      setMailError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = {};
    array.forEach((element, index) => {
      formValues[element.name] = inputRef.current[index].value;
    });
    // console.log(formValues);
    setStateFormValues(formValues);
    // Do something with the form values
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
                {/* {array.map((element, index) => {
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
                  })} */}
                <input
                  // name={array[0]}
                  id="first-imput-signup-athlete"
                  name="Votre nom"
                  type="text"
                  onFocus={handleFocus}
                  // ref={(el) => (inputRef.current[index] = el)}
                  onBlur={handleBlur}
                  // defaultValue="Votre nom"
                  placeholder="Votre nom"
                  onChange={handleChange}
                  key={uuidV4()}
                />
                <input
                  id="second-imput-signup-athlete"
                  name="Nom d'athlète"
                  type="text"
                  onFocus={handleFocus}
                  // ref={(el) => (inputRef.current[index] = el)}
                  onBlur={handleBlur}
                  // defaultValue="Nom d'athlète"
                  placeholder="Nom d'athlète"
                  onChange={handleChange}
                  key={uuidV4()}
                />
                <input
                  id="second-imput-signup-athlete"
                  name="Sport"
                  type="text"
                  onFocus={handleFocus}
                  // ref={(el) => (inputRef.current[index] = el)}
                  onBlur={handleBlur}
                  // defaultValue="Sport"
                  placeholder="Sport"
                  onChange={handleChange}
                  key={uuidV4()}
                />
                <input
                  id="second-imput-signup-athlete"
                  name="Votre mail"
                  type="text"
                  onFocus={handleFocus}
                  // ref={(el) => (inputRef.current[index] = el)}
                  onBlur={handleBlur}
                  // defaultValue="Votre mail"
                  placeholder="Votre mail"
                  onChange={handleChange}
                  key={uuidV4()}
                />
                {mailError && (
                  <>
                    <span className="second-step-input-mail-error-message">
                      Le format de mail saisit n'est pas conforme.
                    </span> 
                  </>
                )}
                <input
                  // name={array[0]}
                  id="second-imput-signup-athlete"
                  name="Votre téléphone"
                  type="text"
                  onFocus={handleFocus}
                  // ref={(el) => (inputRef.current[index] = el)}
                  onBlur={handleBlur}
                  // defaultValue="Votre mail"
                  placeholder="Votre téléphone"
                  onChange={handleChange}
                  key={uuidV4()}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SecondStep;

import React from "react";
import "./FormValidation.css";
function FormValidation() {
  return (
    <div className="form-validation-signup-athlete-container">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 60C13.431 60 0 46.569 0 30C0 13.431 13.431 0 30 0C46.569 0 60 13.431 60 30C60 46.569 46.569 60 30 60ZM30 54C36.3652 54 42.4697 51.4714 46.9706 46.9706C51.4714 42.4697 54 36.3652 54 30C54 23.6348 51.4714 17.5303 46.9706 13.0294C42.4697 8.52856 36.3652 6 30 6C23.6348 6 17.5303 8.52856 13.0294 13.0294C8.52856 17.5303 6 23.6348 6 30C6 36.3652 8.52856 42.4697 13.0294 46.9706C17.5303 51.4714 23.6348 54 30 54ZM27.009 42L14.28 29.271L18.522 25.029L27.009 33.516L43.977 16.545L48.222 20.787L27.009 42Z"
          fill="#85D87E"
        />
      </svg>
      <strong className="title-validation-signup-athlete">
        We thank you for this information
      </strong>
      <p className="content-validation-signup-athlete">
        An agent will come back to you within 48 hours to validate your
        registration within SoFan
      </p>
    </div>
  );
}

export default FormValidation;

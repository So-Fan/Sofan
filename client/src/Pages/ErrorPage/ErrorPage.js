import React from "react";
import "./ErrorPage.css";
import errorLogo from "../../Assets/Image/error-red-logo.svg";
function ErrorPage() {
  return (
    <div className="error-page-container">
      <div className="error-page-wrap">
        <div className="error-page-subwrap">
          <div className="error-page-title">
            ERREUR 404 !
            <img src={errorLogo} alt="ERROR LOGO" />
          </div>

          <div className="error-page-description">
            Oupss quelque chose ne s'est pas déroulé correctement !
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;

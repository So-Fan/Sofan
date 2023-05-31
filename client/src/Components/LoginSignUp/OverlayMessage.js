import React from "react";

function OverlayMessage({ onClickRegister, onClickLogin }) {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1 className="title">
           Déjà un compte ? <br />
          </h1>
          <p>Si vous avez un compte, connectez-vous ici.</p>
          <button className="ghost overlay-login-button" id="login" onClick={onClickLogin}>
            Se connecter
            <i className="lni lni-arrow-left login"></i>
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1 className="title">
            Commencez votre<br />
            voyage maintenant
          </h1>
          <p>
            Si vous n'avez pas encore de compte, rejoignez-nous et commencez votre voyage.
          </p>
          <button className="ghost-register" id="register" onClick={onClickRegister}>
            S'inscrire
            <i className="lni lni-arrow-right register"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverlayMessage;

import React from "react";

function OverlayMessage({ onClickRegister, onClickLogin }) {
  return (
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1 class="title">
            Bonjour <br />
            les amis
          </h1>
          <p>Si vous avez un compte, connectez-vous ici et amusez-vous</p>
          <button class="ghost" id="login" onClick={onClickLogin}>
            Se connecter
            <i class="lni lni-arrow-left login"></i>
          </button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1 class="title">
            Commencez votre<br />
            voyage maintenant
          </h1>
          <p>
            Si vous n'avez pas encore de compte, rejoignez-nous et commencez votre voyage.
          </p>
          <button class="ghost" id="register" onClick={onClickRegister}>
            S'inscrire
            <i class="lni lni-arrow-right register"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverlayMessage;
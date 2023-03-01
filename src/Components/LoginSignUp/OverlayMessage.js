import React from "react";

function OverlayMessage(props) {
  return (
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1 class="title">
            Hello <br />
            friends
          </h1>
          <p>if Yout have an account, login here and have fun</p>
          <button class="ghost" id="login">
            Login
            <i class="lni lni-arrow-left login"></i>
          </button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1 class="title">
            Start yout <br />
            journy now
          </h1>
          <p>
            if you don't have an account yet, join us and start your journey.
          </p>
          <button class="ghost" id="register">
            Register
            <i class="lni lni-arrow-right register"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverlayMessage;

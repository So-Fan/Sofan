import React, { useState } from "react";
import Login from "./Login";
import OverlayMessage from "./OverlayMessage";
import SignUp from "./SignUp";
import "./LoginSignUp.css";

function LoginSignUp({web3auth, setWeb3auth}) {
  const [activeButton, setActiveButton] = useState(null);
  const containerClassName =
    activeButton === "register" ? "right-panel-active" : "";

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div
      id="forms-container"
      className={`forms-container ${containerClassName}`}
    >
      <SignUp />
      <Login web3auth={web3auth} setWeb3auth={setWeb3auth} />
      <OverlayMessage
        onClickLogin={() => handleButtonClick("login")}
        onClickRegister={() => handleButtonClick("register")}
      />
    </div>
  );
}

export default LoginSignUp;

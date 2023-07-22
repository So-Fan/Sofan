import React from "react";
import LoginSignup from "../../Components/LoginSignUp/LoginSignUp";

function LoginSignUpScreen({web3auth, setWeb3auth}) {
  return (
    <div className="signup-login-form">
      <LoginSignup web3auth={web3auth} setWeb3auth={setWeb3auth} />
    </div>
  );
}

export default LoginSignUpScreen;

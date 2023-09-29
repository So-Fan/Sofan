import React from "react";
import LoginSignup from "../../Deprecated/DeprecadeSignupLogin/LoginSignUp/LoginSignUp";

function LoginSignUpScreen({ web3auth, setWeb3auth }) {
  return (
    <div className="signup-login-form">
      <LoginSignup web3auth={web3auth} setWeb3auth={setWeb3auth} />
    </div>
  );
}

export default LoginSignUpScreen;

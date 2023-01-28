import React from "react";
import "./WireframeSignInSignUp.css";
const WireframeSignInSignUp = () => {
  return (
    <div className="main-container">
      <form className="container">
        <input type="text" placeholder="username" />
        <input type="text" placeholder="password" />
        <button>Connect</button>
      </form>
      <form className="container">
        <input type="text" placeholder="first name" />
        <input type="text" placeholder="last name" />
        <input type="text" placeholder="username" />
        <input type="text" placeholder="mail" />
        <input type="text" placeholder="password" />
        <button>Create account</button>
      </form>
    </div>
  );
};

export default WireframeSignInSignUp;

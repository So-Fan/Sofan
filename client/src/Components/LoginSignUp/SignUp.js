import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";

function SignUp(props) {


  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/")
        setError(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
        // ..
      });
  };

  return (
    <div class="form-container register-container">
      <form action="#">
        <h1>Inscrivez-vous ici.</h1>
        <input type="text" placeholder="Nom" />
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <button onClick={handleSignUp}>S'inscrire</button>
        <span>ou utilisez votre compte</span>
        <div class="social-container">
          <a href="#" class="social">
            <i class="lni lni-facebook-fill"></i>
          </a>
          <a href="#" class="social">
            <i class="lni lni-google"></i>
          </a>
          <a href="#" class="social">
            <i class="lni lni-linkedin-original"></i>
          </a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle errors here
        setError(error.message);
        console.error(error);
      });
  };

  return (
    <div class="form-container register-container">
      <form action="#" onSubmit={handleSignUp}>
        <h1>Inscrivez-vous ici.</h1>
        <input type="text" placeholder="Nom" />
        <input type="text" placeholder="Username" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button>S'inscrire</button>
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

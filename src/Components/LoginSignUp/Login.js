import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
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
    <div class="form-container login-container">
      <form action="#" onSubmit={handleLogin}>
        <h1 style={{ fontSize: 25 }}>Connectez-vous ici.</h1>
        {error && (
          <span className="error-message">
            Votre identifiant Sofan ou votre Mot de Passe est incorrect.
          </span>
        )}
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
        <div class="content">
          <div class="checkbox">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label>Se souvenir de moi</label>
          </div>
          <div class="pass-link">
            <a href="#">Mot de passe oublié?</a>
          </div>
        </div>
        <button>Se connecter</button>
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

export default Login;

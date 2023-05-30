import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";



function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setError(false);
        // setloggedUser(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setError(true);
        // ..
      });
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    console.log("Google Logged");

    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
      console.log(res.user.getIdToken(true));
    } catch (err) {
      console.error(err);
      throw err;
    }

  };

  const handleAppleSignIn = async (e) => {
    e.preventDefault();
    console.log("Apple Logged");
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
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
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
          <button onClick={(e) => handleGoogleSignIn(e)} className="social">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/google%201.png?alt=media&token=3a8d7bf6-eaf1-46d1-a1b4-0c73eb8ac18f"
              alt="google logo"
            />
          </button>
          <button onClick={(e) => handleAppleSignIn(e)} className="social">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple logo"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

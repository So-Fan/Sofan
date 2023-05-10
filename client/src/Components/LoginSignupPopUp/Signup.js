import React from "react";
import "./Signup.css";
import Button from "../Button/Button";
function Signup() {
  return (
    <div className="signup-user-container">
      <div className="signup-user-wrap">
        <div className="signup-user-title">Signup</div>
        <div className="signup-user-title-description">
          Sign up now to connect with athletes and explore exclusive NFT content
          within a vibrant community of sports enthusiasts!
        </div>
        <div className="signup-user-mail-title">E-mail</div>
        <input
          className="signup-user-mail-input"
          type="email"
          placeholder="Entrez votre mail"
          name=""
          id=""
        />

        <div className="signup-user-username-title">Pseudo</div>
        <input
          className="signup-user-username-input"
          type="text"
          placeholder="Choisissez votre pseudo"
          name=""
          id=""
        />

        <div className="signup-user-phone-title">Numéro de téléphone</div>
        <input
          className="signup-user-phone-input"
          type="tel"
          placeholder="+33 06 06 06 06"
          name=""
          id=""
        />
        <div className="signup-user-password-title">Mot de passe</div>
        <input
          className="signup-user-password-input"
          type="password"
          placeholder="Entrer votre mot de passe"
          name=""
          id=""
        />
        <div className="signup-user-confirmation-password-title">
          Confirmer mot de passe
        </div>
        <input
          className="signup-user-confirmation-password-input"
          type="password"
          placeholder="Confirmez votre mot de passe"
          name=""
          id=""
        />
        <button className="signup-user-create-account-button">
          Créer mon compte
        </button>
        <div className="signup-user-separation-line-container">
          <div className="signup-user-separation-line-left"></div>
          {/* 43.47% */}
          <div className="signup-user-separation-or">OU</div>
          <div className="signup-user-separation-line-right"></div>
        </div>
        <div className="signup-user-google-signup">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/google%201.png?alt=media&token=3a8d7bf6-eaf1-46d1-a1b4-0c73eb8ac18f"
            alt="google logo"
          />
          <div className="signup-user-google-signup-text">
            S'inscrire avec Google
          </div>
        </div>
        <div className="signup-user-already-an-account">
          Vous avez déjà un compte ? <span>Se connecter</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;

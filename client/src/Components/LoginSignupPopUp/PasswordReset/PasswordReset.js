import React, { useState } from 'react';
import './PasswordReset.css'
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";  // Import Firebase auth methods
import { auth } from '../../../Configs/firebase';

function PasswordReset() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get('oobCode');  // This is the token from the URL

  function validatePassword(password) {
    if (!password) {
      return false;
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};:,'".<>?~=-])[A-Za-z\d!@#$%^&*()_+[\]{};:,'".<>?~=-]{8,100}$/;

    return regex.test(password);
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage("Votre mot de passe ne respecte pas les critères.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Mot de passe réinitialisé avec succès!");
      setIsPasswordChanged(true);
    } catch (error) {
      setMessage("Erreur lors de la réinitialisation du mot de passe.");
      console.error(error);
    }
  };

  return (
    <div className="password-reset-container">
      {isPasswordChanged ? (
        <h1>Mot de passe changé avec succès!</h1>
      ) : (
        <>
          <h1>Changer le mot de passe</h1>
          <form onSubmit={handlePasswordReset}>
            <label htmlFor="new-password">Nouveau mot de passe:</label><br />
            <input type="password" id="new-password" name="new-password" required onChange={(e) => setNewPassword(e.target.value)} /><br /><br />

            <label htmlFor="confirm-password">Confirmer le mot de passe:</label><br />
            <input type="password" id="confirm-password" name="confirm-password" required onChange={(e) => setConfirmPassword(e.target.value)} /><br /><br />

            <button type="submit" className="change-password-button">Changer le mot de passe</button>
          </form>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
}

export default PasswordReset;

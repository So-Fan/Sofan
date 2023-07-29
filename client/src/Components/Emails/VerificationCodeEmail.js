import React from "react";

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fafafa",
    margin: 0,
    padding: 0,
    lineHeight: 1.6,
  },
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  },
  logo: {
    textAlign: "center",
    marginBottom: 30,
  },
  logoImage: {
    maxWidth: 150,
  },
  verificationCode: {
    padding: 30,
    backgroundColor: "#f6d463",
    color: "#000000",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    borderRadius: 5,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  welcomeMessage: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    color: "#888888",
  },
};

const VerificationCodeEmail = ({ code }) => {
  return (
    <div style={styles.container}>
      <div style={styles.logo}>
        <img
          src="https://www.sofan.app/static/media/sofanlogo.0ebbca7be5c3d47afa2134b5079fe2b8.svg"
          alt="Logo Sofan"
          style={styles.logoImage}
        />
      </div>
      <div style={styles.verificationCode}>
        <p>Vérifiez votre compte</p>
        <p>
          Code de vérification : <strong>{code}</strong>
        </p>
      </div>
      <div style={styles.welcomeMessage}>
        <p>Bienvenue sur Sofan !</p>
        <p>
          Achetez des NFT exclusifs de vos athlètes préférés et rejoignez notre
          communauté.
        </p>
        <p>Préparez-vous à vivre une expérience unique.</p>
      </div>
      <div style={styles.footer}>
        <p>
          Si vous avez besoin d'aide, n'hésitez pas à contacter notre équipe de
          support dédiée à{" "}
          <a href="mailto:support@sofan.com">support@sofan.app</a>.
        </p>
        <p>
          Merci d'avoir choisi Sofan! Nous sommes impatients de vous servir.
        </p>
      </div>
    </div>
  );
};

export default VerificationCodeEmail;

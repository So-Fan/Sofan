import React, { useState, useEffect } from "react";
import "./NewsLetter.css";
import "./NewsLetterLoading.css";
import { db } from "../../Config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import "firebase/firestore";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
  const emailCollectionRef = collection(db, "news_letter_email");
  const [isClicked, setIsClicked] = useState(false);
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = () => {
    setIsValid(validateEmail(email));
    setIsClicked(true);
  };

  const handleSubsAfter = async () => {
    if (!isValid || !email) return;
    let data;
    try {
      const emailRef = query(emailCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(emailRef);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data = doc.data();
      });
      if (!data) {
        await addDoc(emailCollectionRef, { email: email, date: new Date() });
        setIsSubscribed(true);
        setIsAlreadySubscribed(false);
        setIsClicked(false);
        // analytics.logEvent("newsletter_subscribed", { email });
      } else {
        setIsSubscribed(false);
        setIsAlreadySubscribed(true);
        setIsValid(false);
        setIsClicked(false);
      }
    } catch (error) {
      console.error("Error adding email to Firestore: ", error);
    }
  };
  useEffect(() => {
      handleSubsAfter();
  }, [isClicked]);

  if (isAlreadySubscribed) {
    return (
      <div>
        <div style={styles.message}>
          Il semblerait que vous êtes déjà abonnée avec ce email.
        </div>
      </div>
    );
  } else if (!isSubscribed) {
    return (
      <div className="newsletter-container">
        <div style={styles.message}>
          Soyez au courant quand Sofan sera live !
        </div>
        <div style={styles.container}>
          <input
            className={`email-input ${!isValid ? "Invalid" : ""} ${
              email && validateEmail(email) && isValid ? "Valid" : ""
            }`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre adresse email"
            style={styles.input}
          />
          <button
            onClick={handleSubscribe}
            style={styles.button}
            className="subscribe-button"
          >
            Abonnez-vous
          </button>
        </div>
        <div style={isClicked && isValid ? {display: "inline-block" } : {display: "none"}} className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else if (isSubscribed && !isAlreadySubscribed) {
    return (
      <div>
        <div style={styles.message}>
          Votre adresse email a bien été reçu. Nous vous tiendrons au courant
          des dernières actualités de Sofan !
        </div>
      </div>
    );
  }
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
  },
  message: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    width: "19em",
    fontSize: "16px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid black",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#f6d463",
    color: "black",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 500ms ease-in-out, color 500ms ease-in-out",
  },
};

export default NewsLetter;

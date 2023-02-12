import React, { useState, useEffect } from 'react';
import './NewsLetter.css';
import { db } from "../../Config/firebase";
import { collection, addDoc } from 'firebase/firestore';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const emailCollectionRef = collection(db, 'news_letter_email')

  const handleSubscribe = async () => {
    if (!email || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
      setIsValid(false);
      return;
    } 

    try {
      await addDoc(emailCollectionRef, {email: email})
    } catch (error) {
      console.error("Error adding email to Firestore: ", error);
    }
    // try {
    //   await firestore
    //     .collection("news_letter_email")
    //     .doc(email)
    //     .set({ email });
    // } catch (error) {
    //   console.error("Error adding email to Firestore: ", error);
    // }
  };

  return (
    <div>
      <div style={styles.message}>Soyez au courant quand Sofan sera live !</div>
      <div style={styles.container}>
        <input
          className={`email-input ${!isValid ? 'Invalid' : ''} ${email && /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email) && isValid ? 'Valid' : ''}`}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Entrez votre adresse email"
          style={styles.input}
        />
        <button onClick={handleSubscribe} style={styles.button}>
          Abonnez-vous
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
  },
  message: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    width: "19em",
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid black',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#f6d463',
    color: 'black',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default NewsLetter;

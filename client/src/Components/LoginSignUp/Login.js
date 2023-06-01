import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import { getFirestore, getDocs, query, where, collection, addDoc, Timestamp } from "firebase/firestore";


function Login() {
  const { setLoggedInUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        const q = query(collection(db, 'users'), where('id', '==', user.uid));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userInfo = doc.data();

            const AllUserInfo = {
              ...user,
              ...userInfo
            }
            setLoggedInUser(AllUserInfo);
            // Do something with the user info
          });
        } else {
          // Handle case when no user is found with the given ID
          console.log('No user found');
        }
        setError(false);
        
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
      

      const q = query(collection(db, 'users'), where('id', '==', res.user.uid));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userInfo = doc.data();
          const AllUserInfo = {
            ...res.user,
            ...userInfo
          }
          setLoggedInUser(AllUserInfo);
        });
      } else {
        // Handle case when no user is found with the given ID
        const createdAt = new Date();
        const user = res.user;
        const usersRef = collection(db, "users");
        const newUser = {
          id: user.uid,
          email: user.email,
          account_created: Timestamp.fromMillis(createdAt.getTime()), // Replace 'user.metadata.creationTime' with appropriate field
          account_type: "free",
          name: user.displayName,
          username: user.displayName.split(" ")[0], // Assuming first name as username
          display_name: user.displayName,
          phone: user.phoneNumber,
          emailVerified: user.emailVerified,
          news: false,
          premium: false,
          profile_banner: "https://placehold.co/600x400",
          status: true,
        };

        await addDoc(usersRef, newUser);

        console.log('No user found');
      }


      navigate("/");
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
    <div className="form-container login-container">
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
        <div className="content">
          <div className="checkbox">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label>Se souvenir de moi</label>
          </div>
          <div className="pass-link">
            <a href="#">Mot de passe oublié?</a>
          </div>
        </div>
        <button>Se connecter</button>
        <span>ou utilisez votre compte</span>
        <div className="social-container">
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

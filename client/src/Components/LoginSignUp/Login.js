import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import { getFirestore, getDocs, query, where, collection } from "firebase/firestore";

// mathéo
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
// fin mathéo


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


  const {
    state: { contract, accounts, isOwner, isMintOn, mintPrice },
    isWalletConnectClicked
  } = useEth();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    console.log("Google Logged");
    let idToken;
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
        console.log('No user found');
      }


      navigate("/");
      console.log(res);
      console.log(res.user.getIdToken(true));
      idToken = res.user.getIdToken(true);
    } catch (err) {
      console.error(err);
      throw err;
    }
    // matheo
    const web3auth = new Web3AuthNoModal({
      clientId: "BJqBp0LJfmTafSfMeXtyOcKXLdZhsOl_94wb-C8dFKiB3BJAFQq8LgmAqhj9HTT_bPaWq_FOA5mwFljJ6QUzcRU",
      web3AuthNetwork: "cyan",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155, // SOLANA, OTHER
        chainId: "0x5",
      },
    });
  
    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        uxMode: "redirect",
        loginConfig: {
          jwt: {
            name: "test",
            verifier: "sofantest",
            typeOfLogin: "jwt",
            clientId: "640702967010-1us0pbfalm4lo039sv4ghjum3fsesalv.apps.googleusercontent.com",
          },
        },
      },
    });
    
    web3auth.configureAdapter(openloginAdapter);
    await web3auth.init();
    try {
      await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: idToken,
          verifierIdField: "640702967010-1us0pbfalm4lo039sv4ghjum3fsesalv.apps.googleusercontent.com", // same as your JWT Verifier ID
          domain: "https://YOUR-APPLICATION-DOMAIN" || "http://localhost:3000",
        },
      });
    } catch (error) {
      console.error(error);
    }
    console.log("1");
    const user = await web3auth.getUserInfo();
    console.log("2");
    console.log("User info", user);
    const web3 = new Web3(web3auth.provider);
    const userAccounts = await web3.eth.getAccounts();
    console.log(userAccounts);
    //fin mathéo
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

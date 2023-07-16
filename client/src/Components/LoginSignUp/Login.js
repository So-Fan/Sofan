import React, { useState, useEffect, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import { getFirestore, getDocs, query, where, collection } from "firebase/firestore";

// mathéo
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
// fin mathéo

function Login() {
  const { setLoggedInUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // const clientId = process.env.WEB3AUTH_TOKEN_ID;
  console.log(process.env.REACT_APP_WEB3AUTH_TOKEN_ID);
  const navigate = useNavigate();
// debut matheo 

const [web3auth, setWeb3auth] = useState(null);
  // const [provider, setProvider] = useState(
  //   null
  // );
  // debut matheo
  const {
    state: { contract, accounts, isOwner, isMintOn, mintPrice },
    isWalletConnectClicked,
    setIsWalletConnectClicked,
    setProvider,
    provider
  } = useEth();
// fin matheo

useEffect(() => {
  const init = async () => {
    try {
      let clientId = process.env.REACT_APP_WEB3AUTH_TOKEN_ID;
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x5", // Please use 0x1 for Mainnet
        rpcTarget: "https://rpc.ankr.com/eth_goerli",
        displayName: "Goerli Testnet",
        blockExplorer: "https://goerli.etherscan.io/",
        ticker: "ETH",
        tickerName: "Ethereum",
      };
      const web3auth = new Web3AuthNoModal({
        clientId,
        chainConfig,
        web3AuthNetwork: "cyan",
        useCoreKitKey: false,
      });

      const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
        adapterSettings: {
          uxMode: "popup",
          loginConfig: {
            jwt: {
              verifier: "sofantest2",
              typeOfLogin: "jwt",
              clientId,
            },
          },
        },
      });
      web3auth.configureAdapter(openloginAdapter);
      setWeb3auth(web3auth);

      await web3auth.init();
      setProvider(web3auth.provider);

      
    } catch (error) {
      console.error(error);
    }
  };

  init();
}, []);
// fin matheo

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
    // let idToken;
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
        return res
      } else {
        // Handle case when no user is found with the given ID
        console.log('No user found');
      }
      // navigate("/");
      // console.log(res);
      // console.log(res.user.getIdToken(true));
      // idToken = res.user.getIdToken(true);
      } catch (err) {
        console.error(err);
        throw err;
      }
  };

  const login = async (e) => {
    e.preventDefault();
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    // switch case pour chaque Signin
    const loginRes = await handleGoogleSignIn(e);
    // console.log("login details", loginRes);
    const idToken = await loginRes.user.getIdToken(true);
    // console.log("idToken", idToken);

    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: idToken,
          verifierIdField: "sub",
          domain: "http://localhost:3000",
        },
      }
    );
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    try {
      const web3 = new Web3(provider)
      const accounts = await web3.eth.getAccounts()
      console.log(accounts);
    } catch (error) {
      return error
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
          {/* <button onClick={(e) => handleGoogleSignIn(e)} className="social"> */}
          <button onClick={(e) => login(e)} className="social">
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
          <button onClick={getUserInfo}>getUserInfo</button>
          <button onClick={logout}>logout</button>
          <button onClick={getAccounts}>getAccounts</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

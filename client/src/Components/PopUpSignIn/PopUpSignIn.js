import React, { useState, useEffect, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db, ref } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";

// mathéo
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
// fin mathéo
import {
  collection,
  Timestamp,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import "./PopUpSignIn.css";
import Button from "../Button/Button";
import ForgotPassword from "../LoginSignupPopUp/ForgotPassword/ForgotPassword";

const PopUpSignIn = ({
  web3auth,
  setWeb3auth,
  handlePopoUpSignInSignUpClick,
  setIsSignInButtonClicked,
  checkWalletProvider,
}) => {
  const googleImage =
    "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/google%201.png?alt=media&token=3a8d7bf6-eaf1-46d1-a1b4-0c73eb8ac18f";

  const { setLoggedInUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [allUserInfo, setAllUserInfo] = useState({});
  const [firebaseIdToken, setFirebaseIdToken] = useState();
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [isSigninLoading, setIsSigninLoading] = useState(false);
  const [isSigninFormValid, setIsSignInFormValid] = useState(false);
  // const [endGoogleLogin, setEndGoogleLogin] = useState(false)
  const {
    state: { accounts },
    setWeb3authProvider,
    setIsWalletConnectClicked,
    setIsWeb3authConnectClicked,
  } = useEth();

  useEffect(() => {
    const init = async () => {
      try {
        let clientId = process.env.REACT_APP_WEB3AUTH_TOKEN_ID;
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x5", // Please use 0x1 for Mainnet
          rpcTarget: process.env.REACT_APP_INFURA_ID,
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

        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

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
        setWeb3authProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  function handleMailInput(e) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (emailRegex.test(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSigninLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let tempUserData;
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const userInfo = doc.data();

            const AllUserInfo = {
              ...user,
              ...userInfo,
            };
            tempUserData = AllUserInfo;
            setLoggedInUser(AllUserInfo);
          });

          if (checkWalletProvider(tempUserData) === "web3auth") {
            // await web3auth.logout();
            await auth.currentUser
              .getIdToken(true)
              .then(async function (idToken) {
                const web3authProvider = await web3auth.connectTo(
                  WALLET_ADAPTERS.OPENLOGIN,
                  {
                    loginProvider: "jwt",
                    extraLoginOptions: {
                      id_token: idToken,
                      verifierIdField: "sub",
                      domain: process.env.REACT_APP_DOMAIN_TOKEN_ID,
                    },
                  }
                );
                setWeb3authProvider(web3authProvider);
                setIsWeb3authConnectClicked([true, web3authProvider]);
              })
              .catch(function (error) {
                // Handle error
                console.error("Error getting ID token:", error);
              });
            // setTimeout(() => {
            setIsSigninLoading(false);
            // }, 2000);
          } else {
            setIsWalletConnectClicked(true);
          }
        } else {
          // Handle case when no user is found with the given ID
          setIsSigninLoading(false);
          console.log("No user found");
        }
        setError(false);
        setIsSignInButtonClicked(false);
        setIsSigninLoading(false);

        // navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setError(true);
        setIsSigninLoading(false);
      });
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, googleProvider); // Google auth check
      const usersRef = collection(db, "users");
      const userDocRef = doc(usersRef, res.user.uid);
      const userDoc = await getDoc(userDocRef);
      let tempUserInfo;
      if (userDoc.exists()) {
        const userInfo = userDoc.data();
        const AllUserInfo = {
          ...res.user,
          ...userInfo,
        };
        tempUserInfo = AllUserInfo;
        setLoggedInUser(AllUserInfo);
      } else {
        const createdAt = new Date();
        const user = res.user;
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
          profile_avatar:
            "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/user_profile%2Fdefault_avatar%2FEllipse%2045.png?alt=media&token=bde0f1b1-7d06-4eea-877c-d8916e1f9032",
          profile_banner:
            "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/user_profile%2Fdefault_banner%2FbannerUserProfile.png?alt=media&token=5e614810-d6e1-49c1-bb42-e1905f068a1a",
          status: true,
          sport: "",
        };

        setLoggedInUser(newUser);

        await setDoc(userDocRef, newUser);
      }
      console.log(res);
      return [res, tempUserInfo];
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;

      console.log(`Error Code: ${errorCode}`);
      console.error(`Error Message: ${errorMessage}`);
    }
  };

  // useEffect(() => {
  //   if(endGoogleLogin === true){
  //     setIsWeb3authConnectClicked(true)
  //   console.log("useEffect sign in set isWeb3authConnectClicked");
  //   }else{
  //     console.log("useEffect sign in not triggered");
  //   }
  // }, [endGoogleLogin] )

  const googleLogin = async (e) => {
    e.preventDefault();
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    // switch case pour chaque Signin
    const loginRes = await handleGoogleSignIn(e);
    console.log(loginRes);
    if (checkWalletProvider(loginRes[1]) === "web3auth") {
      // console.log("login details", loginRes);
      const idToken = await loginRes[0].user.getIdToken(true);
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
      setWeb3authProvider(web3authProvider);
      setIsWeb3authConnectClicked([true, web3authProvider]);
      // console.log("endGoogleLogin : ", endGoogleLogin);
      console.log("sign in web3auth");
    } else {
      setIsWalletConnectClicked(true);
      console.log("sigin metamsk");
    }

    setIsSignInButtonClicked(false);
    // navigate("/");
  };

  const handleAppleSignIn = async (e) => {
    e.preventDefault();
    console.log("Apple Logged");
  };
  function handleForgotPasswordClick(e) {
    setIsForgotPasswordClicked(true);
  }

  function handleForgotPasswordClick(e) {
    setIsForgotPasswordClicked(true);
  }
  function handleSigninFormValid() {
    if (email !== "" && emailError === false) {
      console.log("Le form sign in est valide");
      setIsSignInFormValid(true);
    } else if (email === "" || emailError === true) {
      console.log("Le form sign in est pas valide");
      setIsSignInFormValid(false);
    }
  }
  // useEffect(() => {

  //   handleSigninFormValid();
  // }, [])
  useEffect(() => {
    if (email !== "" && !emailError && password !== "" && password.length > 8) {
      setIsSignInFormValid(true);
    } else {
      setIsSignInFormValid(false);
    }
  }, [email, emailError, password]);
  return (
    <>
      {isForgotPasswordClicked ? (
        <>
          <ForgotPassword
            setIsForgotPasswordClicked={setIsForgotPasswordClicked}
          />
        </>
      ) : (
        <>
          <div className="popupsignin-component">
            <span>Se connecter</span>
            <span>
              Sign up now to connect with athletes and explore exclusive NFT
              content within a vibrant community of sports enthusiasts!
            </span>
            {error && (
              <span className="popupsignin-error-message">
                Votre Email ou votre Mot de Passe est incorrect.
              </span>
            )}
            <div className="popupsignin-input-container">
              <span>E-mail</span>
              <input
                type="text"
                placeholder={"Entrez votre mail"}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleMailInput}
              />
              {emailError && (
                <p className="popupsignin-input-mail-error">
                  Veuillez entrer une adresse e-mail valide.
                </p>
              )}
            </div>
            <div className="popupsignin-input-container">
              <span>Mot de passe</span>
              <input
                type="password"
                placeholder={"Entrez votre mot de passe"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleForgotPasswordClick}
              className="popupsignin-forget-password"
            >
              Mot de passe oublié ?
            </button>
            {isSigninLoading && (
              <>
                <div className="popupsignin-loading-mail-signin-animation">
                  <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </>
            )}
            <button
              disabled={!isSigninFormValid || isSigninLoading}
              style={
                isSigninLoading
                  ? {
                      backgroundColor: "#f6d46349",
                      border: "#f6d463 1px solid",
                      pointerEvents: "none",
                    }
                  : !isSigninFormValid
                  ? { opacity: 0.5 }
                  : {}
              }
              onClick={handleLogin}
              className="popupsignin-signin-button"
            >
              {isSigninLoading ? <></> : <>Se connecter</>}
            </button>
            <div className="popupsignin-style-container">
              <div></div>
              <span>OU</span>
              <div></div>
            </div>
            <div className="popupsignin-socials-container">
              <img src={googleImage} alt="google sign in" />
              <button
                className="popupsignin-google-button"
                onClick={googleLogin}
              >
                Se connecter avec Google
              </button>
            </div>
            <div className="popupsignin-signup-container">
              <span>Vous n'avez pas de compte ? </span>
              <button
                onClick={handlePopoUpSignInSignUpClick}
                className="popupsignin-signup-button"
              >
                Créer un compte
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PopUpSignIn;

const popUpSignInForgotPasswordButton = {
  color: "#3C4045",
  fontFamily: "britanica-heavy",
  lineHeight: "normal",
  textDecorationLine: "underline",
  outline: "none",
  border: "transparent",
  backgroundColor: "transparent",
  marginBottom: "40px",
};

const popUpSignInButton = {
  // color: "#3C4045",
  fontFamily: "britanica-heavy",
  fontSize: "20px",
  lineHeight: "normal",
  outline: "none",
  border: "transparent",
  backgroundColor: "#F6D463",
  marginBottom: "20px",
  borderRadius: "10px",
  width: "460px",
  height: "56px",
};

const popUpSignInGoogleButton = {
  fontFamily: "britanica-heavy",
  fontSize: "20px",
  lineHeight: "normal",
  backgroundColor: "white",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid rgba(60, 64, 69, 0.40)",
  width: "425px",
  height: "56px",
  paddingLeft: "35px",
};

const popUpSignInSignUpRedirectButton = {
  color: "#F6D463",
  fontFamily: "britanica-heavy",
  lineHeight: "normal",
  fontSize: "16px",
  outline: "none",
  border: "transparent",
  backgroundColor: "transparent",
};

import React, { useState, useEffect, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db, ref } from "../../Configs/firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext/UserContext";

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
  const [isSigninGoogleLoading, setIsSigninGoogleLoading] = useState(false);
  const [isSigninFormValid, setIsSignInFormValid] = useState(false);
  const [isGoogleSignInPopupClosed, setIsGoogleSigninPopupCLosed] =
    useState(false);
  const [errorGoogleNotRegister, setErrorGoogleNotRegister] = useState(false);
  const [errorNoUserFound, setErrorNoUserFound] = useState();
  const [
    isDisplayNewPasswordButtonClicked,
    setIsDisplayNewPasswordButtonClicked,
  ] = useState(false);
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
          setErrorNoUserFound(true);
          console.log("No user found");
        }
        setError(false);
        // setIsSignInButtonClicked(false);
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
      setIsSigninGoogleLoading(true);
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
        setIsSigninGoogleLoading(false);
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
        setIsSigninGoogleLoading(false);
      }
      console.log(res);
      setIsSignInButtonClicked(false);
      return [res, tempUserInfo];
    } catch (error) {
      setIsSigninGoogleLoading(false);
      if (error.code === "auth/popup-closed-by-user") {
        setIsGoogleSigninPopupCLosed(true);
      }
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
      setErrorGoogleNotRegister(true);
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
  function handleDisplayNewPasswordButtonClick() {
    setIsDisplayNewPasswordButtonClicked(!isDisplayNewPasswordButtonClicked);
  }
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
      ) : isSigninGoogleLoading ? (
        <>
          <div className="popupsignin-loading-google-animation">
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
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
            {errorGoogleNotRegister && (
              <span className="popupsignin-error-message-google-not-register">
                Vous n'êtes pas encore inscris chez nous. Cliquer{" "}
                <span onClick={handlePopoUpSignInSignUpClick}>ICI</span>
                pour vous inscrire !
              </span>
            )}
            <div className="popupsignin-input-container">
              <span>E-mail</span>
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin(e);
                  }
                }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin(e);
                  }
                }}
                type={
                  isDisplayNewPasswordButtonClicked ? "text" : "password"
                }
                placeholder={"Entrez votre mot de passe"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="popupsignin-input-display-button">
                {isDisplayNewPasswordButtonClicked ? (
                  <>
                    <svg
                      onClick={handleDisplayNewPasswordButtonClick}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                    </svg>
                    {/* <img src={eyeOpenLogo} alt="" /> */}
                  </>
                ) : (
                  <>
                    <svg
                      onClick={handleDisplayNewPasswordButtonClick}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                    </svg>
                  </>
                )}
              </div>
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
            {isGoogleSignInPopupClosed && (
              <>
                <div className="popupsignin-google-error">
                  Oops quelque chose s'est mal passé avec votre connexion Google
                  Veuillez réessayer.
                </div>
              </>
            )}
            {/* {errorNoUserFound && (
              <>
                <div className="popupsignin-no-user-found-error">
                  Oops il semblerait que vous n'avez pas de compte chez nous. Veuillez en créer un cliquant ci 
                </div>
                Veuillez réessayer.
              </>
            )} */}
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

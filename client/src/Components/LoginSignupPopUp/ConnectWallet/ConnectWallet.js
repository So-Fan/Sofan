import React, { useState, useEffect, useContext } from "react";
import "./ConnectWallet.css";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  log,
} from "@web3auth/base";
import useEth from "../../../contexts/EthContext/useEth";
import Web3 from "web3";
import { WalletLoginError } from "@web3auth/base";
import { db, auth } from "../../../Configs/firebase";
import {
  updateDoc,
  setDoc,
  doc,
  collection,
  getDoc,
  QuerySnapshot,
} from "firebase/firestore";
import UserContext from "../../../contexts/UserContext/UserContext";

function ConnectWallet({
  handleConnectWalletClick,
  handlePreviousStepConnectWallet,
  web3auth,
  collectedIdToken,
  userData,
}) {
  const {
    setWeb3authProvider,
    setIsWalletConnectClicked,
    setIsWeb3authConnectClicked,
    isWalletConnectClicked,
    state: { accounts },
  } = useEth();
  const [newFirebaseIdToken, setNewFirebaseIdToken] = useState("");
  const [isMetamaskConnectWalletLoading, setIsMetamaskConnectWalletLoading] =
    useState(false);
  const [isWeb3AuthConnectWalletLoading, setIsWeb3authConnectLoading] =
    useState(false);
  const [metamaskError, setMetamaskError] = useState(false);
  const [web3AuthError, setWeb3AuthError] = useState(false);
  const { setLoggedInUser, loggedInUser } = useContext(UserContext);
  const handleCreateWallet = async (e) => {
    e.preventDefault();
    setIsWeb3authConnectLoading(true);
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      setIsWeb3authConnectLoading(false);
      return;
    }

    // await web3auth.logout();

    if (!collectedIdToken) {
      console.log("1st attempt of token ID creation Failed");
      setIsWeb3authConnectLoading(false);
      await auth.currentUser
        .getIdToken(true)
        .then(function (idToken) {
          console.log(auth.currentUser);
          // Send token to your backend via HTTPS
          setNewFirebaseIdToken(idToken);
        })
        .catch(function (error) {
          // Handle error
          setIsWeb3authConnectLoading(false);
          console.error("Error getting ID token:", error);
        });
    }
    let web3authProvider;
    try {
      web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: collectedIdToken ? collectedIdToken : newFirebaseIdToken,
          verifierIdField: "sub",
          domain: process.env.REACT_APP_DOMAIN_TOKEN_ID,
        },
      });
    } catch (error) {
      console.error(error);
      setIsWeb3authConnectLoading(false);
    }
    setWeb3authProvider(web3authProvider);

    const web3 = new Web3(web3authProvider);
    let accountWallet;
    try {
      accountWallet = await web3.eth.getAccounts();
    } catch (error) {
      console.error(error);
    }
    // construct backend here to add wallet into his profile in database. The wallet is in `accounts` line 40 of this file

    const newWallet = {
      web3auth: accountWallet,
    };
    // console.log(loggedInUser);
    // console.log({ ...loggedInUser, web3auth: accountWallet[0] });
    setLoggedInUser({ ...loggedInUser, web3auth: accountWallet[0] });
    if (userData.id) {
      try {
        const usersRef = collection(db, "users");
        const userDocRef = doc(usersRef, userData.id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const existingUserData = userDoc.data();
          const updatedUserData = {
            ...existingUserData,
            web3auth: accountWallet[0],
          };
          await setDoc(userDocRef, updatedUserData);
          console.log("Update successful");
          setIsWeb3authConnectLoading(false);
          handleConnectWalletClick();
        } else {
          setIsWeb3authConnectLoading(false);
          console.log(`No user found with ID: ${userData.id}`);
        }
      } catch (err) {
        setIsWeb3authConnectLoading(false);
        console.log("Error updating document:", err);
      }
    } else {
      setIsWeb3authConnectLoading(false);
      console.log("userData.id is not defined");
    }
    // } else {
    // setIsWeb3authConnectLoading(false);
    // console.log("userData.id is not defined");
    // return;
    // }
    setIsWeb3authConnectClicked([true, web3authProvider]);
  };

  const handleConnectMetamaskWalletClick = async () => {
    console.log("click metamask button");
    setIsWalletConnectClicked(true);
    setIsMetamaskConnectWalletLoading(true);
  };
  useEffect(() => {
    // console.log(accounts);
    if (!localStorage.getItem("Web3Auth-cachedAdapter") && accounts) {
      // Si Metamask est connecté alors on passe à l'étape suivante
      // setIsMetamaskConnectWalletLoading(false);
      //handleConnectWalletClick();

      // TODO: BACKEND add metamask wallet to user table
      // accounts[0] correspond au wallet
      const handleMetamaskWalletUpload = async () => {
        const newWallet = {
          metamask: accounts[0],
        };
        console.log(accounts[0]);
        if (userData.id) {
          try {
            setLoggedInUser({ ...loggedInUser, metamask: accounts[0] });
            const usersRef = collection(db, "users");
            const userDocRef = doc(usersRef, userData.id);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const existingUserData = userDoc.data();
              const updatedUserData = {
                ...existingUserData,
                metamask: accounts[0],
              };
              await setDoc(userDocRef, updatedUserData);
              console.log("Update successful");
              setIsMetamaskConnectWalletLoading(false);
              handleConnectWalletClick();
              return;
            } else {
              setIsMetamaskConnectWalletLoading(false);
              console.log(`No user found with ID: ${userData.id}`);
            }
          } catch (err) {
            setIsMetamaskConnectWalletLoading(false);
            console.log("Error updating document:", err);
          }
        } else {
          setIsMetamaskConnectWalletLoading(false);
          console.log("userData.id is not defined");
        }
      };
      handleMetamaskWalletUpload();
    }
    setIsMetamaskConnectWalletLoading(false);
  }, [accounts, isWalletConnectClicked]);

  window.addEventListener("unhandledrejection", function (event) {
    // detecte quand le popup web3Auth a été fermé
    if (event.reason instanceof WalletLoginError) {
      setIsWeb3authConnectLoading(false);
      setWeb3AuthError(true);
    }
  });

  useEffect(() => {
    function handleErrors(event) {
      if (event?.reason?.code === 4001) {
        console.log("Metamask popup has been closed by the user");
        setIsMetamaskConnectWalletLoading(false);
        setMetamaskError(true);
      }
    }
    window.addEventListener("unhandledrejection", handleErrors);

    return () => {
      window.removeEventListener("unhandledrejection", handleErrors);
    };
  }, []);
  return (
    <>
      {isMetamaskConnectWalletLoading || isWeb3AuthConnectWalletLoading ? (
        <>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <div className="signup-user-connect-wallet-wrap">
            <div
              onClick={handlePreviousStepConnectWallet}
              className="signup-user-connect-wallet-previous-step"
            >
              <img src={previousArrow} alt="Etape précédente" />
            </div>
            <div className="signup-user-connect-wallet-title">
              Connectez votre wallet
            </div>
            <div className="signup-user-connect-wallet-list-container">
              <div
                onClick={handleConnectMetamaskWalletClick}
                className="signup-user-connect-wallet-list-wrap"
              >
                <div className="signup-user-connect-wallet-list-logo">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Metamask.png?alt=media&token=2baf71ad-f4a4-48be-826b-1f0a23384ee1"
                    alt="Metamask Logo"
                  />
                </div>
                <div className="signup-user-connect-wallet-list-wallet-name">
                  Metamask
                </div>
              </div>
              <div
                style={{ opacity: "0.5" }}
                className="signup-user-connect-wallet-list-wrap"
              >
                <div className="signup-user-connect-wallet-list-logo">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/coinbase-wallet.png?alt=media&token=a73e7567-60ea-40d1-8723-cbdd6dadc00b"
                    alt="Coinbase Wallet Logo"
                  />
                </div>
                <div className="signup-user-connect-wallet-list-wallet-name">
                  Coinbase Wallet (soon)
                </div>
              </div>
              <div
                style={{ opacity: "0.5" }}
                className="signup-user-connect-wallet-list-wrap"
              >
                <div className="signup-user-connect-wallet-list-logo">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/wallet-connect.png?alt=media&token=bf327435-99d9-443b-94cd-56f8db3d1dbc"
                    alt="Wallet Connect Logo"
                  />
                </div>
                <div className="signup-user-connect-wallet-list-wallet-name">
                  Wallet Connect (soon)
                </div>
              </div>
            </div>
            {metamaskError && (
              <>
                <div className="signup-user-connect-wallet-error-metamask">
                  Oops il semblerait que quelque chose s'est mal passé avec
                  votre wallet Metamask
                </div>
              </>
            )}
            <button
              onClick={handleConnectWalletClick}
              disabled={!accounts}
              className="signup-user-connect-wallet-next-button"
            >
              Suivant
            </button>
            <div className=" "></div>
            <div className="signup-user-separation-line-container">
              <div className="signup-user-separation-line-left"></div>
              <div className="signup-user-separation-or">OU</div>
              <div className="signup-user-separation-line-right"></div>
            </div>
            <button className="signup-user-connect-wallet-web3auth-button">
              <div className="signup-user-connect-wallet-web3auth-button-img-container">
                <img
                  src="https://imgix.cryptojobslist.com/401f8c11-9a3a-4d92-b137-d2743c65d011.jpg?w=100&h=100&auto=format&fit=fill&fill=solid"
                  alt=""
                />
              </div>
              <div
                className="signup-user-connect-wallet-button-title"
                onClick={handleCreateWallet}
              >
                Créer mon wallet avec mon mail
              </div>
              {web3AuthError && (
                <>
                  <div className="signup-user-connect-wallet-error-web3auth">
                    Oops il semblerait que quelque chose s'est mal passé avec
                    Web3Auth
                  </div>
                </>
              )}
            </button>
            <div className="signup-user-connect-wallet-progress-bar-container">
              <div
                style={{ width: "65%" }}
                className="signup-user-connect-wallet-progress-bar"
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ConnectWallet;

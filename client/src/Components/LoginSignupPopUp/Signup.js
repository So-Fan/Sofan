import React, { useState, useEffect, useContext } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./Signup.css";
import errorLogo from "../../Assets/Image/error-red-logo.svg";
import previousArrow from "../../Assets/Image/arrow-previous.svg";
import ConfirmationCode from "./ConfirmationCode/ConfirmationCode";
import SetupProfile from "./SetupProfile/SetupProfile";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import ConfirmWallet from "./ConfirmWallet/ConfirmWallet";
import ValidationSignup from "./ValidationSignup/ValidationSignup";
// import VerificationCodeEmail from "../Emails/VerificationCodeEmail";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db, googleProvider } from "../../Configs/firebase";

import { signInWithPopup } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
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
// import Web3 from "web3";
import Button from "../Button/Button";
// fin mathéo

function Signup({
  web3auth,
  setWeb3auth,
  setIsSignUpButtonClicked,
  handlePopoUpSignUpSignInClick,
}) {
  //
  const { setLoggedInUser } = useContext(UserContext);
  const [isFormValid, setIsFormValid] = useState(true); // à changer
  const [displayConfirmationCode, setDisplayConfirmationCode] = useState(false);
  const [isConfirmCodeValid, setIsConfirmCodeValid] = useState(false);
  const [displaySetupProfile, setDisplaySetupProfile] = useState(false);
  const [isSetupProfileValid, setIsSetupProfileValid] = useState(false);
  const [displayConnectWallet, setDisplayConnectWallet] = useState(false);
  const [isConnectWalletValid, setConnectWalletValid] = useState(false);
  const [displayConfirmWallet, setDisplayConfirmWallet] = useState(false);
  const [displayValidationSignup, setDisplayValidationSignup] = useState(false);
  const [allUserInfo, setAllUserInfo] = useState({});
  const [isAllFieldsComplete, setIsAllFieldsComplete] = useState();
  //
  const [isDisplayPasswordButtonClicked, setIsDisplayPasswordButtonClicked] =
    useState(false);
  const [
    isDisplayConfirmationPasswordButtonClicked,
    setIsDisplayConfirmationPasswordButtonClicked,
  ] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null); // backend
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailRegexError, setEmailRegexError] = useState(false);
  const [usernameRegexError, setUsernameRegexError] = useState(false);
  const [passwordRegexError, setPasswordRegexError] = useState(false);
  const [passwordConfirmRegexError, setPasswordConfirmRegexError] =
    useState(false);
  const [phoneRegexError, setPhoneRegexError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [opacityInputPhone, setOpacityInputPhone] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false); // a changer
  const [isGoogleSignUpClicked, setIsGoogleSignUpClicked] = useState(false);
  const [isGoogleSignupLoading, setIsGoogleSignupLoading] = useState(false);
  const [googleErrorGeneral, setgoogleErrorGeneral] = useState(false);
  const [googleErrorAlreadyRegister, setgoogleErrorAlreadyRegister] =
    useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const [isResendCodeMailLoading, setIsResendCodeMailLoading] = useState();
  const [confirmCodeResend, setConfirmCodeResend] = useState();
  // Backend
  const [codeMatched, setCodeMatched] = useState(false);

  const [googleIdToken, setGoogleIdToken] = useState();
  const [firebaseIdToken, setFirebaseIdToken] = useState();
  const {
    setWeb3authProvider,
    state: { accounts },
  } = useEth();

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

  function handleEmailChange(event) {
    const emailValue = event.target.value;
    setEmail(emailValue);
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setEmailRegexError(!emailRegex.test(emailValue));
  }

  function handleDisplayPasswordButtonClick() {
    setIsDisplayPasswordButtonClicked(!isDisplayPasswordButtonClicked);
  }

  function handleDisplayConfirmationPasswordButtonClick() {
    setIsDisplayConfirmationPasswordButtonClicked(
      !isDisplayConfirmationPasswordButtonClicked
    );
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setShowError(false);
    setIsPasswordMatch(e.target.value === passwordConfirmation);
  }

  // function handleConfirmPasswordChange(e) {
  //   console.log(e.target.value);
  //   setPasswordConfirmation(e.target.value);
  //   setShowError(password !== e.target.value);
  // }

  function handlePasswordBlur() {
    setShowError(
      password !== passwordConfirmation && passwordConfirmation !== ""
    );
  }
  function validatePassword(password) {
    if (!password) {
      return false;
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\S])[A-Za-z\d\S]{8,100}$/;

    return regex.test(password);
  }

  function handlePasswordChange(event) {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\S])[A-Za-z\d\S]{8,100}$/;
    setPasswordRegexError(!passwordRegex.test(passwordValue));
    setPasswordConfirmRegexError(
      passwordConfirmation !== "" && passwordConfirmation !== passwordValue
    );
  }
  function handleConfirmPasswordChange(event) {
    console.log(event.target.value);
    const passwordConfirmValue = event.target.value;
    setPasswordConfirmation(passwordConfirmValue);
    setPasswordConfirmRegexError(
      password !== "" && password !== passwordConfirmValue
    );
    setIsPasswordMatch(password === event.target.value);
  }
  function handlePasswordBlur() {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
    }
    setShowError(
      password !== passwordConfirmation && passwordConfirmation !== ""
    );
  }
  function handleConfirmPasswordBlur() {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    if (!passwordRegex.test(passwordConfirmation)) {
      setPasswordError(true);
    }
    setShowError(
      password !== passwordConfirmation && passwordConfirmation !== ""
    );
  }
  function handleMailInput(e) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (emailRegex.test(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }
  //
  function handleUsernameChange(event) {
    const usernameValue = event.target.value;
    setUsername(usernameValue);
    const usernameRegex = /^[a-zA-Z0-9_]{1,14}$/;
    setUsernameRegexError(!usernameRegex.test(usernameValue));
  }

  //
  function handlePhoneInput(value) {
    setPhone(value);
    setPhoneRegexError(value && !isValidPhoneNumber(value));
  }
  function handleClickPhoneInput(e) {
    var element = document.querySelector("#signup-user-phone-input-id");
    element.classList.add("PhoneInputInputOpacity");
  }

  const signUpWithGoogle = async (e) => {
    e.preventDefault();
    setIsGoogleSignUpClicked(true);
    try {
      setIsGoogleSignupLoading(true);
      setIsFormValid(true);
      setIsSubmitClicked(true);
      console.log("loading est true");
      const createdAt = new Date();
      // Sign-in process using a popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const usersRef = collection(db, "users");
      // Here you can manage and use the returned user object
      // You could return it, log it, or do something else
      console.log(user);

      // Create a new user object using Google sign in details
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

      //console.log(newUser);
      const userDocRef = doc(usersRef, user.uid);
      const userDoc = await getDoc(userDocRef);
      const userExists = userDoc.exists();

      if (!userExists) {
        // User does not exist in Firestore, so add the document
        await setDoc(userDocRef, newUser); // Use setDoc to ensure the document is created with the user's UID

        setAllUserInfo({
          ...user,
          ...newUser,
        });
        let emailAddress = user.email;
        fetch(
          "https://us-central1-sofan-app.cloudfunctions.net/sendWelcomeEmail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emailAddress }),
          }
        )
          .then((response) => response.json()) // Extract the JSON body of the response
          .then((data) => {
            if (data.success) {
              console.log(data.success);
              // Handle success, e.g., show a success message to the user
            } else if (data.error) {
              console.error(
                "Error sending welcome email:",
                data.error,
                data.details
              );
              // Handle error, e.g., show an error message to the user
            }
          })
          .catch((error) => {
            console.error("Error processing response:", error);
          });
      } else {
        setIsGoogleSignupLoading(false);
        setgoogleErrorAlreadyRegister(true);
        setEmail(user.email); // faire afficher le mail dans le message d'erreur google already exist
        //
        return console.log("User already exists in Firestore:", userDoc.data());
      }

      const idToken = await result.user.getIdToken(true);
      setGoogleIdToken(idToken);
      //await addDoc(usersRef, newUser);
      setIsSubmitClicked(true);
      setDisplayConfirmationCode(false);
      setIsFormValid(true);
      setTimeout(() => {
        setDisplaySetupProfile(true);
        setIsGoogleSignupLoading(false);
        console.log("timeout marche !!");
      }, 1000);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;

      console.log(`Error Code: ${errorCode}`);
      if (errorCode === "auth/popup-closed-by-user") {
        setIsSubmitClicked(false);
        setIsFormValid(false);
      }
      console.error(`Error Message: ${errorMessage}`);
      // Mettre ERREUR Google ici Rami "Oops quelque chose s'est mal passé avec google"
      // setIsGoogleSignupLoading(false);
      setIsSubmitClicked(false);
      setIsFormValid(false);
      setgoogleErrorGeneral(true);
    }
  };

  useEffect(() => {
    if (allUserInfo) {
      setLoggedInUser(allUserInfo);
    }
  }, [allUserInfo]);

  const generateVerificationCode = () => {
    // Generate a random 6-digit number
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
  };

  const handleCloseClick = () => {
    console.log("sign innnnnnnnnn");
  };

  async function verifyFormIsValid(e) {
    e.preventDefault();
    setIsSubmitClicked(true);
    if (
      !emailError &&
      !usernameRegexError &&
      validatePassword(password) &&
      password === passwordConfirmation &&
      usernameRegexError === false &&
      username !== ""
    ) {
      console.log("tout est rempli");
      setIsFormValid(true);
      const createdAt = new Date();
      try {
        console.log(
          "about to create an account with firebase auth email: ",
          email,
          " and  password: ",
          password
        );
        console.log("checking if the auth is ok : ", auth);
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // User signed up successfully
            const user = userCredential.user;
            const usersRef = collection(db, "users");
            const newUser = {
              id: user.uid,
              email,
              account_created: Timestamp.fromMillis(createdAt.getTime()),
              account_type: "free",
              name: username,
              username,
              display_name: username,
              phone,
              emailVerified: false,
              news: false,
              premium: false,
              profile_avatar:
                "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/user_profile%2Fdefault_avatar%2FEllipse%2045.png?alt=media&token=bde0f1b1-7d06-4eea-877c-d8916e1f9032",
              profile_banner:
                "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/user_profile%2Fdefault_banner%2FbannerUserProfile.png?alt=media&token=5e614810-d6e1-49c1-bb42-e1905f068a1a",
              status: true,
              sport: "",
            };

            const userDocRef = doc(usersRef, user.uid);
            const userDoc = await getDoc(userDocRef);
            console.log(userDoc, "\nUser Doc called from firebase ");
            const userExists = userDoc.exists();

            if (!userExists) {
              setAllUserInfo(newUser);
              // User does not exist in Firestore, so add the document
              await setDoc(userDocRef, newUser); // Use setDoc to ensure the document is created with the user's UID
              console.log("User Data Uploaded Successfully");
              await auth.currentUser
                .getIdToken(true)
                .then(function (idToken) {
                  console.log(auth.currentUser);
                  // Send token to your backend via HTTPS
                  setFirebaseIdToken(idToken);
                })
                .catch(function (error) {
                  // Handle error
                  console.error("Error getting ID token:", error);
                });
            } else {
              console.log(
                "User with email and pass already exists in Firestore:",
                userDoc.data()
              );
            }
            //await addDoc(usersRef, newUser);

            // SEND EMAIL VERIFICATION CODE
            const emailValidRef = collection(db, "email_validations");
            let verificationCode = generateVerificationCode();
            const validationData = {
              userId: user.uid,
              email,
              code: verificationCode,
              created_At: Timestamp.fromMillis(createdAt.getTime()),
            };

            await addDoc(emailValidRef, validationData);

            // ...

            // Make a POST request to the Cloud Function to send the verification email
            fetch(
              "https://us-central1-sofan-app.cloudfunctions.net/sendVerificationEmail",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, verificationCode }),
              }
            )
              .then((response) => response.json()) // Extract the JSON body of the response
              .then((data) => {
                if (data.success) {
                  console.log(data.success);
                  // Handle success, e.g., show a success message to the user
                } else if (data.error) {
                  console.error(
                    "Error sending verification email:",
                    data.error,
                    data.details
                  );
                  // Handle error, e.g., show an error message to the user
                }
              })
              .catch((error) => {
                console.error("Error processing response:", error);
              });
          })
          .catch((error) => {
            // Handle errors here
            setError(error.message);
            console.error(error);
          });
      } catch (error) {
        console.error("Error adding post: ", error);
        // Display an error message to the user
      }
    } else {
      console.log("la première condition n'est pas remplie");
      setIsFormValid(false);
    }
    console.log("oui");
  }

  function handleKeyDown(event) {
    // Si la touche pressée est "ENTRÉE", déclenchez le clic sur le bouton
    if (event.key === "Enter") {
      verifyFormIsValid();
    }
  }

  useEffect(() => {
    if (isFormValid && isSubmitClicked) {
      setTimeout(() => {
        if (!isGoogleSignUpClicked) {
          setDisplayConfirmationCode(true);
        }
      }, 2000);
    }
  }, [isFormValid, isSubmitClicked]);

  async function handleConfirmMailResendCode() {
    setIsResendCodeMailLoading(true);

    try {
      // SEND EMAIL VERIFICATION CODE
      const createdAt = new Date();
      const emailValidRef = collection(db, "email_validations");
      let verificationCode = generateVerificationCode();
      const validationData = {
        userId: allUserInfo.id,
        email: email,
        code: verificationCode,
        created_At: Timestamp.fromMillis(createdAt.getTime()),
      };

      await addDoc(emailValidRef, validationData);

      // ...
      console.log(email, "  ", verificationCode);
      // Make a POST request to the Cloud Function to send the verification email
      fetch(
        "https://us-central1-sofan-app.cloudfunctions.net/sendVerificationEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, verificationCode }),
        }
      )
        .then((response) => response.json()) // Extract the JSON body of the response
        .then((data) => {
          if (data.success) {
            // Handle success, e.g., show a success message to the user
          } else if (data.error) {
            console.error(
              "Error sending verification email:",
              data.error,
              data.details
            );
            // Handle error, e.g., show an error message to the user
          }
        })
        .catch((error) => {
          console.error("Error processing response:", error);
        });

      setTimeout(() => {
        setIsResendCodeMailLoading(false);
        setConfirmCodeResend(true);
      }, 2000);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function handleSubmitConfirmationCodeClick(e, code) {
    e.preventDefault();

    const uid = allUserInfo.id;
    if (!uid) {
      console.error("UID is undefined");
      return;
    }

    const emailValidRef = collection(db, "email_validations");
    const q = query(emailValidRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (isConfirmCodeValid && doc.data().code === code) {
        setCodeMatched(true);
        setDisplayConfirmationCode(false);

        setTimeout(() => {
          setDisplaySetupProfile(true);
        }, 2500);
        return;
      } else {
        setCodeMatched = false;
      }
    });
  }

  const updateImagePaths = async (uid, avatarPath, bannerPath) => {
    try {
      const q = query(collection(db, "users"), where("id", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userRef = doc.ref;
          const updatedData = {};

          if (avatarPath) {
            updatedData.profile_avatar = avatarPath;
          }

          if (bannerPath) {
            updatedData.profile_banner = bannerPath;
          }

          updateDoc(userRef, updatedData)
            .then(() => {
              console.log("Image paths updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating image paths:", error);
            });
        });
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Setup Profile step
  async function handleSetupProfileNextButtonClick() {
    //save the profile bio, by shajeed

    try {
      const q = query(
        collection(db, "users"),
        where("id", "==", allUserInfo.id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userRef = doc.ref;
          const updatedData = { bio: profileBio ? profileBio : "" };

          updateDoc(userRef, updatedData)
            .then(() => {
              console.log("Bio updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating Bio:", error);
            });
        });
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
    // passer à l'étape suivante
    setDisplaySetupProfile(false);
    setTimeout(() => {
      setDisplayConnectWallet(true);
    }, 2000);
    // console.log("oui");
  }

  function handleSetupProfileAddLaterClick() {
    // add the default avatar and banner

    updateImagePaths(
      allUserInfo.id,
      "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/user_profile%2Fdefault_avatar%2FEllipse%2045.png?alt=media&token=bde0f1b1-7d06-4eea-877c-d8916e1f9032",
      "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/user_profile%2Fdefault_banner%2FbannerUserProfile.png?alt=media&token=5e614810-d6e1-49c1-bb42-e1905f068a1a"
    );

    // passer à l'étape suivante
    setIsSetupProfileValid(true);
    setDisplaySetupProfile(false);
    setTimeout(() => {
      setDisplayConnectWallet(true);
    }, 2000);
  }
  function handleConnectWalletClick() {
    setDisplayConnectWallet(false);
    setTimeout(() => {
      setDisplayConfirmWallet(true);
    }, 2000);
  }

  function handleConfirmWalletClick() {
    setDisplayConfirmWallet(false);
    setTimeout(() => {
      setDisplayValidationSignup(true);
    }, 2000);
  }
  function handleConfirmationCodePreviousStep() {
    setDisplayConfirmationCode(false);
    setIsFormValid(false);
    setIsSubmitClicked(false);
  }
  function handleSetupProfilePreviousStep(e) {
    setDisplaySetupProfile(false);
    setDisplayConfirmationCode(true);
  }
  function handlePreviousStepConnectWallet(e) {
    setDisplayConnectWallet(false);
    setDisplaySetupProfile(true);
  }
  function handlePreviousStepConfirmWallet(e) {
    setDisplayConfirmWallet(false);
    setDisplayConnectWallet(true);
  }
  //
  function handlePreviousStepErrorGoogleAlreadyExist(e) {
    setgoogleErrorAlreadyRegister(false);
    setIsFormValid(false);
    setIsSubmitClicked(false);
  }
  useEffect(() => {
    const allFieldsValid = 
      !emailError && 
      email !== '' &&
      !usernameRegexError &&
      username !== '' &&
      !passwordError &&
      password !== '' && 
      !showError &&
      isPasswordMatch;
  
    if (allFieldsValid) {
      console.log('Tout est bon!'); 
      setIsAllFieldsComplete(true);
    } else {
      setIsAllFieldsComplete(false);
      console.log("tout n'est pas bon");
    }
  }, [email, username, password, showError, isPasswordMatch]);

  return (
    <>
      {googleErrorAlreadyRegister ? (
        <>
          <div className="signup-user-error-google-message-container">
            <img
              onClick={handlePreviousStepErrorGoogleAlreadyExist}
              className="signup-user-error-google-message-previous-step"
              src={previousArrow}
              alt="flèche étape précédente"
            />
            <img
              className="signup-user-error-google-message-error-logo"
              src={errorLogo}
              alt="ERROR LOGO"
            />
            <p>
              Il semblerait que vous ayez déjà un compte Sofan ! Veuillez vous
              connecter avec <span>{email}</span>
            </p>
          </div>
        </>
      ) : (
        <>
          {isFormValid && isSubmitClicked ? (
            <>
              {isGoogleSignupLoading ? (
                <>
                  <div className="signup-user-setup-profile-container">
                    <div className="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={
                      displayConfirmationCode
                        ? "signup-user-confirmation-code-container"
                        : displaySetupProfile
                        ? "signup-user-setup-profile-container"
                        : displayConnectWallet
                        ? "signup-user-connect-wallet-container"
                        : displayConfirmWallet
                        ? "signup-user-confirm-wallet-container"
                        : displayValidationSignup
                        ? "signup-user-validation-signup-container"
                        : "signup-user-container"
                    }
                  >
                    {displayConfirmationCode ? (
                      <>
                        <ConfirmationCode
                          setIsConfirmCodeValid={setIsConfirmCodeValid}
                          isConfirmCodeValid={isConfirmCodeValid}
                          handleSubmitConfirmationCodeClick={
                            handleSubmitConfirmationCodeClick
                          }
                          handleConfirmationCodePreviousStep={
                            handleConfirmationCodePreviousStep
                          }
                          UserEmail={email}
                          isResendCodeMailLoading={isResendCodeMailLoading}
                          confirmCodeResend={confirmCodeResend}
                          handleConfirmMailResendCode={
                            handleConfirmMailResendCode
                          }
                        />
                      </>
                    ) : displaySetupProfile ? (
                      <>
                        <SetupProfile
                          handleSetupProfileNextButtonClick={
                            handleSetupProfileNextButtonClick
                          }
                          handleSetupProfileAddLaterClick={
                            handleSetupProfileAddLaterClick
                          }
                          handleSetupProfilePreviousStep={
                            handleSetupProfilePreviousStep
                          }
                          allUserInfo={allUserInfo}
                          setProfileBio={setProfileBio}
                        />
                      </>
                    ) : displayConnectWallet ? (
                      <>
                        <ConnectWallet
                          handleConnectWalletClick={handleConnectWalletClick}
                          handlePreviousStepConnectWallet={
                            handlePreviousStepConnectWallet
                          }
                          web3auth={web3auth}
                          collectedIdToken={
                            googleIdToken ? googleIdToken : firebaseIdToken
                          }
                          userData={allUserInfo}
                        />
                      </>
                    ) : displayConfirmWallet ? (
                      <>
                        <ConfirmWallet
                          handleConfirmWalletClick={handleConfirmWalletClick}
                          handlePreviousStepConfirmWallet={
                            handlePreviousStepConfirmWallet
                          }
                        />
                      </>
                    ) : displayValidationSignup ? (
                      <>
                        <ValidationSignup handleCloseClick={handleCloseClick} />
                      </>
                    ) : (
                      <>
                        <div className="lds-ripple">
                          <div></div>
                          <div></div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="signup-user-container">
                <form action="#" className="signup-user-wrap-form">
                  <div
                    // onClick={verifyAllFieldAreFull}
                    className="signup-user-title"
                  >
                    S'inscrire
                  </div>
                  <div className="signup-user-title-description">
                    Sign up now to connect with athletes and explore exclusive
                    NFT content within a vibrant community of sports
                    enthusiasts!
                  </div>
                  <div className="signup-user-mail-title">
                    E-mail <span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    className="signup-user-mail-input"
                    type="Email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleMailInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Entrez votre mail"
                    name=""
                    id=""
                  />
                  {emailError && (
                    <p className="signup-user-error-mail">
                      Veuillez entrer une adresse e-mail valide.
                    </p>
                  )}

                  <div className="signup-user-username-title">
                    Pseudo <span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    className="signup-user-username-input"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    onBlur={handleUsernameChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Choisissez votre pseudo"
                  />
                  {usernameRegexError && (
                    <p className="signup-user-error-username">
                      Votre pseudo doit comporter 1 à 14 caractères
                      alphanumériques ou des underscores.
                    </p>
                  )}
                  <div className="signup-user-phone-title">
                    Numéro de téléphone
                  </div>
                  <PhoneInput
                    id="signup-user-phone-input-id"
                    onClick={handleClickPhoneInput}
                    onKeyDown={handleKeyDown}
                    international
                    defaultCountry="FR"
                    value={phone}
                    onChange={handlePhoneInput}
                    className="signup-user-phone-input"
                    placeholder="Entrez votre numéro de téléphone"
                  />
                  {phoneRegexError && (
                    <p className="signup-user-error-phone">
                      Veuillez entrer un numéro de téléphone valide.
                    </p>
                  )}
                  <div className="signup-user-password-title">
                    Mot de passe <span style={{ color: "red" }}>*</span>
                  </div>
                  <div className="signup-user-password-input-container">
                    <input
                      className="signup-user-password-input"
                      type={
                        isDisplayPasswordButtonClicked ? "text" : "password"
                      }
                      placeholder="Mot de passe"
                      onChange={handlePasswordChange}
                      onBlur={handlePasswordBlur}
                      onKeyDown={handleKeyDown}
                      name=""
                      id=""
                    />
                    {password !== "" && !validatePassword(password) && (
                      <p className="signup-user-error-password">
                        Le mot de passe doit contenir au moins une majuscule, un
                        chiffre et un caractère spécial et 8 caractères minimum.
                      </p>
                    )}

                    <div className="signup-user-input-display-button">
                      {isDisplayPasswordButtonClicked ? (
                        <>
                          <svg
                            onClick={handleDisplayPasswordButtonClick}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            onClick={handleDisplayPasswordButtonClick}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                          </svg>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="signup-user-confirmation-password-title">
                    Confirmer mot de passe{" "}
                    <span style={{ color: "red" }}>*</span>
                  </div>
                  <div className="signup-user-confirm-password-input-container">
                    <input
                      className="signup-user-confirmation-password-input"
                      type={
                        isDisplayConfirmationPasswordButtonClicked
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirmez votre mot de passe"
                      onChange={handleConfirmPasswordChange}
                      onBlur={handleConfirmPasswordBlur}
                      onKeyDown={handleKeyDown}
                      name=""
                      id=""
                    />
                    <div className="signup-user-input-display-button">
                      {isDisplayConfirmationPasswordButtonClicked ? (
                        <>
                          <svg
                            onClick={
                              handleDisplayConfirmationPasswordButtonClick
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            onClick={
                              handleDisplayConfirmationPasswordButtonClick
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                          </svg>
                        </>
                      )}
                    </div>
                    {showError && (
                      <div className="password-error-message-signup">
                        Les mots de passes ne correspondent pas.
                      </div>
                    )}
                  </div>
                  <button
                    disabled={!isAllFieldsComplete}
                    // style={!isFormValid ? {pointerEvents:"none"}: {}}
                    onClick={verifyFormIsValid}
                    className="signup-user-create-account-button"
                  >
                    Créer mon compte
                  </button>
                  {!isFormValid && isSubmitClicked && (
                    <>
                      <p className="signup-user-error-fill-form">
                        Veuillez remplir tout les champs obligatoires. Ils
                        contiennent une astérisque (*)
                      </p>
                    </>
                  )}
                  <div className="signup-page-confirmation-accept-cgu">
                    En cliquant sur "S'inscrire", vous acceptez nos 
                    <a target="blank" href="cgu">
                      Conditions générales d'utilisation
                    </a>
                    .
                  </div>
                  <div className="signup-user-separation-line-container">
                    <div className="signup-user-separation-line-left"></div>
                    <div className="signup-user-separation-or">OU</div>
                    <div className="signup-user-separation-line-right"></div>
                  </div>
                  <button
                    onClick={(e) => signUpWithGoogle(e)}
                    className="signup-user-google-signup"
                  >
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/google%201.png?alt=media&token=3a8d7bf6-eaf1-46d1-a1b4-0c73eb8ac18f"
                      alt="google logo"
                    />
                    <div className="signup-user-google-signup-text">
                      S'inscrire avec Google
                    </div>
                  </button>
                  {googleErrorGeneral && (
                    <>
                      <div className="signup-user-google-error-general-message">
                        Oops quelque chose s'est mal passé avec votre
                        inscription Google Veuillez réessayer.
                      </div>
                    </>
                  )}
                  <div className="signup-user-already-an-account">
                    <span>Vous avez déjà un compte ? </span>
                    <Button
                      customMediaQueries={
                        "button-component:hover:after{content: ''; position: absolute;left: 0; bottom: -2px; width: 100%; height: 2px;background: #f6d463;}"
                      }
                      onClick={handlePopoUpSignUpSignInClick}
                      text={"Se connecter"}
                      style={popUpSignUnSignInRedirectButton}
                    />
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Signup;

const popUpSignUnSignInRedirectButton = {
  color: "#F6D463",
  fontFamily: "britanica-heavy",
  lineHeight: "normal",
  fontSize: "16px",
  outline: "none",
  border: "transparent",
  backgroundColor: "transparent",
};

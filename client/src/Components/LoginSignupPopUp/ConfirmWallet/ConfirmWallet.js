import React, { useState, useEffect } from "react";
import "./ConfirmWallet.css";
import useEth from "../../../contexts/EthContext/useEth";
import previousArrow from "../../../Assets/Image/arrow-previous.svg";
import copyLogo from "../../../Assets/Image/copy-logo.svg";

function ConfirmWallet({
  handleConfirmWalletClick,
  handlePreviousStepConfirmWallet,
}) {
  const [isWalletProviderWeb3Auth, setIsWalletProviderWeb3Auth] = useState();
  const [
    isCopyClipboardAddressConfirmWalletClicked,
    setIsCopyClipboardAddressConfirmWalletClicked,
  ] = useState(false);

  const {
    state: { accounts },
  } = useEth();
  // console.log(accounts[0])
  // const accounts = ["0x8451e365cC9f3034fc35F9e4F9D62Fc1C8D610e1"];

  let walletAdressShortVersion;
  if (accounts?.length) {
    const calcul = accounts[0].slice(0, 4);
    const result = accounts[0].slice(
      accounts[0].length - 4,
      accounts[0].length
    );
    walletAdressShortVersion = `${calcul}...${result}`;
  }
  useEffect(() => {
    if (localStorage.getItem("Web3Auth-cachedAdapter")) {
      setIsWalletProviderWeb3Auth(true);
    } else {
      setIsWalletProviderWeb3Auth(false);
    }
  }, []);
  function handleClickCopyConfirmWallet() {
    navigator.clipboard.writeText(accounts[0]);
    setIsCopyClipboardAddressConfirmWalletClicked(true);
  }
  useEffect(() => {
    const timeoutCopyConfirmWallet = setTimeout(() => {
      setIsCopyClipboardAddressConfirmWalletClicked(false);
    }, 3000);
    return () => clearTimeout(timeoutCopyConfirmWallet);
  }, [isCopyClipboardAddressConfirmWalletClicked]);

  return (
    <div className="signup-user-confirm-wallet-wrap">
      <div className="signup-user-confirm-wallet-title">
        Confirmez votre wallet
      </div>
      {/* <div
        onClick={handlePreviousStepConfirmWallet}
        className="signup-user-confirm-wallet-previous-step"
      >
        <img src={previousArrow} alt="FLÈCHE ÉTAPE PRÉCÉDENTE" />
      </div> */}
      {/* <div className="signup-user-confirm-wallet-message">
      </div> */}
      <div className="signup-user-confirm-wallet-address-container">
        <div className="signup-user-confirm-wallet-logo">
          {isWalletProviderWeb3Auth ? (
            <>
              <img
                className="signup-user-confirm-wallet-web3auth-logo"
                src="https://imgix.cryptojobslist.com/401f8c11-9a3a-4d92-b137-d2743c65d011.jpg?w=100&h=100&auto=format&fit=fill&fill=solid"
                alt="Web3Auth Logo"
              />
            </>
          ) : (
            <>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Metamask.png?alt=media&token=2baf71ad-f4a4-48be-826b-1f0a23384ee1"
                alt="Metamask Logo"
              />
            </>
          )}
        </div>
        <div className="signup-user-confirm-wallet-wallet-title-and-address">
          <div className="signup-user-confirm-wallet-wallet-title">
            {isWalletProviderWeb3Auth ? <>Web3Auth</> : <>Metamask</>}
          </div>
          <div className="signup-user-confirm-wallet-wallet-address">
            {walletAdressShortVersion}
          </div>
        </div>
        <img
          className="signup-user-confirm-wallet-copy-logo"
          onClick={handleClickCopyConfirmWallet}
          src={copyLogo}
          alt="copy logo"
        />
        {isCopyClipboardAddressConfirmWalletClicked && (
          <>
            <div className="signup-user-confirm-wallet-copy-message-confirm">
              Copié !
            </div>
          </>
        )}
      </div>
      <button
        onClick={handleConfirmWalletClick}
        className="signup-user-confirm-wallet-confirm-button"
      >
        Confirmer
      </button>
      <button
        // style={{opacity:"0.5"}}
        disabled={true}
        onClick={handlePreviousStepConfirmWallet}
        className="signup-user-confirm-wallet-change-wallet-button"
      >
        Changer de wallet (bientôt...)
      </button>
      <div className="signup-user-confirm-wallet-progress-bar-container">
        <div
          style={{ width: "85%" }}
          className="signup-user-confirm-wallet-progress-bar"
        ></div>
      </div>
    </div>
  );
}

export default ConfirmWallet;

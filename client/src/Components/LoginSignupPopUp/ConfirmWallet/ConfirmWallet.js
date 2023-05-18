import React from "react";
import "./ConfirmWallet.css";

import previousArrow from "../../../Assets/Image/arrow-previous.svg";

function ConfirmWallet() {
  return (
    <div className="signup-user-confirm-wallet-wrap">
      <div className="signup-user-confirm-wallet-title">ConfirmWallet</div>
      <div className="signup-user-confirm-wallet-previous-step">
        <img src={previousArrow} alt="FLÈCHE ÉTAPE PRÉCÉDENTE" />
      </div>
      <div className="signup-user-confirm-wallet-address-container">
        <div className="signup-user-confirm-wallet-logo">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Metamask.png?alt=media&token=2baf71ad-f4a4-48be-826b-1f0a23384ee1"
            alt="Metamask Logo"
          />
        </div>
        <div className="signup-user-confirm-wallet-wallet-title-and-address">
          <div className="signup-user-confirm-wallet-wallet-title">
            Metamask
          </div>
          <div className="signup-user-confirm-wallet-wallet-address">
            0x1234..9381
          </div>
        </div>
      </div>
      <button className="signup-user-confirm-wallet-confirm-button">
        Confirmer
      </button>
      <button className="signup-user-confirm-wallet-change-wallet-button">
        Changer de wallet
      </button>
      <div className="signup-user-confirm-wallet-progress-bar-container">
        <div 
        style={{width : "85%"}}
        className="signup-user-confirm-wallet-progress-bar"></div>
      </div>
    </div>
  );
}

export default ConfirmWallet;

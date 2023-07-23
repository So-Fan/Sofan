import React from "react";
import Button from "../Button/Button";
import "./PopupListNFT.css";


const PopupListNFT = () => {
    const nftImage= "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Rectangle%20131.png?alt=media&token=f394cf39-6fa3-475a-9f3e-9ac5a63c0027"
  return (
    <div className="popuplistnft-component">
      <div className="popuplistnft-container">
        <span>Mettre en vente</span>
        <div className="popuplistnft-container-nft-wrap">
          <img src={nftImage} alt="nft" />
          <div>
            <div className="popuplistnft-container-nft-wrap-info">
              <span className="popuplistnft-container-nft-wrap-info-bold">Pass WC22 #12341</span>
              <span className="popuplistnft-container-nft-wrap-info-bold">1.0 ETH</span>
            </div>
            <div className="popuplistnft-container-nft-wrap-info">
              <span>World cup 2022</span>
              <span>$ 1867.53</span>
            </div>
          </div>
        </div>
        <div className="popuplistnft-container-line"></div>
        <div>
          <input type="number" />
          <div>
            <span>ETH</span>
            <img src="" alt="arrow bottom" />
          </div>
        </div>
        <div className="popuplistnft-container-line"></div>
        <div>
          <span>Service fee 5% </span>
          <div>
            <span>$ 93.37</span>
            <span>0.05 ETH </span>
          </div>
        </div>
        <div>
          <span>You will receive</span>
          <div>
            <span>$ 1774.15</span>
            <span>0.95 ETH</span>
          </div>
        </div>
        <Button />
      </div>
    </div>
  );
};

export default PopupListNFT;

import React from "react";
import "./PopUpPlaceBid.css";
import Cross from "../../Assets/Image/cross.svg";
import Button from "../Button/Button";
import Arrow from "../../Assets/Image/arrow_bottom.svg"
const PopUpPlaceBid = () => {
  const data = {
    nft: {
      img: "https://i.imgur.com/e1wX6tG.png",
      title: "Pass WC22 #12341",
      athlete: "Alexia Barrier",
      priceinEth: "1.0582",
    },
  };
  const dataFromWallet = {
    sold: "8.44"
  }
  const dataFromOpensea = {
    floorPrice: "0.8523",
    bestOffer: "0.6792"
  }
  return (
    <div className="popupplacebid-component">
      <div className="popupplacebid-title-container">
        <span>Placer une enchère</span>
        <img src={Cross} alt="cross" />
      </div>
      <div className="popupplacebid-nftinfo-container">
        <div className="popupplacebid-nftinfo-container-left">
          <img src={data.nft.img} alt="nft displayed" />
          <div className="popupplacebid-nftinfo-container-left-info">
            <span>{data.nft.title}</span>
            <span>{data.nft.athlete}</span>
          </div>
        </div>
        <div className="popupplacebid-nftinfo-container-right">
          <span>{data.nft.priceinEth} ETH</span>
          <span>$ 1267.53</span>
        </div>
      </div>
      <div className="popupplacebid-globalinfo">
        <div className="popupplacebid-globalinfo-container">
          <div className="popupplacebid-globalinfo-wrap">
            <span>Your sold</span>
            <span>{dataFromWallet.sold} ETH</span>
            <span>$10.151</span>
          </div>
          <div className="popupplacebid-globalinfo-wrap">
            <span>Floor Price</span>
            <span>{dataFromOpensea.floorPrice} ETH</span>
            <span>$921.23</span>
          </div>
          <div className="popupplacebid-globalinfo-wrap">
            <span>Best Offer</span>
            <span>{dataFromOpensea.bestOffer} ETH</span>
            <span>$715.11</span>
          </div>
        </div>
      </div>
      <div className="popupplacebid-line"></div>
      <div className="popupplacebid-priceinput-wrap">
        <input type="text" placeholder="Prix" />
        <div>ETH <img src={Arrow} alt="arrow bottom"/></div>
      </div>
      <Button text="Faire mon offre" style={popUpBuyNftPlaceBidButton} />
    </div>
  );
};

export default PopUpPlaceBid;
 
const popUpBuyNftPlaceBidButton = {
  background: "#F6D463",
  border: "transparent",
  borderRadius: "9.05759px",
  width: "468px",
  height: "56px",
  fontSize: "16px",
  lineHeight: "21px",
  fontWeight: "700",
  fontFamily: "Lufga",
  marginTop: "30px",
  marginBottom: "30px",
};

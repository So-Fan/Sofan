import React from "react";
import "./PopUpBuyNft.css";
import Cross from "../../Assets/Image/cross.svg";
import Button from "../Button/Button";
const PopUpBuyNft = () => {
  const data = {
    nft: {
      img: "https://i.imgur.com/e1wX6tG.png",
      title: "Explore the world with Alexia Barrier",
      athlete: "Alexia Barrier",
      priceinEth: "1.0582",
    },
  };
  return (
    <div className="popupbuynft-component">
      <div className="popubuynft-title-container">
        <span>Buy NFT</span>
        <img src={Cross} alt="cross" />
      </div>
      <div className="popubuynft-nftinfo-container">
        <div className="popubuynft-nftinfo-container-left">
          <img src={data.nft.img} alt="nft displayed" />
          <div className="popubuynft-nftinfo-container-left-info">
            <span>{data.nft.title}</span>
            <span>{data.nft.athlete}</span>
          </div>
        </div>
        <div className="popubuynft-nftinfo-container-right">
          <span>{data.nft.priceinEth} ETH</span>
          <span>$ 1267.53</span>
        </div>
      </div>
      <div className="popupbuynft-fees-container">
        <div className="popupbuynft-fees-container-servicefee-wrap">
          <span>Service fee 5%</span>
          <div>
            <span>$ 10.93</span>
            <span>0.01123 ETH</span>
          </div>
        </div>
        <div className="popupbuynft-fees-container-servicefee-wrap">
          <span>You will pay</span>
          <div>
            <span>$ 1293.53</span>
            <span>1.06713 ETH</span>
          </div>
        </div>
      </div>
      <Button text="Procéder au paiement" style={popUpBuyNftPaymentButton} />
    </div>
  );
};

export default PopUpBuyNft;

const popUpBuyNftPaymentButton = {
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
  marginBottom: "30px"
};

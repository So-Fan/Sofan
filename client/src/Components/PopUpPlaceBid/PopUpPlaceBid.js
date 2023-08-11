import React, { useState, useEffect } from "react";
import "./PopUpPlaceBid.css";
import Cross from "../../Assets/Image/cross.svg";
import Button from "../Button/Button";
import Arrow from "../../Assets/Image/arrow_bottom.svg";
import MintPopUpProcessing from "../MintPopUp/MintPopUpProcessing/MintPopUpProcessing";
import PopUpBlockchainError from "../PopUpBlockchainError/PopUpBlockchainError";
const PopUpPlaceBid = ({
  handlePlaceBidPopup,
  mintPopUpProccesing,
  blockchainError,
  listingBlockchainError,
  handleBlockchainListingErrorPreviousStepButtonClicked,
  bidPrice,
  handleBidPriceChange,
}) => {
  // API CoinGecko
  const [ethPrice, setEthPrice] = useState("");
  // API Coingecko --> Get ETH price
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []);

  const data = {
    nft: {
      img: "https://i.imgur.com/e1wX6tG.png",
      title: "Pass WC22 #12341",
      athlete: "Alexia Barrier",
      priceinEth: "1.0582",
    },
  };
  const dataFromWallet = {
    sold: "8.44",
  };
  const dataFromOpensea = {
    floorPrice: "0.8523",
    bestOffer: "0.6792",
  };

  return (
    <>
      {mintPopUpProccesing ? (
        <div className="popuplistnft-mintpopupprocessing-wrap">
          <MintPopUpProcessing
            isBid={true}
            styleImage={{ right: "119.5px" }}
            styleP={{ right: "25px" }}
            styleDiv={{ bottom: "21px", right: "185px" }}
            styleP2={{ right: "118.5px" }}
          />
        </div>
      ) : blockchainError ? (
        <PopUpBlockchainError
          buttonText={"Back to NFT"}
          contractError={listingBlockchainError}
          handleButtonClick={
            handleBlockchainListingErrorPreviousStepButtonClicked
          }
        />
      ) : (
        <div className="popupplacebid-component">
          <div className="popupplacebid-title-container">
            <span>Placer une enchère</span>
            {/* <img src={Cross} alt="cross" /> */}
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
              <span>€ 1267.53</span>
              <span> {data.nft.priceinEth} ETH</span>
            </div>
          </div>
          <div className="popupplacebid-globalinfo">
            <div className="popupplacebid-globalinfo-container">
              <div className="popupplacebid-globalinfo-wrap">
                <span>Your sold</span>
                <span>€ 10.151</span>
                <span>{dataFromWallet.sold} ETH</span>
              </div>
              <div className="popupplacebid-globalinfo-wrap">
                <span>Floor Price</span>
                <span>€921.23</span>
                <span>{dataFromOpensea.floorPrice} ETH</span>
              </div>
              <div className="popupplacebid-globalinfo-wrap">
                <span>Best Offer</span>
                <span>€715.11</span>
                <span>{dataFromOpensea.bestOffer} ETH</span>
              </div>
            </div>
          </div>
          <div className="popupplacebid-line"></div>
          <div className="popupplacebid-priceinput-wrap">
            <input
              type="number"
              placeholder="Prix"
              onChange={handleBidPriceChange}
              value={bidPrice}
              inputMode="decimal"
            />
            <div>
              ETH <img src={Arrow} alt="arrow bottom" />
            </div>
          </div>
          {bidPrice ? (
            <Button
              onClick={handlePlaceBidPopup}
              text="Faire mon offre"
              style={popUpBuyNftPlaceBidButton}
            />
          ) : (
            <div className="popupplacebid-button-disabled">
              <span>Faire mon offre</span>
            </div>
          )}
        </div>
      )}
    </>
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

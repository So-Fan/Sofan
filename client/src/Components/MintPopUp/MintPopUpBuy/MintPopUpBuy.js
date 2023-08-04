import React, { useState } from "react";
import "./MintPopUpBuy.css";
import crossButton from "../../../Assets/Image/cross.svg";
import LaunchPadMintProgressBar from "../../LaunchPadMintProgressBar/LaunchPadMintProgressBar";
import useEth from "../../../contexts/EthContext/useEth";
import MintPopUpStatus from "../MintPopUpStatus/MintPopUpStatus";
function MintPopUpBuy({
  maxMint,
  mintCounter,
  setMintCounter,
  counterNftMinted,
  totalNftMintable,
  ethPrice,
  eurPrice,
  //
  ethPriceApi,
  dataBlockchain
}) {
  const [isMintingProcessBegan, setIsMintingProcessBegan] = useState(false);
  const [mintingProcessStatus, setMintingProcessStatus] = useState(true)
  const [isMintingProcessEndedSuccessfully, setIsMintingProcessEndedSuccessfully] = useState(false);
  const {
    state: { web3, contract, accounts },
  } = useEth();

  let ethPricePriceConverted = (ethPriceApi * ethPrice).toLocaleString(
    "fr-FR",
    { minimumFractionDigits: 1 }
  );

  console.log(ethPricePriceConverted);

  function handleClick(e) {
    if (mintCounter >= 1) {
      if (
        e.target.className ===
          "mint-pop-up-buy-quantity-selector-increase-button" &&
        mintCounter < maxMint
      ) {
        setMintCounter(mintCounter + 1);
      } else if (
        e.target.className ===
          "mint-pop-up-buy-quantity-selector-decrease-button" &&
        mintCounter > 1
      ) {
        setMintCounter(mintCounter - 1);
      }
    } else {
    }
  }

  // setIsMintComponentCalled(false);
  // setIsMintingProcessBegan(true);

  const nftMintedCalculated = (counterNftMinted / totalNftMintable) * 100;

  const approve = async () => {
    // const web3Instance = new Web3(Web3.givenProvider)
    // await web3.eth.requestAccounts();

    console.log("create Instance");
    const artifact = require("../../../Pages/Test/USDC.json");
    const { abi } = artifact;
    let addressUSDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    let contractUSDCInstance = new web3.eth.Contract(abi, addressUSDC);
    try {
      setIsMintingProcessBegan(true)
      const price = 1000000;
      const result = await contractUSDCInstance.methods
        .approve(contract._address, price)
        .send({ from: accounts[0] });
      console.log(result);
      if (result.status) {
        await mint();
        // setIsMintingProcessBegan(false)
        setMintingProcessStatus(false)
        
      }else{
        setIsMintingProcessEndedSuccessfully(false)
        setMintingProcessStatus(false)
      }
    } catch (error) {
      console.log(error);
      // setIsMintingProcessBegan(false)
      setMintingProcessStatus(false)
      setIsMintingProcessEndedSuccessfully(false)
    }
  };

  const mint = async () => {
    console.log(accounts, contract);
    const result2 = await contract.methods
      .mint("0x266a8e449A62878A6d63BB14c90a95F425a3d30f", 1, 1000000)
      .send({ from: accounts[0] });
      if(result2.status){
        setIsMintingProcessEndedSuccessfully(true)
        
      }else{
        setIsMintingProcessEndedSuccessfully(false)
      }
    console.log(result2);
  };
  return (
    <>
      <div className="mint-pop-up-buy-container">
        <div className={isMintingProcessBegan ? "mint-pop-up-buy-wrap mint-pop-up-buy-wrap-hidden" : "mint-pop-up-buy-wrap"} >
          <div className="mint-pop-up-buy-title-and-cancel-button">
            <div>Acheter NFT</div>
            <div>{/* <img src={crossButton} alt="BOUTON CROIX" /> */}</div>
          </div>
          <div className="mint-pop-up-buy-question-and-max-nft">
            <div>Combien de NFT(s) voulez-vous ?</div>
            <div>Max {maxMint} NFTs</div>
          </div>
          <div className="mint-pop-up-buy-quantity-selector-container">
            <div
              onClick={handleClick}
              className="mint-pop-up-buy-quantity-selector-decrease-button"
            >
              -
            </div>
            <div className="mint-pop-up-buy-quantity-selector-counter">
              {mintCounter}
            </div>
            <div
              onClick={handleClick}
              className="mint-pop-up-buy-quantity-selector-increase-button"
            >
              +
            </div>
          </div>
          <div className="mint-pop-up-line-separation-first"></div>
          <div className="mint-pop-up-price-container">
            <div className="mint-pop-up-price-title">Prix</div>
            <div className="mint-pop-up-price-eth-eur-container">
              <div className="mint-pop-up-price-eth">
                {ethPricePriceConverted} €
              </div>
              <div className="mint-pop-up-price-eur">{ethPrice} ETH</div>
            </div>
          </div>
          <div className="mint-pop-up-line-separation-second"></div>
          <button className="mint-pop-up-mint-button" onClick={approve}>
            Mint maintenant
          </button>
          <div className="mint-pop-up-progress-bar-and-total-minted">
            <LaunchPadMintProgressBar
              nftMintedCalculated={nftMintedCalculated}
              counterNftMinted={counterNftMinted}
              totalNftMintable={totalNftMintable}
            />
          </div>
        </div>
        {isMintingProcessBegan && (
          <MintPopUpStatus
          statusProcessing={mintingProcessStatus}
            statusMint={isMintingProcessEndedSuccessfully}
            setIsMintingProcessBegan={setIsMintingProcessBegan}
            setMintingProcessStatus={setMintingProcessStatus}
            setIsMintingProcessEndedSuccessfully={setIsMintingProcessEndedSuccessfully}
          />
        )}
      </div>
    </>
  );
}

export default MintPopUpBuy;

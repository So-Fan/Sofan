import React, { useState, useEffect } from "react";
import "./MintPopUp.css";
import MintPopUpBuy from "./MintPopUpBuy/MintPopUpBuy";
import MintPopUpStatus from "./MintPopUpStatus/MintPopUpStatus";
function MintPopUpTemplate({
  setIsMintButtonClicked,
  approve,
  isMintingProcessBegan,
  counterNftMinted,
  totalNftMintable,
  limitByWalletInfo,
  nftCollectionAddress,
  nftMintPriceInUSDC,
  nftMintPriceInETH,
  setTotalPriceInUSDC,
  totalPriceInUSDC,
  setMintCounter,
  mintCounter,
  launchpadCollectionLiveAthleteDataBackend,
}) {
  // change those state for passing to buy module to processing

  const [ethPriceApi, setEthPriceApi] = useState();
  // API Coingecko price ETH
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPriceApi(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []);

  // change thos bolean for passing to processing to validated or error
  const dataBlockchain = {
    mint: [
      {
        status: true,
        processing: true,
      },
    ],
  };
  const dataBackend = {
    mint: [
      {
        maximum: 3,
      },
    ],
  };
  const dataApi = {
    popup: [
      {
        ethPrice: 0.5,
        eurPrice: 625.02,
        counterNftMinted: 405,
        totalNftMintable: 500,
      },
    ],
  };

  return (
    <section className="mint-pop-up-container">
      <MintPopUpBuy
        maxMint={dataBackend.mint[0].maximum} // delete
        mintCounter={mintCounter}
        setMintCounter={setMintCounter}
        //
        nftMintPriceInETH={nftMintPriceInETH}
        nftMintPriceInUSDC={nftMintPriceInUSDC}
        //
        counterNftMinted={counterNftMinted}
        totalNftMintable={totalNftMintable}
        //
        ethPriceApi={ethPriceApi}
        dataBlockchain={dataBlockchain}
        setIsMintButtonClicked={setIsMintButtonClicked}
        //
        approve={approve}
        isMintingProcessBegan={isMintingProcessBegan}
        limitByWalletInfo={limitByWalletInfo}
        nftCollectionAddress={nftCollectionAddress}
        setTotalPriceInUSDC={setTotalPriceInUSDC}
        totalPriceInUSDC={totalPriceInUSDC}
        launchpadCollectionLiveAthleteDataBackend={
          launchpadCollectionLiveAthleteDataBackend
        }
      />
    </section>
  );
}

export default MintPopUpTemplate;

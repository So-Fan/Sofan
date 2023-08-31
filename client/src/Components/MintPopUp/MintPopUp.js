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
}) {
  // change those state for passing to buy module to processing

  const [mintCounter, setMintCounter] = useState(1);
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
  // function handleStateMint() {
  //   if (isMintingProcessBegan === true) {
  //     setIsMintComponentCalled(false);
  //   } else if (isMintingProcessBegan === false) {
  //     setIsMintComponentCalled(true);
  //   } else if (isMintComponentCalled === true) {
  //     setIsMintingProcessBegan(false);
  //   } else if (isMintComponentCalled === false) {
  //     setIsMintingProcessBegan(true);
  //   }
  // }
  // useEffect(() => {
  //   handleStateMint();
  // }, []);

  return (
    <section className="mint-pop-up-container">
      <MintPopUpBuy
        maxMint={dataBackend.mint[0].maximum}
        mintCounter={mintCounter}
        setMintCounter={setMintCounter}
        //
        ethPrice={dataApi.popup[0].ethPrice}
        eurPrice={dataApi.popup[0].eurPrice}
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
      />
    </section>
  );
}

export default MintPopUpTemplate;

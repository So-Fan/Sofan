import React, { useState, useEffect } from "react";
import "./MintPopUp.css";
import MintPopUpBuy from "./MintPopUpBuy/MintPopUpBuy";
import MintPopUpStatus from "./MintPopUpStatus/MintPopUpStatus";
function MintPopUpTemplate() {
  // change those state for passing to buy module to processing
  const [isMintingProcessBegan, setIsMintingProcessBegan] = useState(false);
  const [isMintComponentCalled, setIsMintComponentCalled] = useState(true);
  const [mintCounter, setMintCounter] = useState(1);
const [ethPriceApi, setEthPriceApi] = useState();
// API Coingecko price ETH
useEffect(() => {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur')
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
  function handleStateMint() {
    if (isMintingProcessBegan === true) {
      setIsMintComponentCalled(false);
    } else if (isMintingProcessBegan === false) {
      setIsMintComponentCalled(true);
    } else if (isMintComponentCalled === true) {
      setIsMintingProcessBegan(false);
    } else if (isMintComponentCalled === false) {
      setIsMintingProcessBegan(true);
    }
  }
  useEffect(() => {
    handleStateMint();
  }, []);

  return (
    <section className="mint-pop-up-container">
      {isMintComponentCalled && (
        <MintPopUpBuy
          maxMint={dataBackend.mint[0].maximum}
          mintCounter={mintCounter}
          setMintCounter={setMintCounter}
          //
          ethPrice={dataApi.popup[0].ethPrice}
          eurPrice={dataApi.popup[0].eurPrice}
          //
          counterNftMinted={dataApi.popup[0].counterNftMinted}
          totalNftMintable={dataApi.popup[0].totalNftMintable}
          //
          ethPriceApi={ethPriceApi}
        />
      )}

      {isMintingProcessBegan && (
        <MintPopUpStatus
          statusMint={dataBlockchain.mint[0].status}
          statusProcessing={dataBlockchain.mint[0].processing}
        />
      )}
    </section>
  );
}

export default MintPopUpTemplate;
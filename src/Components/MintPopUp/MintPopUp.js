import React, { useState } from "react";
import "./MintPopUp.css";
import MintPopUpBuy from "./MintPopUpBuy/MintPopUpBuy";
import MintPopUpStatus from "./MintPopUpStatus/MintPopUpStatus";
function MintPopUpTemplate() {
  // const [isMintButtonClicked, setIsMintButtonClicked] = useState(true);
  const [isMintingProcessBegan, setIsMintingProcessBegan] = useState(false);
  const [mintCounter, setMintCounter] = useState(1);
  // return different pop up when true or false
  const dataBlockchain = {
    mint: [
      {
        status: true,
        processing: true,
      },
    ],
  };
  const dataBackend = {
   mint :[
    {
maximum: 3
    },
   ] 
  }
  return (
    <section className="mint-pop-up-container">
      <MintPopUpBuy 
      maxMint={dataBackend.mint[0].maximum}
      mintCounter={mintCounter} setMintCounter={setMintCounter} />
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

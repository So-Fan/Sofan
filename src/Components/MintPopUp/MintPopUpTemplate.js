import React from "react";
import "./MintPopUpTemplate.css";
import MintPopUpStatus from "./MintPopUpStatus/MintPopUpStatus";
function MintPopUpTemplate() {
  // return different pop up when true or false
  const dataBlockchain = {
    mint: [
      {
        status: true,
        processing:true,
      },
    ],
  };
  return (
    <section className="mint-pop-up-container">

      <MintPopUpStatus 
      statusMint={dataBlockchain.mint[0].status} 
      statusProcessing={dataBlockchain.mint[0].processing}
      />
    </section>
  );
}

export default MintPopUpTemplate;

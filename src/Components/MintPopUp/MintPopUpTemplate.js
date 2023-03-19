import React from "react";
import "./MintPopUpTemplate.css";
import MintPopUpStatus from "./MintPopUpStatus/MintPopUpStatus";
function MintPopUpTemplate() {
  // return different pop up when true or false
  const dataBlockchain = {
    mint: [
      {
        status: true,
      },
    ],
  };
  return (
    <section className="mint-pop-up-container">
      <MintPopUpStatus statusMint={dataBlockchain.mint[0].status} />
    </section>
  );
}

export default MintPopUpTemplate;

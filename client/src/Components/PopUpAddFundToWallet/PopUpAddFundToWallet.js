import React from "react";
import "./PopUpAddFundToWallet.css";
import Button from "../Button/Button";
import { Warning, DefaultYellowButtonPopUp } from "../../data/constants";
const PopUpAddFundToWallet = ({ currentBalance }) => {
  return (
    <div className="popupaddfundtowallet-component">
      <img src={Warning} alt="warning" />
      <span>Not enough fund !</span>
      <span>Current balance : {currentBalance}</span>
      <Button text={"+ Add fund to wallet"} style={DefaultYellowButtonPopUp} />
    </div>
  );
};

export default PopUpAddFundToWallet;

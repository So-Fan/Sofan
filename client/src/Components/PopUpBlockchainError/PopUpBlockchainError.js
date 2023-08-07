import React from "react";
import "./PopUpBlockchainError.css";
import Button from "../Button/Button";
const PopUpBlockchainError = ({ style, contractError, buttonText, handleButtonClick, buttonStyle }) => {
  // Override

  const PopUpBlockchainErrorSVG =
    "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/assets%2FVectorClose.svg?alt=media&token=9cce0dfe-7df1-48f5-a1dd-7fd9892cd99a";
  return (
    <div className="popupblockchainerror-component" style={style}>
      <img src={PopUpBlockchainErrorSVG} alt="Error" />
      <span>An error has occured, please try again</span>
      <span>Reason provided by the contract : {contractError}</span>
      <Button text={buttonText} onClick={handleButtonClick} style={buttonStyle} />
    </div>
  );
};

export default PopUpBlockchainError;
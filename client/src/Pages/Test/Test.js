import React, { useEffect, useState, useCallback } from "react";
import "./Test.css";
import PopUpBlockchainError from "../../Components/PopUpBlockchainError/PopUpBlockchainError";
import Modal from "../../Components/Modal/Modal";
import PopUpAddFundToWallet from "../../Components/PopUpAddFundToWallet/PopUpAddFundToWallet";
const Test = () => {
  return (
    <>
      <Modal style={{ display: "none" }}>
        <PopUpAddFundToWallet />
      </Modal>
    </>
  );
};

export default Test;

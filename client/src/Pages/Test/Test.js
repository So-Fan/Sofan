import React, { useEffect, useState, useCallback } from "react";
import "./Test.css";
import PopUpBlockchainError from "../../Components/PopUpBlockchainError/PopUpBlockchainError";
import Modal from "../../Components/Modal/Modal";
import PopUpAddFundToWallet from "../../Components/PopUpAddFundToWallet/PopUpAddFundToWallet";
import UserActivityTab from "../../Components/UserActivityTab/UserActivityTab";
const Test = () => {
  return (
    <div style={{ marginTop: 94 }}>
      <UserActivityTab />
    </div>
  );
};

export default Test;

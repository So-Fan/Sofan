import React, { useEffect, useState, useCallback } from "react";
import "./Test.css";
import PopUpBlockchainError from "../../Components/PopUpBlockchainError/PopUpBlockchainError";
import Modal from "../../Components/Modal/Modal";
const Test = () => {
 

  return (
    <>
    <Modal style={{ top: "20px", right: "20px" }}>
      <PopUpBlockchainError contractError={"You're not the owner"} buttonText={"Back to listing"} />
    </Modal>
    </>
  );
};

export default Test;

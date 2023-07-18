import React, { useState } from "react";
import "./Test.css";
import SetupProfile from "../../Components/LoginSignupPopUp/SetupProfile/SetupProfile";
import Modal from "../../Components/Modal/Modal";
const Test = () => {
 

 
  return (
    <>
    <Modal>
      <SetupProfile />
    </Modal>
    </>
  );
};

export default Test;

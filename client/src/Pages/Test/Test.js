import React, { useEffect, useState, useCallback } from "react";
import "./Test.css";
import PopUpEditProfile from "../../Components/PopUpEditProfile/PopUpEditProfile";
import NftCollectionHeader from "../../Components/NftCollectionHeader/NftCollectionHeader";
import NftSingle from "../NftSingle/NftSingle";
import PopupListNFT from "../../Components/PopupListNFT/PopupListNFT";
import Modal from "../../Components/Modal/Modal";
import PopUpValidate from "../../Components/PopUpValidate/PopUpValidate";
const Test = () => {

  return (
    <>
    {/* <Modal style={{top: "20px", right: "20px"}}> */}
     <NftSingle />
    {/* </Modal> */}
    </>
  );
};

export default Test;

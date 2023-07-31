import React, { useEffect, useState, useCallback } from "react";
import "./Test.css";
import PopUpEditProfile from "../../Components/PopUpEditProfile/PopUpEditProfile";
import NftCollectionHeader from "../../Components/NftCollectionHeader/NftCollectionHeader";
import NftSingle from "../NftSingle/NftSingle";
import PopupListNFT from "../../Components/PopupListNFT/PopupListNFT";
import Modal from "../../Components/Modal/Modal";
import PopUpValidate from "../../Components/PopUpValidate/PopUpValidate";
import PopUpUnlistNFT from "../../Components/PopUpUnlistNFT/PopUpUnlistNFT";
import Login from "../../Components/LoginSignUp/Login";
import PopUpSignIn from "../../Components/PopUpSignIn/PopUpSignIn";
import useEth from "../../contexts/EthContext/useEth";
const Test = () => {
  const [value, setValue] = useState();
  const [valueContract, setValueContract] = useState("null");
  const {
    state: { contract, networkID, accounts, web3 },
  } = useEth();

  const getAccount = async () => {
    console.log(accounts[0]);
  };
  const getNetworkId = async () => {
    console.log(networkID);
  };
  const getContract = async () => {
    console.log(contract);
  };
  const setCompleted = async () => {
    console.log(value);
    await contract.methods.setNumber(value).send({from: accounts[0]});
  };

  const read = async () => {
    const temp = await contract.methods.read().call({from: accounts[0]})
    console.log(temp);
    setValueContract(temp);
  };

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <>
      <div className="test-component">
        <button onClick={getAccount}>Get Accounts</button>
        <button onClick={getNetworkId}>Get Network ID</button>
        <button onClick={getContract}>Get Contract</button>
        <input
          onChange={handleChange}
          type="number"
          value={value}
        />
        <button onClick={setCompleted}>write</button>
        <span>Number in contract is : {valueContract}</span>
        <button onClick={read}>Get Value</button>
      </div>
    </>
  );
};

export default Test;

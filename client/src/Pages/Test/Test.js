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
import Web3 from "web3";
const Test = () => {
  const [value, setValue] = useState();
  const [valueContract, setValueContract] = useState("null");
  const {
    state: { contract, networkID, accounts, web3 },
    web3authProvider
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
  // const setCompleted = async () => {
  //   console.log(value);
  //   await contract.methods.setNumber(value).send({from: accounts[0]});
  // };

  // const read = async () => {
  //   const temp = await contract.methods.read().call({from: accounts[0]})
  //   console.log(temp);
  //   setValueContract(temp);
  // };
  // const [contractUSDC, setContractUSDC] = useState();

  // useEffect(() => {
    
  //   setContractUSDC(contractUSDCInstance)
  // }, [])

  const approve = async() => {
  // const web3Instance = new Web3(Web3.givenProvider)
  // await web3.eth.requestAccounts();
  console.log("create Instance");
  const artifact = require("./USDC.json");
    const {abi} = artifact;
    let addressUSDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    let contractUSDCInstance = new web3.eth.Contract(abi, addressUSDC);
  try {
    const price = 1000000
    await contractUSDCInstance.methods.approve(contract._address, price).send({from: accounts[0]})
  } catch (error) {
    console.log(error);
  }
}

const mint = async () => {
  await contract.methods.mint("0x8451e365cC9f3034fc35F9e4F9D62Fc1C8D610e1", 1, 1000000).send({from : accounts[0]})
}
  const handleChange = (e) => {
    setValue(e.target.value)
  }


  return (
    <>
      <div className="test-component">
        <button onClick={getAccount}>Get Accounts</button>
        <button onClick={getNetworkId}>Get Network ID</button>
        <button onClick={getContract}>Get Contract</button>
        {/* <input
          onChange={handleChange}
          type="number"
          value={value}
        />
        <button onClick={setCompleted}>write</button>
        <span>Number in contract is : {valueContract}</span>
        <button onClick={read}>Get Value</button> */}
        <br /><br />
        <button onClick={approve}>approve</button>
        <button onClick={mint}>Mint</button>
      </div>
    </>
  );
};

export default Test;

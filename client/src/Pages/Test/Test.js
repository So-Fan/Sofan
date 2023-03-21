import React, { useState } from "react";
import "./Test.css";
import useEth from "../../contexts/EthContext/useEth";
const Test = () => {
  const {
    state: { contract, accounts },
    setIsWalletConnectClicked,
    isWalletConnectClicked,
    isInit
  } = useEth();

  const [value, setValue] = useState();
  const getValue = async() => {
    const tempValue = await contract.methods.read().call({ from: accounts[0] });
    setValue(tempValue);
  };
  const handleConnectButton = (e) => {
    e.preventDefault();
    setIsWalletConnectClicked(true);
  };
const [typing, setTyping] = useState()
  const handleChange = e => {
    setTyping(e.target.value)
  }

  const handleClick = async() => {
    const te = parseInt(typing)
    await contract.methods.setCompleted(te).send({from: accounts[0]})
  }
  return (
    <>
      <button onClick={handleConnectButton}>Connect Wallet</button>
      <br />
      <br />
      {isWalletConnectClicked && <>Je suis connecté</>} <br />
      <br />
      {isWalletConnectClicked && isInit && <>{accounts[0]}</>}
      <br />
      <br />
      {isInit.toString()}
      <button onClick={getValue}>Get value</button><br /><br />
      {value + "yeah"}
      <br /><br />
    <input onChange={handleChange} type="text" />
    <button onClick={handleClick}>set number</button>
    </>
  );
};

export default Test;

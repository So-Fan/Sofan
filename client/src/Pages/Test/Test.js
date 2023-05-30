import React, { useEffect, useState } from "react";
import "./Test.css";
import { Web3Auth } from "@web3auth/modal";
import useEth  from "../../contexts/EthContext/useEth";
const Test = () => {

  const {
    state: { contract, accounts, isOwner, isMintOn, mintPrice },
  } = useEth();

  const [tt, setTt] = useState();
  const [address, setAddress] = useState();
  const init = async () => {
    try {
      //Initialize within your constructor
      const web3auth = new Web3Auth({
        clientId:
          "BJqBp0LJfmTafSfMeXtyOcKXLdZhsOl_94wb-C8dFKiB3BJAFQq8LgmAqhj9HTT_bPaWq_FOA5mwFljJ6QUzcRU", // Get your Client ID from Web3Auth Dashboard
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x5", // Please use 0x5 for Goerli Testnet
          rpcTarget: "https://rpc.ankr.com/eth_goerli",
        },
      });

      await web3auth.initModal();
      await web3auth.connect();
      const privateKey = await web3auth.provider.request({
        method: "private_key"
    });
    setTt(privateKey);
    } catch (error) {
      console.error(error);
    }
  };

  const getAddress = async() => {
    setAddress(accounts);
  }

  return (
    <>
      <button onClick={init}>YO</button>
      <br /><br />
      Private key : {tt}
      <br /><br />
      Address : {address} <br /><br /><button onClick={getAddress}>Get address</button>      
    </>
  );
};

export default Test;
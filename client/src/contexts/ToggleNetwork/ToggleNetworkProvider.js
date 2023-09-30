import React, { useState, useEffect } from "react";
import { ToggleNetworkContext } from "./ToggleNetworkContext";
import { Alchemy, Network } from "alchemy-sdk";
import { CHAIN_NAMESPACES } from "@web3auth/base";
const currentBlockchain = process.env.REACT_APP_BLOCKCHAIN;

const ToggleNetworkProvider = ({ children }) => {
  const [etherscanBaseURI, setEtherscanBaseURI] = useState("");
  const [alchemy, setAlchemy] = useState();
  const [crossmintpayloadURI, setCrossmintpayloadURI] = useState();
  const [environment, setEnvironment] = useState();
  const [chainConfig, setChainConfig] = useState();

  useEffect(() => {
    if (currentBlockchain === "mainnet") {
      const settings = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
        maxRetries: 10,
      };
      const alchemy = new Alchemy(settings);
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1", // Please use 0x1 for Mainnet
        rpcTarget: "https://rpc.ankr.com/eth",
        displayName: "Ethereum Mainnet",
        blockExplorer: "https://etherscan.io/",
        ticker: "ETH",
        tickerName: "Ethereum",
      };
      setAlchemy(alchemy);
      setChainConfig(chainConfig);
      setEtherscanBaseURI("api.etherscan.io");
      setCrossmintpayloadURI("https://sofan.app/crossmintpayload");
      setEnvironment("production");
    } else if (currentBlockchain === "goerli") {
      const settings = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_GOERLI,
        maxRetries: 10,
      };
      const alchemy = new Alchemy(settings);
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x5", // Please use 0x1 for Mainnet
        rpcTarget: "https://rpc.ankr.com/eth_goerli",
        displayName: "Goerli Testnet",
        blockExplorer: "https://goerli.etherscan.io/",
        ticker: "ETH",
        tickerName: "Ethereum",
      };
      setAlchemy(alchemy);
      setChainConfig(chainConfig);
      setEtherscanBaseURI("api-goerli.etherscan.io");
      setCrossmintpayloadURI("https://staging.sofan.app/crossmintpayload");
      setEnvironment("staging");
    }
  }, []);

  return (
    <ToggleNetworkContext.Provider
      value={{
        etherscanBaseURI,
        alchemy,
        crossmintpayloadURI,
        environment,
        chainConfig,
      }}
    >
      {children}
    </ToggleNetworkContext.Provider>
  );
};

export default ToggleNetworkProvider;

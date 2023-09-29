import React, { useState, useEffect } from "react";
import { ToggleNetworkContext } from "./ToggleNetworkContext";
import { Alchemy, Network } from "alchemy-sdk";

const currentBlockchain = process.env.REACT_APP_BLOCKCHAIN;

const ToggleNetworkProvider = ({ children }) => {
  const [etherscanBaseURI, setEtherscanBaseURI] = useState("");
  const [alchemy, setAlchemy] = useState();

  useEffect(() => {
    if (currentBlockchain === "mainnet") {
      const settings = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
        maxRetries: 10,
      };
      const alchemy = new Alchemy(settings);
      setAlchemy(alchemy);
      setEtherscanBaseURI("api.etherscan.io");
    } else if (currentBlockchain === "goerli") {
      const settings = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_GOERLI,
        maxRetries: 10,
      };
      const alchemy = new Alchemy(settings);
      setAlchemy(alchemy);
      setEtherscanBaseURI("api-goerli.etherscan.io");
    }
  }, []);

  return (
    <ToggleNetworkContext.Provider
      value={{
        etherscanBaseURI,
        alchemy,
      }}
    >
      {children}
    </ToggleNetworkContext.Provider>
  );
};

export default ToggleNetworkProvider;

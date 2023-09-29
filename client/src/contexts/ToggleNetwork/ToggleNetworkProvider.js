import React, { useState, useEffect } from "react";
import { ToggleNetworkContext } from "./ToggleNetworkContext";

const currentBlockchain = process.env.REACT_APP_BLOCKCHAIN;
const ToggleNetworkProvider = ({ children }) => {
  const [etherscanBaseURI, setEtherscanBaseURI] = useState("");
  // let etherscanBaseURI;
  useEffect(() => {
    if (currentBlockchain === "mainnet") {
      setEtherscanBaseURI("api.etherscan.io");
    //   console.log("etherscanBaseURI -> ", etherscanBaseURI);
    } else if (currentBlockchain === "goerli") {
      setEtherscanBaseURI("api-goerli.etherscan.io");
    //   console.log("etherscanBaseURI -> ", etherscanBaseURI);
    //   console.log("currentBlockchain -> ", currentBlockchain);
    }
  }, []);
  //   console.log("children -> ",children)
  return (
    <ToggleNetworkContext.Provider
      value={{
        etherscanBaseURI,
      }}
    >
      {children}
    </ToggleNetworkContext.Provider>
  );
};

export default ToggleNetworkProvider;

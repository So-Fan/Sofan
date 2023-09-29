import { Network, Alchemy } from "alchemy-sdk";

const currentBlockchain = process.env.REACT_APP_BLOCKCHAIN;

let settings;
let alchemy;
if (currentBlockchain === "mainnet") {
  settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
    maxRetries: 10,
  };
  alchemy = new Alchemy(settings);
} else if (currentBlockchain === "goerli") {
  settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };
  alchemy = new Alchemy(settings);
}

// const alchemy = new Alchemy(settings);
export default alchemy;

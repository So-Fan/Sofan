import { Network, Alchemy } from "alchemy-sdk";

const currentBlockchain = process.env.REACT_APP_BLOCKCHAIN;

let settings;
if (currentBlockchain === "mainnet") {
  settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
    maxRetries: 10,
  };
} else if (currentBlockchain === "goerli") {
  settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };
}

const alchemy = new Alchemy(settings);
export default alchemy;

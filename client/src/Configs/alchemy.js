import { Network, Alchemy, NftFilters } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
  maxRetries: 10,
};
const alchemy = new Alchemy(settings);
export default alchemy;

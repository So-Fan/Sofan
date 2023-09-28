let etherscanBaseURI;
const currentBlockchain = process.env.REACT_APP_BLOCKCHAIN;
if (currentBlockchain === "mainnet") {
  etherscanBaseURI = "api.etherscan.io";
} else if (currentBlockchain === "goerli") {
  etherscanBaseURI = "api-goerli.etherscan.io";
}
export { etherscanBaseURI };

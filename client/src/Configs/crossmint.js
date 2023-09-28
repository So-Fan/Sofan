let crossmintpayloadURI;
let environment;

const currentBlockchain = process.env.REACT_APP_BLOCKCHAIN;
if (currentBlockchain === "mainnet") {
  crossmintpayloadURI = "https://sofan.app/crossmintpayload";
  environment = "production";
} else if (currentBlockchain === "goerli") {
  crossmintpayloadURI = "https://staging.sofan.app/crossmintpayload";
  environment = "staging";
}
export { crossmintpayloadURI, environment };

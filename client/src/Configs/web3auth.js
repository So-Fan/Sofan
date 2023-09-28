import { CHAIN_NAMESPACES } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const currentBlockchain = process.env.REACT_APP_BLOCKCHAIN;
let chainConfig;

if (currentBlockchain === "mainnet") {
  chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1", // Please use 0x1 for Mainnet
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Ethereum Mainnet",
    blockExplorer: "https://etherscan.io/",
    ticker: "ETH",
    tickerName: "Ethereum",
  };
} else if (currentBlockchain === "goerli") {
  chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x5", // Please use 0x1 for Mainnet
    rpcTarget: "https://rpc.ankr.com/eth_goerli",
    displayName: "Goerli Testnet",
    blockExplorer: "https://goerli.etherscan.io/",
    ticker: "ETH",
    tickerName: "Ethereum",
  };
}

export { chainConfig };

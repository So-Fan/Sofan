import React, { useReducer, useCallback, useEffect, useContext } from "react";
import { useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import UserContext from "../UserContext/UserContext";
import { reducer, actions, initialState } from "./state";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

function EthProvider({ children, setWeb3auth }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { localWeb3authProvider, setLocalWeb3authProvider } =
    useContext(UserContext);

  const [isWalletConnectClicked, setIsWalletConnectClicked] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [web3authProvider, setWeb3authProvider] = useState(null);
  const [isWeb3authConnectClicked, setIsWeb3authConnectClicked] =
    useState(false);
  const [contractAddress, setContractAddress] = useState(null); // declencher useEffect quand contractAddress change
  const marketplaceAddress = "0x3d273016D59f58b509C52970B128134b5DDc8e18";
  //  "0x7082cc65E582DE32A7caD11fDC396b02490b97DD"
  useEffect(() => {
    if (localStorage.getItem("Web3Auth-cachedAdapter")) {
      const init = async () => {
        try {
          let clientId = process.env.REACT_APP_WEB3AUTH_TOKEN_ID;
          const chainConfig = {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5", // Please use 0x1 for Mainnet
            rpcTarget: "https://rpc.ankr.com/eth_goerli",
            displayName: "Goerli Testnet",
            blockExplorer: "https://goerli.etherscan.io/",
            ticker: "ETH",
            tickerName: "Ethereum",
          };
          const web3auth = new Web3AuthNoModal({
            clientId,
            chainConfig,
            web3AuthNetwork: "cyan",
            useCoreKitKey: false,
          });

          const privateKeyProvider = new EthereumPrivateKeyProvider({
            config: { chainConfig },
          });

          const openloginAdapter = new OpenloginAdapter({
            privateKeyProvider,
            adapterSettings: {
              uxMode: "popup",
              loginConfig: {
                jwt: {
                  verifier: "sofantest2",
                  typeOfLogin: "jwt",
                  clientId,
                },
              },
            },
          });
          web3auth.configureAdapter(openloginAdapter);
          setWeb3auth(web3auth);

          await web3auth.init();
          setWeb3authProvider(web3auth.provider);
          setIsWeb3authConnectClicked([true, web3auth.provider]);
        } catch (error) {
          console.error(error);
        }
      };

      init();
    } else {
      console.log("not init web3auth on load");
    }
  }, []);

  const init = useCallback(async (artifact, tempIsWeb3authConnectClicked) => {
    if (artifact) {
      let web3;
      console.log("Web3authProvider in callback", web3authProvider);
      console.log(
        "isWeb3atuhConnectClicked in callback",
        isWeb3authConnectClicked
      );
      console.log(
        "tempIsWeb3authConnectClicked in callback",
        tempIsWeb3authConnectClicked
      );
      let accounts;
      if (
        tempIsWeb3authConnectClicked[1] != null &&
        tempIsWeb3authConnectClicked[0] == true
      ) {
        web3 = new Web3(tempIsWeb3authConnectClicked[1]); // come from web3auth check Login.js
        accounts = await web3.eth.getAccounts();
        console.log("je suis passé par là");
      } else {
        web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

        try {
          accounts = await web3.eth.requestAccounts();
        } catch (error) {
          console.error(error);
          setIsWalletConnectClicked(false);
          return;
        }

        console.log("je suis passé par ici");
      }

      const networkID = await web3.eth.net.getId();
      const { abi } = artifact;
      let address, contract;
      setIsInit(true);
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
        setContractAddress(contract);
      } catch (err) {
        console.error(err);
      }
      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, networkID, contract },
      });
    }
  }, []);

  useEffect(() => {
    // si déja co
    // ajouter condition si déja sign in
    try {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((res) => {
          // console.log(res.length);
          if (res.length != 0) {
            const tryInit = async () => {
              const web3 = new Web3(
                Web3.givenProvider || "ws://localhost:8545"
              );
              let address, contract, accounts, networkID;
              const artifact = require("../../contracts/SofanNftTemplate.json");
              const { abi } = artifact;

              try {
                accounts = await web3.eth.getAccounts();
                networkID = await web3.eth.net.getId();

                setIsInit(true);
                address = "0x000000000000000000000000000000000000dEaD";
                contract = new web3.eth.Contract(abi, address);
                setContractAddress(address);
                console.log("je suis déjà connecté", accounts);
              } catch (err) {
                console.error(err);
              }
              dispatch({
                type: actions.init,
                data: { artifact, web3, accounts, networkID, contract },
              });
            };
            tryInit();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (
      contractAddress !== null &&
      contractAddress !== "0x000000000000000000000000000000000000dEaD"
    ) {
      const artifact = require("../../contracts/SofanNftTemplate.json");
      const abi = artifact.abi;
      try {
        const tempWeb3 = state.web3;
        const currentContract = new tempWeb3.eth.Contract(abi, contractAddress);
        console.log("current contract", currentContract);
        dispatch({
          type: actions.init,
          data: { ...state, contract: currentContract },
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [contractAddress]);

  useEffect(() => {
    console.log(
      "isWeb3authConnectClicked from useEffect",
      isWeb3authConnectClicked
    );
    console.log(
      "isWalletConnectClicked from useEffect",
      isWalletConnectClicked
    );
    let tempIsWeb3authConnectClicked = isWeb3authConnectClicked;
    if (
      isWalletConnectClicked === true ||
      isWeb3authConnectClicked[0] === true
    ) {
      const tryInit = async () => {
        try {
          const artifact = require("../../contracts/SofanNftTemplate.json");
          init(artifact, tempIsWeb3authConnectClicked);
          console.log("end init ethprovider");
        } catch (err) {
          console.error(err);
        }
      };
      tryInit();
    } else {
      console.log("Not connected");
    }
  }, [isWalletConnectClicked, isWeb3authConnectClicked]);
  // enlever le provider et ajouter isWeb3authConnectClicked + créer etat isWeb3authConnectClicked, setIsWeb3authConnectClicked + dans sign in pop up apres le if(=== 'web3auth') ajouter setIsWeb3authConnectClicked(true)
  // ajouter au if line 43  isWeb3authConnectClicked === true
  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach((e) => window.ethereum?.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum?.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
        setIsWalletConnectClicked,
        isWalletConnectClicked,
        setIsWeb3authConnectClicked,
        isWeb3authConnectClicked,
        setWeb3authProvider,
        web3authProvider,
        isInit,
        setContractAddress,
        contractAddress,
        marketplaceAddress,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;

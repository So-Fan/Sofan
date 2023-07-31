import React, { useReducer, useCallback, useEffect } from "react";
import { useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isWalletConnectClicked, setIsWalletConnectClicked] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [web3authProvider, setWeb3authProvider] = useState(null);
  const [isWeb3authConnectClicked, setIsWeb3authConnectClicked] = useState(false)
  const [contractAddress, setContractAddress] = useState(null) // declencher useEffect quand contractAddress change

  const init = useCallback(
    async (artifact, tempIsWeb3authConnectClicked) => {
      if (artifact) {
        let web3;
        console.log("Web3authProvider in callback", web3authProvider);
        console.log("isWeb3atuhConnectClicked in callback",isWeb3authConnectClicked);
        console.log("tempIsWeb3authConnectClicked in callback", tempIsWeb3authConnectClicked)
        let accounts;
        if(tempIsWeb3authConnectClicked[1] != null && tempIsWeb3authConnectClicked[0] == true){
          web3 = new Web3(tempIsWeb3authConnectClicked[1]); // come from web3auth check Login.js
          accounts = await web3.eth.getAccounts();
          console.log("je suis passé par là")
        }else{
          web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
          accounts = await web3.eth.requestAccounts();
          console.log("je suis passé par ici");
        }
        
        
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        setIsInit(true);
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    console.log("isWeb3authConnectClicked from useEffect", isWeb3authConnectClicked);
    console.log("isWalletConnectClicked from useEffect", isWalletConnectClicked);
    let tempIsWeb3authConnectClicked = isWeb3authConnectClicked;
    if (isWalletConnectClicked === true || isWeb3authConnectClicked[0] === true) {
      const tryInit = async () => {
        try {
          const artifact = require("../../contracts/Storage.json");
          init(artifact, tempIsWeb3authConnectClicked);
          console.log("end init ethprovider");
        } catch (err) {
          console.error(err);
        }
      };
      tryInit();
    } else {
      console.log('Not connected');
    }
  }, [ isWalletConnectClicked, isWeb3authConnectClicked]); 
  // enlever le provider et ajouter isWeb3authConnectClicked + créer etat isWeb3authConnectClicked, setIsWeb3authConnectClicked + dans sign in pop up apres le if(=== 'web3auth') ajouter setIsWeb3authConnectClicked(true) 
  // ajouter au if line 43  isWeb3authConnectClicked === true
  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum?.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum?.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch,
      setIsWalletConnectClicked,
      isWalletConnectClicked,
      setIsWeb3authConnectClicked,
      isWeb3authConnectClicked,
      setWeb3authProvider,
      web3authProvider,
      isInit
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;

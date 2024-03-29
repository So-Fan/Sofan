import React, { useState, useEffect } from "react";
import DashboardMyCollections from "../../Components/DashboardMyCollections/DashboardMyCollections";
import DashboardStats from "../../Components/DashboardStats/DashboardStats";
import DashboardSubMenu from "../../Components/DashboardSubMenu/DashboardSubMenu";
import DashboardMyCalendar from "../../Components/DashboardMyCalendar/DashboardMyCalendar";
// import { Network, Alchemy } from "alchemy-sdk";
import "./Dashboard.css";
import useUserCollection from "../../contexts/UserContext/useUserCollection";
import Web3 from "web3";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Configs/firebase";
import { formatCurrentBalance } from "../../Utils/formatCurrentBalance";
import useToggleNetwork from "../../contexts/ToggleNetwork/useToggleNetwork";
// import { etherscanBaseURI } from "../../Configs/etherscan";
function Dashboard() {
  const { loggedInUser } = useUserCollection();
  const [isSubMenuClicked, setIsSubMenuClicked] = useState([
    true,
    false,
    false,
  ]);
  const [ethPrice, setEthPrice] = useState();
  const [data, setData] = useState();
  // const { alchemy } = useToggleNetwork();
  const { etherscanBaseURI, alchemy } = useToggleNetwork();
  useEffect(() => {
    // console.log("yes");
    const loadData = async () => {
      // console.log(loggedInUser);
      if (loggedInUser?.account_type === "admin") {
        /* 
          1. get all nft collection
          2. call total supply on each
          3. fetch all tx for loggedInUser.fundrecepitwallet
        */
        if (loggedInUser?.fund_receipt_wallet) {
          const allERC20Tx = await fetch(
            `https://${etherscanBaseURI}/api?module=account&action=tokentx&contractaddress=${process.env.REACT_APP_USDC_ADDRESS}&address=${loggedInUser.fund_receipt_wallet}&page=1&offset=500&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
          );
          const dataAllErc20TransferEvent = await allERC20Tx.json();

          // 1. get all nft collection
          const q = query(collection(db, "nft_collections"));
          const querySnapshot = await getDocs(q);

          let tempAllAthleteCollectionBackend = [];
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const tempNftcollectionInfo = doc.data();
              tempAllAthleteCollectionBackend.push(tempNftcollectionInfo);
            });
          } else {
            console.log("no collection found");
          }

          // 2. call total supply on each
          const web3Instance = new Web3(
            new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
          );
          const { abi } = require("../../contracts/SofanNft.json");
          let sum = 0;
          let SumOfNft = 0;

          for (let i = 0; i < tempAllAthleteCollectionBackend.length; i++) {
            const collectionElement = tempAllAthleteCollectionBackend[i];
            if (collectionElement?.collection_address) {
              console.log("before before");
              const contractInfura = new web3Instance.eth.Contract(
                abi,
                `${collectionElement.collection_address}`
              );
              console.log("before");
              try {
                const currentSupply = await contractInfura.methods
                  .totalSupply()
                  .call();
                console.log("after");
                SumOfNft = SumOfNft + parseInt(currentSupply);
              } catch (error) {
                console.error(error);
              }
            }
          }
          if (dataAllErc20TransferEvent.message === "OK") {
            for (let i = 0; i < tempAllAthleteCollectionBackend.length; i++) {
              const collectionElement = tempAllAthleteCollectionBackend[i];

              // if (collectionElement?.collection_address) {
              //   const contractInfura = new web3Instance.eth.Contract(
              //     abi,
              //     `${collectionElement.collection_address}`
              //   );
              //   const currentSupply = await contractInfura.methods
              //     .totalSupply()
              //     .call();
              //   SumOfNft = SumOfNft + parseInt(currentSupply);
              // }

              for (
                let i = 0;
                i < dataAllErc20TransferEvent.result.length;
                i++
              ) {
                const erc20Element = dataAllErc20TransferEvent.result[i];

                // for into all nft collection element

                // if match => add to sum
                if (
                  erc20Element.from.toLowerCase() ===
                  collectionElement.collection_address.toLowerCase()
                ) {
                  // console.log("enter from admin", erc20Element);
                  sum = sum + parseInt(erc20Element.value);
                }
              }
            }
          }

          // 3. fetch all tx for loggedInUser.fundrecepitwallet
          const formattedSum = formatCurrentBalance(sum).slice(0, 4);
          let ethPrice;

          await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
          )
            .then((response) => response.json())
            .then((data) => (ethPrice = data.ethereum.usd))
            .catch((error) => console.log(error));

          const formattedSumToEth = parseInt(formattedSum) / parseInt(ethPrice);
          console.log(formattedSum);
          console.log(SumOfNft);
          console.log(formattedSumToEth);
          // number of nft minted for each collection

          setData({
            totalNftSaled: SumOfNft,
            totalUsdcFormatted: formattedSum,
            totalEthFormatted: formattedSumToEth?.toString()?.slice(0, 8),
          });
        } else {
          console.log("please add a fund_receipt_wallet into firebase");
        }
      } else if (loggedInUser?.account_type === "athlete") {
        if (loggedInUser?.fund_receipt_wallet) {
          const web3Instance = new Web3(
            new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
          );
          const { abi } = require("../../contracts/SofanNft.json");

          const allERC20Tx = await fetch(
            `https://${etherscanBaseURI}/api?module=account&action=tokentx&contractaddress=${process.env.REACT_APP_USDC_ADDRESS}&address=${loggedInUser.fund_receipt_wallet}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
          );
          const dataAllErc20TransferEvent = await allERC20Tx.json();

          console.log(dataAllErc20TransferEvent);

          // Requestion nft collection from backend

          const q = query(
            collection(db, "nft_collections"),
            where("athlete_id", "==", loggedInUser.id)
          );
          const querySnapshot = await getDocs(q);

          let tempAllAthleteCollectionBackend = [];
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const tempNftcollectionInfo = doc.data();
              tempAllAthleteCollectionBackend.push(tempNftcollectionInfo);
            });
          } else {
            console.log("no collection found");
          }

          let sum = 0;
          let SumOfNft = 0;
          if (dataAllErc20TransferEvent.message === "OK") {
            for (let i = 0; i < tempAllAthleteCollectionBackend.length; i++) {
              const collectionElement = tempAllAthleteCollectionBackend[i];

              const contractInfura = new web3Instance.eth.Contract(
                abi,
                `${collectionElement.collection_address}`
              );
              try {
                const currentSupply = await contractInfura.methods
                  .totalSupply()
                  .call();
                SumOfNft = SumOfNft + parseInt(currentSupply);
              } catch (error) {
                console.error(error);
              }

              for (
                let i = 0;
                i < dataAllErc20TransferEvent.result.length;
                i++
              ) {
                const erc20Element = dataAllErc20TransferEvent.result[i];

                // for into all nft collection element

                // if match => add to sum
                if (
                  erc20Element.from.toLowerCase() ===
                  collectionElement.collection_address.toLowerCase()
                ) {
                  console.log("enter", erc20Element);
                  sum = sum + parseInt(erc20Element.value);
                }
              }
            }
          }

          const formattedSum = formatCurrentBalance(sum)?.slice(0, 4);
          let ethPrice;

          await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
          )
            .then((response) => response.json())
            .then((data) => (ethPrice = data.ethereum.usd))
            .catch((error) => console.log(error));

          const formattedSumToEth = parseInt(formattedSum) / parseInt(ethPrice);
          console.log(formattedSum);
          console.log(SumOfNft);
          console.log(formattedSumToEth);
          // number of nft minted for each collection

          setData({
            totalNftSaled: SumOfNft,
            totalUsdcFormatted: formattedSum,
            totalEthFormatted:
              formattedSumToEth === NaN
                ? "0"
                : formattedSumToEth?.toString()?.slice(0, 8),
          });
        }
      }
    };
    loadData();
  }, [loggedInUser]);

  return (
    <section className="dashboard-page-container">
      {loggedInUser?.account_type === "athlete" ? (
        <div className="dashboard-page-wrap">
          <DashboardSubMenu
            setIsSubMenuClicked={setIsSubMenuClicked}
            isSubMenuClicked={isSubMenuClicked}
          />
          {isSubMenuClicked[0] && (
            <>
              <div className="dashboard-page-stats-container">
                <DashboardStats data={data} />
              </div>
            </>
          )}
          {/* {isSubMenuClicked[1] && (
          <div className="dashboard-page-my-collections-container">
            <DashboardMyCollections
              dashBoardPageMarginDelete={true}
              dataBackend={dataBackend}
              //
              nftsFromOwner={nftsFromOwner}
            />
          </div>
        )} */}
          <div></div>

          {/* {isSubMenuClicked[2] && (
          <>
            <div className="dashboard-page-my-calendar-container">
              <DashboardMyCalendar
                dashboardPageStyle={true}
                events={dataBackend.events}
              />
            </div>
          </>
        )} */}
        </div>
      ) : loggedInUser?.account_type === "admin" ? (
        <div className="dashboard-page-wrap">
          <div className="dashboard-page-stats-container">
            <DashboardStats data={data} />
          </div>
        </div>
      ) : (
        <>Not an athlete</>
      )}
    </section>
  );
}

export default Dashboard;

import React, { useState, useEffect } from "react";
import DashboardMyCollections from "../../Components/DashboardMyCollections/DashboardMyCollections";
import DashboardStats from "../../Components/DashboardStats/DashboardStats";
import DashboardSubMenu from "../../Components/DashboardSubMenu/DashboardSubMenu";
import DashboardMyCalendar from "../../Components/DashboardMyCalendar/DashboardMyCalendar";
import { Network, Alchemy } from "alchemy-sdk";
import "./Dashboard.css";
import useUserCollection from "../../contexts/UserContext/useUserCollection";
import Web3 from "web3";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Configs/firebase";
import { formatCurrentBalance } from "../../Utils/formatCurrentBalance";
function Dashboard() {
  const { loggedInUser } = useUserCollection();
  const [isSubMenuClicked, setIsSubMenuClicked] = useState([
    true,
    false,
    false,
  ]);
  const [ethPrice, setEthPrice] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    console.log("yes");
    const loadData = async () => {
      console.log(loggedInUser);

      if (loggedInUser?.fund_receipt_wallet) {
        const web3Instance = new Web3(
          new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
        );
        const { abi } = require("../../contracts/SofanNft.json");

        const allERC20Tx = await fetch(
          `https://api-goerli.etherscan.io/api?module=account&action=tokentx&contractaddress=${process.env.REACT_APP_USDC_ADDRESS}&address=${loggedInUser.fund_receipt_wallet}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_ID}`
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
            const currentSupply = await contractInfura.methods
              .totalSupply()
              .call();
            SumOfNft = SumOfNft + parseInt(currentSupply);

            for (let i = 0; i < dataAllErc20TransferEvent.result.length; i++) {
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
          totalEthFormatted: formattedSumToEth.toString().slice(0, 8),
        });
      }
    };
    loadData();
  }, [loggedInUser]);

  return (
    <section className="dashboard-page-container">
      {loggedInUser ? (
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
      ) : (
        <>Not an athlete</>
      )}
    </section>
  );
}

export default Dashboard;

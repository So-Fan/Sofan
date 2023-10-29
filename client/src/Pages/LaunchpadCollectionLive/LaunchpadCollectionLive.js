import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./LaunchpadCollectionLive.css";
import Web3 from "web3";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../Configs/firebase";
import { useParams } from "react-router-dom";

import LaunchpadCollectionLiveHeader from "../../Components/LaunchpadCollectionLiveHeader/LaunchpadCollectionLiveHeader";
import LaunchpadCollectionLiveUtilities from "../../Components/LaunchpadCollectionLiveUtilities/LaunchpadCollectionLiveUtilities";
import MoreAboutThisCollection from "../../Components/MoreAboutThisCollection/MoreAboutThisCollection";
import LaunchpadCollectionLiveMoreAboutCollection from "../../Components/LaunchpadCollectionLiveMoreAboutCollection/LaunchpadCollectionLiveMoreAboutCollection";
import NftCollectionMoreAboutAthlete from "../../Components/NftCollectionMoreAboutAthlete/NftCollectionMoreAboutAthlete";
// import { Network, Alchemy } from "alchemy-sdk";
// import alchemy from "../../Configs/alchemy";
import MintPopUpBuy from "../../Components/MintPopUp/MintPopUpBuy/MintPopUpBuy";
import Modal from "../../Components/Modal/Modal";
import MintPopUp from "../../Components/MintPopUp/MintPopUp";
import useEth from "../../contexts/EthContext/useEth";
import { formatCurrentBalance } from "../../Utils/formatCurrentBalance";
import PopUpAddFundToWallet from "../../Components/PopUpAddFundToWallet/PopUpAddFundToWallet";
import MintPopUpStatus from "../../Components/MintPopUp/MintPopUpStatus/MintPopUpStatus";
import useUserCollection from "../../contexts/UserContext/useUserCollection";
import { removeDuplicatesFromArray } from "../../Utils/removeDuplicatesFromArray";
import useCrossmintPayloadContext from "../../contexts/CrossmintPayloadContext/useCrossmintPayload";
import useToggleNetwork from "../../contexts/ToggleNetwork/useToggleNetwork";
function LaunchpadCollectionLive(isLogged) {
  // functionnal states
  const [pixelScrolledAthleteProfilePage, setPixelScrolledAthleteProfilePage] =
    useState();
  const [isMintButtonClicked, setIsMintButtonClicked] = useState(false);
  // API + Backend states
  const [ethPrice, setEthPrice] = useState(""); // API CoinGecko
  const [nftPicture, setNftPicture] = useState();
  const [collectionNameApi, setCollectionNameApi] = useState();
  const [collectionDescriptionApi, setCollectionDescriptionApi] = useState();
  const [nftCollectionMaxItems, setNftCollectionMaxItems] = useState();
  const [nftCollectionItemMint, setNftCollectionItemMint] = useState();
  const [nftMintPriceInUSDC, setNftMintPriceInUSDC] = useState();
  const [nftMintPriceInETH, setNftMintPriceInETH] = useState();
  const [nftLimitByWalletInfo, setNftLimitByWalletInfo] = useState();
  const [totalPriceInUSDC, setTotalPriceInUSDC] = useState();
  const [mintCounter, setMintCounter] = useState(1);
  const [utilities, setUtilities] = useState([]);

  const [athleteFanNumber, setAthleteFanNumber] = useState();
  const { alchemy } = useToggleNetwork();
  const [
    launchpadCollectionLiveAthleteDataBackend,
    setLaunchpadCollectionLiveAthleteDataBackend,
  ] = useState([]);
  const [launchpadCollectionAthleteInfos, setLaunchpadCollectionAthleteInfos] =
    useState([]);
  // const [launchpadCollectionLiveItems, setLaunchpadCollectionLiveItems] =
  //   useState([]);
  const launchpadCollectionLive = collection(db, "nft_collections");
  const launchpadCollectionLiveAthlete = collection(db, "users");
  const {
    state: { web3, contract, accounts },
    setContractAddress,
  } = useEth();
  const location = useLocation();
  // const segments = location.pathname.split("/");
  // const athleteId = segments[2];
  // const collectionAddress = segments[3];
  const loggedInUserInfo = useUserCollection();
  const [crossmintPayLoadLocalStorage, setCrossmintPayLoadLocalStorage] =
    useState(null);
  const { athleteId, collectionAddress } = useParams();

  useEffect(() => {
    window.addEventListener(
      "storage",
      () => {
        // console.log("event listener declenched");
        const storedPayload = localStorage.getItem("crossmintPayload");
        // console.log("get Item");
        if (storedPayload) {
          // console.log("before setState to JSON.parse(storedPayload)");
          setCrossmintPayLoadLocalStorage(JSON.parse(storedPayload));
          // console.log("after setState to JSON.parse(storedPayload)");
        }
      },
      false
    );
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []);

  async function getNftsData() {
    try {
      const nftsData = await alchemy.nft.getContractMetadata(
        // "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
        `${collectionAddress}`
      );
      setCollectionNameApi(nftsData?.name);
      setCollectionDescriptionApi(nftsData?.openSea?.description);
      // console.log(nftsData?.totalSupply);
      setNftCollectionItemMint(nftsData?.totalSupply);
    } catch (error) {
      console.error(error);
    }
    // const transferData = await alchemy.nft.getTransfersForContract(
    //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", // BAYC collection contract
    //   { from: "0x0000000000000000000000000000000000000000" }
    // );
    // console.log(transferData);
  }
  async function getNftPicture() {
    let nftsFromContract;
    try {
      nftsFromContract = await alchemy.nft.getNftMetadata(
        "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        "15"
      );
    } catch (error) {
      console.error(error);
    }
    // console.log(nftsFromContract?.media[0]?.gateway)
    if (nftsFromContract?.media[0]?.gateway) {
      setNftPicture(nftsFromContract?.media[0]?.gateway);
    }
  }
  // API Infura
  const web3Instance = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
  );
  const { abi } = require("../../contracts/SofanNft.json");
  const contractInfura = new web3Instance.eth.Contract(
    abi,
    `${collectionAddress}`
  );

  async function getNftLimitByWalletInfo() {
    try {
      let isLimitByWallet = await contractInfura.methods
        .isLimitByWallet()
        .call();
      let limitByWallet = await contractInfura.methods.limitByWallet().call();
      setNftLimitByWalletInfo({
        isLimitByWallet: isLimitByWallet,
        limitByWallet: limitByWallet,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function getCollectionLimit() {
    let tx;
    try {
      tx = await contractInfura.methods.collectionLimit().call();
    } catch (error) {
      console.error(error);
    }
    if (tx) {
      setNftCollectionMaxItems(tx);
    }
  }
  async function getPrice() {
    let tx;
    try {
      tx = await contractInfura.methods.price().call();
    } catch (error) {
      console.error(error);
    }
    let priceFormatted;
    if (tx) {
      // priceFormatted = formatCurrentBalance(tx);
      setNftMintPriceInUSDC(tx);
    } else {
      setNftMintPriceInUSDC(NaN);
    }

    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) =>
        setNftMintPriceInETH(
          (formatCurrentBalance(tx).slice(0, 4) / data.ethereum.usd)
            .toString()
            .slice(0, 8)
        )
      )
      .catch((error) => console.log(error));
  }
  // -------------------------------
  useEffect(() => {
    if (alchemy) {
      getNftsData();
      getNftPicture();
      getCollectionLimit();
      getNftLimitByWalletInfo();
      getPrice();
    }
  }, [alchemy]);

  // ----------------------- Shajeed -------------------------

  useEffect(() => {
    const q = query(
      collection(db, "nft_collections"),
      where("collection_address", "==", collectionAddress)
    );

    getDocs(q).then((querySnapshot) => {
      const docData = querySnapshot.docs[0];
      if (docData) {
        const docId = docData.id;
        const unsub = onSnapshot(
          collection(db, "nft_collections", docId, "utilities"),
          (snapshot) => {
            const utilitiesData = snapshot.docs.map((doc) => ({
              id: doc.id, // include the id here
              ...doc.data(),
            }));
            setUtilities(utilitiesData);
          }
        );

        return () => {
          unsub();
        };
      }
    });
  }, [collectionAddress]);

  // ---------------------------------------------------------
  const dataBackend = {
    header: [
      {
        creatorProfilePic:
          "https://www.vendeeglobe.org/medias/05/06/50614/alexia-barrier-c-462-560.jpg",
        creatorName: "Alexia Barrier",
        collectionName: "Explore the World with Alexia Barrier",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla tortor, vehicula ut viverra at, auctor at ipsum. Cras ornare et lorem vel tincidunt. Proin quis augue ac nibh faucibus molestie in at quam. Mauris massa tellus, sagittis eu molestie. ",
        mintLimit: 3,
      },
    ],
    utilities: [
      {
        title: "Meeting with Alexia",
        status: "Indisponible",
        description:
          "At the end of the Vendée Globe 2023, 15/400 of the holders of this NFT will have the chance to meet Alexia Barrier personally at the finish of the coursemaklemlakemazlkmalzkazemlkazemleakazlmekazelmaezkaz",
        date: "July 9th 2023",
      },
      {
        title: "3 online VIP live",
        status: "Disponible",
        description:
          "Have access with all other members to 3 live important events during the entire competition, at three key times.",
        date: "July 9th / 15th / 28th 2023",
      },
      {
        title: "Alexia Barrier special merch",
        status: "Indisponible",
        description:
          "Receive your new collection t-shirt, signed by Alexia herself at the end of the race. The t-shirts will be sent 1 week after the end of the race.",
        date: "August 7th 2023",
      },
    ],
    moreAboutThisCollection: [
      {
        description:
          "This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become. This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become.",
      },
    ],
    moreAboutAthlete: [
      {
        picture: "https://i.imgur.com/Z7rHdVv.png",
        sportTitle: "Skipper",
        fullName: "Alexia Barrier",
        description:
          "Alexia Barrier is a French professional sailor and skipper. She has competed in several sailing races, including the Solitaire du Figaro and the Vendée Globe. She is the first woman to have completed the Vendée Globe solo non-stop race, finishing in 16th place. She is also the founder of the Sail & Help association, which promotes environmental protection and education through sailing.",
        fansNumber: 121023,
      },
    ],
  };
  const dataRealTimeDb = {
    header: [
      {
        timer: "1d 2h 21m 35 s",
      },
    ],
  };
  const dataApi = {
    header: [
      {
        ethPrice: 0.5,
        eurPrice: 625.02,
        counterNftMinted: 480,
        totalNftMintable: 500,
      },
    ],
  };
  // Faire afficher le pop up dynamiquement en récupérent le nb de pixel scrollé
  const handlePixelScrolledAthleteProfilePage = () => {
    setPixelScrolledAthleteProfilePage(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener(
      "scroll",
      handlePixelScrolledAthleteProfilePage,
      false
    );
  }, []);
  // retirer le scroll lock lorsque le modal n'est plus la
  document.querySelector("body").classList.remove("scroll-lock");
  // display mint pop up
  function handleMintButtonClick(e) {
    setContractAddress(collectionAddress);
    setIsMintButtonClicked(true);
  }

  const [isMintingProcessBegan, setIsMintingProcessBegan] = useState(false);
  const [mintingProcessStatus, setMintingProcessStatus] = useState(true);
  const [
    isMintingProcessEndedSuccessfully,
    setIsMintingProcessEndedSuccessfully,
  ] = useState(false);
  const [mintPrice, setMintPrice] = useState(1000000); // TODO: set price dynamically
  const [currentBalance, setCurrentBalance] = useState();
  const [
    displayPopUpAddFundToWalletFromMint,
    setDisplayPopUpAddFundToWalletFromMint,
  ] = useState();

  const approve = async () => {
    // const web3Instance = new Web3(Web3.givenProvider)
    // await web3.eth.requestAccounts();

    console.log("create Instance");
    const artifact = require("../../Pages/Test/USDC.json");
    const { abi } = artifact;
    let addressUSDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    let contractUSDCInstance = new web3.eth.Contract(abi, addressUSDC);

    try {
      const result = await contractUSDCInstance.methods
        .balanceOf(accounts[0])
        .call({ from: accounts[0] });
      console.log("Je suis result", result);
      formatCurrentBalance(result, setCurrentBalance);
      if (result > 0 && result < parseInt(totalPriceInUSDC)) {
        // setIsBidNftButtonClicked(false);
        // setIsMintButtonClicked(false);
        setDisplayPopUpAddFundToWalletFromMint(true);

        return;
      }
    } catch (error) {
      console.error(error);
      setIsMintingProcessEndedSuccessfully(false);
      return;
    }

    try {
      setIsMintingProcessBegan(true);
      // const price = 1000000;
      const result = await contractUSDCInstance.methods
        .approve(collectionAddress, totalPriceInUSDC)
        .send({ from: accounts[0] });
      console.log(result);
      if (result.status === true) {
        console.log("before mint");
        await mint();
        // setIsMintingProcessBegan(false)
        setMintingProcessStatus(false);
      } else {
        setIsMintingProcessEndedSuccessfully(false);
        setMintingProcessStatus(false);
      }
    } catch (error) {
      console.log(error);
      // setIsMintingProcessBegan(false)
      setMintingProcessStatus(false);
      setIsMintingProcessEndedSuccessfully(false);
    }
  };

  const mint = async () => {
    // e.preventDefault();
    console.log(accounts, contract);
    let userWallet;
    if (loggedInUserInfo.loggedInUser.metamask) {
      userWallet = loggedInUserInfo.loggedInUser.metamask;
    } else if (loggedInUserInfo.loggedInUser.web3auth) {
      userWallet = loggedInUserInfo.loggedInUser.web3auth;
    }
    if (userWallet) {
      const result2 = await contract.methods
        .mint(userWallet, mintCounter, totalPriceInUSDC)
        .send({ from: accounts[0] });
      if (result2.status) {
        setIsMintingProcessEndedSuccessfully(true);
      } else {
        setIsMintingProcessEndedSuccessfully(false);
      }
    }
    // console.log(result2);3539.75
  };
  //
  useEffect(() => {
    async function getAthleteInfoCollectionLive() {
      try {
        const q = query(
          launchpadCollectionLiveAthlete,
          where("id", "==", `${athleteId}`)
        );
        const data = await getDocs(q);
        setLaunchpadCollectionAthleteInfos(
          data.docs.map((doc) => {
            const docData = doc.data();
            return {
              display_name: docData.display_name,
              profile_avatar: docData.profile_avatar,
              id: doc.id,
              sport: docData.sport,
            };
          })
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des infos athlète:",
          error
        );
      }
    }

    async function getCollectionLiveAthleteData() {
      try {
        const q = query(
          launchpadCollectionLive,
          where("athlete_id", "==", `${athleteId}`),
          where("collection_address", "==", `${collectionAddress}`),
          limit(1)
        );
        const data = await getDocs(q);
        setLaunchpadCollectionLiveAthleteDataBackend(
          data.docs.map((doc) => {
            const docData = doc.data();
            return {
              collection_title: docData.collection_title,
              collection_avatar: docData.collection_avatar,
              collection_address: docData.collection_address,
              collection_description: docData.collection_description,
              know_more_collection: docData.know_more_collection,
              know_more_athlete_description:
                docData.know_more_athlete_description,
              know_more_athlete_description:
                docData.know_more_athlete_description,
              nft_collection_limit: docData.nft_collection_limit,
              id: doc.id,
              crossmint_collection_id: docData.crossmint_collection_id,
              crossmint_project_id: docData.crossmint_project_id,
            };
          })
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de collection:",
          error
        );
      }
    }

    const getAthleteInfo = async () => {
      let tempAllAthleteCollection = [];
      const q = query(
        collection(db, "nft_collections"),
        where("athlete_id", "==", athleteId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const tempNftcollectionInfo = doc.data();
          tempAllAthleteCollection.push(tempNftcollectionInfo);
        });
      } else {
        console.log("No collection found");
      }
      let tempAthleteFans = [];
      for (let i = 0; i < tempAllAthleteCollection.length; i++) {
        const element = tempAllAthleteCollection[i];
        const allAthleteCollectionOwners =
          await alchemy.nft.getOwnersForContract(element.collection_address);
        // console.log(allAthleteCollectionOwners.owners);
        for (let i = 0; i < allAthleteCollectionOwners.owners.length; i++) {
          const elementFromAlchemy = allAthleteCollectionOwners.owners[i];
          tempAthleteFans.push(elementFromAlchemy);
        }
      }
      // console.log(tempAllAthleteCollection);
      const athletefans = removeDuplicatesFromArray(tempAthleteFans);
      // console.log(allAthleteCollection);
      setAthleteFanNumber(athletefans.length);
    };
    if (alchemy) {
      getAthleteInfo();
      getAthleteInfoCollectionLive();
      getCollectionLiveAthleteData();
    }
  }, [alchemy]);

  useEffect(() => {
    console.log("enter second useEffect when crossmintPayLoadLocalStorage");
    if (crossmintPayLoadLocalStorage != null && crossmintPayLoadLocalStorage) {
      console.log(
        "enter second useEffect when crossmintPayLoadLocalStorage crossmintPayLoadLocalStorage != null && crossmintPayLoadLocalStorage"
      );
      if (crossmintPayLoadLocalStorage.status === "success") {
        console.log("success", crossmintPayLoadLocalStorage);
        setIsMintingProcessBegan(true);
        setMintingProcessStatus(false);
        setIsMintingProcessEndedSuccessfully(true);
      } else {
        console.log("not success");
        setMintingProcessStatus(false);
        setIsMintingProcessEndedSuccessfully(false);
      }
    }
  }, [crossmintPayLoadLocalStorage]);
  return (
    <>
      <section className="launchpad-collection-live-page-container">
        {/* <button onClick={handleButtonClick}>handleButtonClick</button> */}
        <LaunchpadCollectionLiveHeader
          handleMintButtonClick={handleMintButtonClick}
          //   dataBackend Firestore
          launchpadCollectionLiveHeader={true}
          athleteId={athleteId}
          nftPicture={
            launchpadCollectionLiveAthleteDataBackend[0]?.collection_avatar
          }
          creatorProfilePic={launchpadCollectionAthleteInfos[0]?.profile_avatar}
          creatorName={launchpadCollectionAthleteInfos[0]?.display_name}
          collectionName={
            launchpadCollectionLiveAthleteDataBackend[0]?.collection_title
          }
          description={
            launchpadCollectionLiveAthleteDataBackend[0]?.collection_description
          }
          minLimit={nftLimitByWalletInfo}
          // dataBacken RealTimeDb
          timer={dataRealTimeDb.header[0].timer}
          // FAKE apiData
          nftPriceEth={nftMintPriceInETH}
          nftPriceEur={nftMintPriceInUSDC}
          counterNftMinted={nftCollectionItemMint}
          totalNftMintable={dataApi.header[0].totalNftMintable}
          // Api Alchemy
          collectionNameApi={collectionNameApi}
          collectionDescriptionApi={collectionDescriptionApi}
          // Api CoinGecko
          ethPrice={ethPrice}
          // display mint popup
          nftCollectionMaxItems={nftCollectionMaxItems}
        />
        <div className="launchpad-collection-live-page-left-container">
          <LaunchpadCollectionLiveUtilities
            utilitiesArray={utilities}
            loggedInUser={isLogged}
          />
          <div className="launchpad-collection-live-page-more-about-collection-container">
            <LaunchpadCollectionLiveMoreAboutCollection
              knowMoreAboutCollection={
                launchpadCollectionLiveAthleteDataBackend[0]
                  ?.know_more_collection
              }
              moreAboutCollectionArray={dataBackend.moreAboutThisCollection}
            />
          </div>
        </div>
        <NftCollectionMoreAboutAthlete
          launchpadCollectionLivePage={true}
          athleteId={athleteId}
          knowMoreAboutAthleteDescription={
            launchpadCollectionLiveAthleteDataBackend[0]
              ?.know_more_athlete_description
          }
          moreAboutAthlete={dataBackend.moreAboutAthlete[0]}
          knowMoreAboutAthleteDisplayName={
            launchpadCollectionAthleteInfos[0]?.display_name
          }
          knowMoreAboutAthleteSport={launchpadCollectionAthleteInfos[0]?.sport}
          knowMoreAboutAthleteProfileAvatar={
            launchpadCollectionAthleteInfos[0]?.profile_avatar
          }
          knowMoreAboutAthleteFanNumber={athleteFanNumber}
        />
      </section>
      {isMintButtonClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          setState={setIsMintButtonClicked}
          setState2={!mintingProcessStatus ? setIsMintingProcessBegan : null}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ top: "25px", right: "26px" }}
        >
          {isMintingProcessBegan ? (
            <>
              <div className="launchpad-collection-live-mintPopUpStatus-container">
                <MintPopUpStatus
                  isLogged={isLogged}
                  collection_title={
                    launchpadCollectionLiveAthleteDataBackend[0]
                      ?.collection_title
                  }
                  statusProcessing={mintingProcessStatus}
                  statusMint={isMintingProcessEndedSuccessfully}
                  setIsMintingProcessBegan={setIsMintingProcessBegan}
                  setMintingProcessStatus={setMintingProcessStatus}
                  setIsMintingProcessEndedSuccessfully={
                    setIsMintingProcessEndedSuccessfully
                  }
                  styleImage={{ right: "119.5px" }}
                  styleP={{ right: "25px" }}
                  styleDiv={{ bottom: "21px", right: "185px" }}
                  styleP2={{ right: "118.5px" }}
                />
              </div>
            </>
          ) : (
            <MintPopUp
              counterNftMinted={nftCollectionItemMint}
              totalNftMintable={nftCollectionMaxItems}
              setIsMintButtonClicked={setIsMintButtonClicked}
              approve={approve}
              isMintingProcessBegan={isMintingProcessBegan}
              limitByWalletInfo={nftLimitByWalletInfo}
              nftCollectionAddress={collectionAddress}
              nftMintPriceInUSDC={nftMintPriceInUSDC}
              nftMintPriceInETH={nftMintPriceInETH}
              totalPriceInUSDC={totalPriceInUSDC}
              setTotalPriceInUSDC={setTotalPriceInUSDC}
              mintCounter={mintCounter}
              setMintCounter={setMintCounter}
              launchpadCollectionLiveAthleteDataBackend={
                launchpadCollectionLiveAthleteDataBackend
              }
              setIsMintingProcessBegan={setIsMintingProcessBegan}
            />
          )}
        </Modal>
      )}
      {displayPopUpAddFundToWalletFromMint && (
        <>
          <Modal
            style={{ top: "20px", right: "20px" }}
            setState={setDisplayPopUpAddFundToWalletFromMint}
          >
            <PopUpAddFundToWallet
              currentBalance={currentBalance}
              setIsMintButtonClicked={setIsMintButtonClicked}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default LaunchpadCollectionLive;

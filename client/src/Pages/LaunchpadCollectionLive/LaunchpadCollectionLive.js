import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "firebase/firestore";
import { db } from "../../Configs/firebase";
import LaunchpadCollectionLiveHeader from "../../Components/LaunchpadCollectionLiveHeader/LaunchpadCollectionLiveHeader";
import LaunchpadCollectionLiveUtilities from "../../Components/LaunchpadCollectionLiveUtilities/LaunchpadCollectionLiveUtilities";
import MoreAboutThisCollection from "../../Components/MoreAboutThisCollection/MoreAboutThisCollection";
import LaunchpadCollectionLiveMoreAboutCollection from "../../Components/LaunchpadCollectionLiveMoreAboutCollection/LaunchpadCollectionLiveMoreAboutCollection";
import NftCollectionMoreAboutAthlete from "../../Components/NftCollectionMoreAboutAthlete/NftCollectionMoreAboutAthlete";
import { Network, Alchemy } from "alchemy-sdk";
import MintPopUpBuy from "../../Components/MintPopUp/MintPopUpBuy/MintPopUpBuy";
import Modal from "../../Components/Modal/Modal";
import MintPopUp from "../../Components/MintPopUp/MintPopUp";
import useEth from "../../contexts/EthContext/useEth";
import { formatCurrentBalance } from "../../Utils/formatCurrentBalance";
import PopUpAddFundToWallet from "../../Components/PopUpAddFundToWallet/PopUpAddFundToWallet";
import MintPopUpStatus from "../../Components/MintPopUp/MintPopUpStatus/MintPopUpStatus";
function LaunchpadCollectionLive() {
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
  const [nftMintPrice, setNftMintPrice] = useState();
  const [
    launchpadCollectionLiveAthleteDataBackend,
    setLaunchpadCollectionLiveAthleteDataBackend,
  ] = useState();
  const [launchpadCollectionLiveItems, setLaunchpadCollectionLiveItems] =
    useState([]);
  const launchpadCollectionLive = collection(db, "nft_collections");
  const launchpadCollectionLiveAthlete = collection(db, "users");
  const {
    state: { web3, contract, accounts },
    setContractAddress,
  } = useEth();
  const { id, collectionAddress } = useParams();
  // // Start Backend
  // useEffect(() => {
  //   // retrieve collection address from firestore below

  //       // Start temporary code
  //         const collectionAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
  //       // End temporary code
  //   // then pass it to the state below
  //   setContractAddress(collectionAddress);
  // }, []);
  // End Backend
  // API Coingecko price ETH

  // const handleButtonClick = () => {
  //   // const collectionAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
  //   //     // End temporary code
  //   // // then pass it to the state below
  //   // setContractAddress(collectionAddress);
  // }
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []);
  // Api Alchemy setup
  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };

  const alchemy = new Alchemy(settings);
  async function getNftsData() {
    try {
      const nftsData = await alchemy.nft.getContractMetadata(
        // "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
        "0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a"
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
    const nftsFromContract = await alchemy.nft.getNftMetadata(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      "15"
    );
    // console.log(nftsFromContract?.media[0]?.gateway)
    setNftPicture(nftsFromContract?.media[0]?.gateway);
  }
  // API Infura
  const web3Instance = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
  );
  const { abi } = require("../../contracts/SofanNftTemplate.json");
  const contractInfura = new web3Instance.eth.Contract(
    abi,
    "0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a"
  );
  async function getCollectionLimit() {
    const tx = await contractInfura.methods.collectionLimit().call();
    setNftCollectionMaxItems(tx);
  }
  async function getPrice() {
    // const price = await contractInfura?.methods?.price().call(); TODO:
    setNftMintPrice(3);
  }
  // -------------------------------
  useEffect(() => {
    getNftsData();
    getNftPicture();
    getCollectionLimit();
    getPrice();
  }, []);
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
        title: "3 online VIP live ",
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

  const [handleMintButtonClickFunction, setHandleMintButtonClickFunction] =
    useState();

  // display mint pop up
  function handleMintButtonClick(e) {
    // TODO : load contract address from backend
    const collectionAddress = "0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a";
    // End temporary code
    // then pass it to the state below
    setContractAddress(collectionAddress);
    setIsMintButtonClicked(true);
    // console.log("test");
  }

  // start import

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
      if (result > 0 && result < parseInt(mintPrice)) {
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
      const price = 1000000;
      const result = await contractUSDCInstance.methods
        .approve(contract._address, price)
        .send({ from: accounts[0] });
      console.log(result);
      if (result.status) {
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
    console.log(accounts, contract);
    const result2 = await contract.methods
      .mint("0x266a8e449A62878A6d63BB14c90a95F425a3d30f", 1, 1000000)
      .send({ from: accounts[0] });
    if (result2.status) {
      setIsMintingProcessEndedSuccessfully(true);
    } else {
      setIsMintingProcessEndedSuccessfully(false);
    }
    console.log(result2);
  };
  //
  useEffect(() => {
    async function getCollectionLiveAthleteData() {
      // Create a query against the collection
      const q = query(
        launchpadCollectionLiveAthlete,
        // orderBy("launch_date", "desc"),
        // pour classer en décroissant et mettre l'element le plus vieux en banniere avec l'index 0
        // where("account_type", "==", "athlete"),
        limit(1)
      );
      const data = await getDocs(q);
      setLaunchpadCollectionLiveAthleteDataBackend(
        data.docs.map((doc) => {
          const docData = doc.data();
          return {
            // collection_address: docData.collection_address,
            // title: docData.title,
            // display_name: docData.display_name,
            // profile_avatar: docData.profile_avatar,
            // description: docData.description,
            // item_number: docData.item_number,
            // img: docData.img,
            // launch_date: docData.launch_date,

            id: doc.id, // Include the document ID if needed
          };
        })
      );
    }
    async function getLaunchpadCollectionLiveKnowMore() {
      // Create a query against the collection
      const q = query(
        launchpadCollectionLive,
        // orderBy("launch_date", "desc"),
        // pour classer en décroissant et mettre l'element le plus vieux en banniere avec l'index 0
        // where("account_type", "==", "athlete"),
        limit(10)
      );
      const data = await getDocs(q);
      setLaunchpadCollectionLiveAthleteDataBackend(
        data.docs.map((doc) => {
          const docData = doc.data();
          return {
            // collection_address: docData.collection_address,
            // title: docData.title,
            // display_name: docData.display_name,
            // profile_avatar: docData.profile_avatar,
            // description: docData.description,
            // item_number: docData.item_number,
            // img: docData.img,
            // launch_date: docData.launch_date,
            know_more_collection: docData.know_more_collection,
            know_more_athlete_description:
              docData.know_more_athlete_description,
            id: doc.id, // Include the document ID if needed
          };
        })
      );
    }
    getCollectionLiveAthleteData();
    getLaunchpadCollectionLiveKnowMore();
  }, []);
  // console.log(launchpadCollectionLiveAthleteDataBackend);
  // Informations à récupérer
  // ID athlete, Nom athlete, Photo athlete, nft title, description, photo de la collection, nombre de nft mintable,
  useEffect(() => {
    const fetchData = async () => {
      try {
        const launchpadsSnapshot = await getDocs(launchpadCollectionLive);
        console.log("launchpadSnapchshots ---> ", launchpadsSnapshot);
        const dataPromises = launchpadsSnapshot.docs.map(async (doc) => {
          const launchpadData = doc.data();

          const nftCollectionDoc = await getDoc(
            launchpadData.nft_collection_ref
          );
          const userDoc = await getDoc(launchpadData.athlete_ref);

          return {
            launchpad: launchpadData,
            nftCollection: nftCollectionDoc.data(),
            user: userDoc.data(),
          };
        });

        const resolvedData = await Promise.all(dataPromises);
        setLaunchpadCollectionLiveItems(resolvedData);
        console.log("try réussis !");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(launchpadCollectionLiveItems);
  // récupérer adresse de la collection 
  return (
    <>
      <section className="launchpad-collection-live-page-container">
        {/* <button onClick={handleButtonClick}>handleButtonClick</button> */}
        <LaunchpadCollectionLiveHeader
          handleMintButtonClick={handleMintButtonClick}
          //   dataBackend Firestore
          launchpadCollectionLiveHeader={true}
          creatorProfilePic={dataBackend.header[0].creatorProfilePic}
          creatorName={dataBackend.header[0].creatorName}
          collectionName={dataBackend.header[0].collectionName}
          description={dataBackend.header[0].description}
          minLimit={dataBackend.header[0].mintLimit}
          // dataBacken RealTimeDb
          timer={dataRealTimeDb.header[0].timer}
          // FAKE apiData
          nftPriceEth={nftMintPrice}
          nftPriceEur={dataApi.header[0].eurPrice}
          counterNftMinted={nftCollectionItemMint}
          totalNftMintable={dataApi.header[0].totalNftMintable}
          // Api Alchemy
          collectionNameApi={collectionNameApi}
          collectionDescriptionApi={collectionDescriptionApi}
          nftPicture={nftPicture}
          // Api CoinGecko
          ethPrice={ethPrice}
          // display mint popup
          nftCollectionMaxItems={nftCollectionMaxItems}
        />
        <div className="launchpad-collection-live-page-left-container">
          <LaunchpadCollectionLiveUtilities
            utilitiesArray={dataBackend.utilities}
          />
          <div className="launchpad-collection-live-page-more-about-collection-container">
            <LaunchpadCollectionLiveMoreAboutCollection
              moreAboutCollectionArray={dataBackend.moreAboutThisCollection}
            />
          </div>
        </div>
        <NftCollectionMoreAboutAthlete
          launchpadCollectionLivePage={true}
          moreAboutAthlete={dataBackend.moreAboutAthlete[0]}
        />
      </section>
      {isMintButtonClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          setState={setIsMintButtonClicked}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ top: "25px", right: "26px" }}
        >
          {isMintingProcessBegan ? (
            <>
              <div className="launchpad-collection-live-mintPopUpStatus-container">
                <MintPopUpStatus
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
              setIsMintButtonClicked={setIsMintButtonClicked}
              approve={approve}
              isMintingProcessBegan={isMintingProcessBegan}
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

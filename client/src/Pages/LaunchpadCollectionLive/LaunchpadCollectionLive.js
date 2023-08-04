import React, { useState, useEffect } from "react";
import "./LaunchpadCollectionLive.css";
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

  const { setContractAddress, state: {contract} } = useEth();
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
    network: Network.ETH_MAINNET,
    maxRetries: 10,
  };

  const alchemy = new Alchemy(settings);
  async function getNftsData() {
    const nftsData = await alchemy.nft.getContractMetadata(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    );
    // const transferData = await alchemy.nft.getTransfersForContract(
    //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", // BAYC collection contract
    //   { from: "0x0000000000000000000000000000000000000000" }
    // );
    // console.log(transferData);
    setCollectionNameApi(nftsData?.openSea?.collectionName);
    setCollectionDescriptionApi(nftsData?.openSea?.description);
  }
  async function getNftPicture() {
    const nftsFromContract = await alchemy.nft.getNftMetadata(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      "15"
    );
    // console.log(nftsFromContract?.media[0]?.gateway)
    setNftPicture(nftsFromContract?.media[0]?.gateway);
  }
  useEffect(() => {
    getNftsData();
    getNftPicture();
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
    const collectionAddress = "0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a"
        // End temporary code
    // then pass it to the state below
    setContractAddress(collectionAddress);
    setIsMintButtonClicked(true);
    // console.log("test");
  }

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
          nftPriceEth={dataApi.header[0].ethPrice}
          nftPriceEur={dataApi.header[0].eurPrice}
          counterNftMinted={dataApi.header[0].counterNftMinted}
          totalNftMintable={dataApi.header[0].totalNftMintable}
          // Api Alchemy
          collectionNameApi={collectionNameApi}
          collectionDescriptionApi={collectionDescriptionApi}
          nftPicture={nftPicture}
          // Api CoinGecko
          ethPrice={ethPrice}
          // display mint popup
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
          <MintPopUp />
          {/* <MintPopUpBuy/> */}
        </Modal>
      )}
    </>
  );
}

export default LaunchpadCollectionLive;

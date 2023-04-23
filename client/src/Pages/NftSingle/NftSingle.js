import React, { useState, useEffect } from "react";
import NftCollectionHeader from "../../Components/NftCollectionHeader/NftCollectionHeader";
import NftCollectionHistory from "../../Components/NftCollectionHistory/NftCollectionHistory";
import NftCollectionLatestsBids from "../../Components/NftCollectionLatestsBids/NftCollectionLatestsBids";
import NftCollectionMoreAboutAthlete from "../../Components/NftCollectionMoreAboutAthlete/NftCollectionMoreAboutAthlete";
import NftCollectionMoreAboutNft from "../../Components/NftCollectionMoreAboutNft/NftCollectionMoreAboutNft";
import NftCollectionOverview from "../../Components/NftCollectionOverview/NftCollectionOverview";
import NftCollectionProperties from "../../Components/NftCollectionProperties/NftCollectionProperties";
import NftCollectionSubMenu from "../../Components/NftCollectionSubMenu/NftCollectionSubMenu";
import { Network, Alchemy } from "alchemy-sdk";
import "./NftSingle.css";
import Modal from "../../Components/Modal/Modal";
import PopUpBuyNft from "../../Components/PopUpBuyNft/PopUpBuyNft";
import PopUpPlaceBid from "../../Components/PopUpPlaceBid/PopUpPlaceBid";
const NftSingle = () => {
  // functionnal states
  const [isSubMenuClicked, setIsSubMenuClicked] = useState([
    true,
    false,
    false,
    false,
  ]);
  const [isBuyNftButtonClicked, setIsBuyNftButtonClicked] = useState(false);
  const [isBidNftButtonClicked, setIsBidNftButtonClicked] = useState(false);
  const [pixelScrolledAthleteProfilePage, setPixelScrolledAthleteProfilePage] =
    useState();
    const [isNftPropertiesExist, setIsNftPropertiesExist] = useState(false);
  //
  const [ethPrice, setEthPrice] = useState(); // API CoinGecko
  const [nftsFromOwner, setNftsFromOwner] = useState([]); // API Alchemy
  const [nftPicture, setNftPicture] = useState();
  const [collectionNameApi, setCollectionNameApi] = useState();
  const [collectionDescriptionApi, setCollectionDescriptionApi] = useState();
  const [nftIdApi, setNftIdApi] = useState();
  // Api Alchemy setup
  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_MAINNET,
    maxRetries: 10,
  };
  // get Nfts from Owner and Contracts
  async function getNftsForOwner() {
    // we select all the nfts hold by an address for a specific collection
    const nftsFromOwner = await alchemy.nft.getNftsForOwner(
      "0xf2018871debce291588B4034DBf6b08dfB0EE0DC",
      {
        contractAddresses: [
          "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258", // Otherdead collection
          "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", // BAYC collection
        ],
      } // filter
    );
    const nftsSale = await alchemy.nft.getFloorPrice(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" // BAYC collection
    );
    setNftsFromOwner(nftsFromOwner?.ownedNfts);
  }

  // console.log(collectionNameApi)
  const alchemy = new Alchemy(settings);
  async function getNftsData() {
    const nftsData = await alchemy.nft.getContractMetadata(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    );
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
    setNftIdApi(nftsFromContract?.tokenId);
  }
  // API Coingecko price ETH
  useEffect(() => {
    getNftsForOwner();
    getNftsData();
    getNftPicture();
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []);
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

  //
  function handleBuyNftButtonClick() {
    handleBidNftButtonClick={handleBidNftButtonClick}
    setIsBuyNftButtonClicked(true);
  }
  function handleBidNftButtonClick() {
    setIsBidNftButtonClicked(true)
  }
  //
  function handleClickSubMenuButton(e) {
    if (e.target.innerHTML === "Overview") {
      setIsSubMenuClicked([true, false, false, false]);
      return <NftCollectionOverview />;
    } else if (e.target.innerHTML === "Properties") {
      setIsSubMenuClicked([false, true, false, false]);
      return;
    } else if (e.target.innerHTML === "Bids") {
      setIsSubMenuClicked([false, false, true, false]);
      return;
    } else if (e.target.innerHTML === "Activity") {
      setIsSubMenuClicked([false, false, false, true]);
      return;
    }
  }
  // concat string length
  const dataSinglePageNftCollection = {
    headerData: [
      {
        collectionName: "Explore the world with Alexia Barrier",
        nftNumber: 390,
        creatorProfilePic:
          "https://www.vendeeglobe.org/medias/05/06/50614/alexia-barrier-c-462-560.jpg",
        creatorName: "Alexia Barrier",
        ownerName: "DonOfSomething",
        ownerProfilePic:
          "https://storage.googleapis.com/nftimagebucket/tokens/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/preview/8970.png",
      },
    ],
    overviewData: [
      {
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
        moreAboutCollection: [
          {
            description:
              "This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become. This collection has a stamp, created from the imagination of Alexia Barrier and her passions, referring to events from her past that have shaped the person she has become.",
          },
        ],
        latestBids: [
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "3 weeks ago ",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "3 weeks ago ",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "3 weeks ago ",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "3 weeks ago ",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "3 weeks ago ",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "3 weeks ago ",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "3 weeks ago ",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
        ],
      },
    ],
    propertiesData: [
      {
        properties: [
          {
            typeProperty: "BACKGROUND",
            property: "Mountains",
            rarity: 10,
          },
          {
            typeProperty: "BOAT",
            property: "Brown",
            rarity: 10,
          },
          {
            typeProperty: "ANIMAL",
            property: "Dog",
            rarity: 2,
          },
          {
            typeProperty: "ACCESSORY",
            property: "Backpack",
            rarity: 5,
          },
          {
            typeProperty: "OUTFIT",
            property: "Aventure",
            rarity: 15,
          },
          {
            typeProperty: "HAIR",
            property: "Brown",
            rarity: 20,
          },
        ],
      },
    ],
    history: [
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "3 weeks ago ",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "3 weeks ago ",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "3 weeks ago ",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "3 weeks ago ",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "3 weeks ago ",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "3 weeks ago ",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "3 weeks ago ",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
    ],
    moreAbout: [
      {
        picture: "https://i.imgur.com/Z7rHdVv.png",
        sportTitle: "Skipper",
        fullName: "Alexia Barrier",
        description:
          "Alexia Barrier is a French professional sailor and skipper. She has competed in several sailing races, including the Solitaire du Figaro and the Vendée Globe. She is the first woman to have completed the Vendée Globe solo non-stop race, finishing in 16th place. She is also the founder of the Sail & Help association, which promotes environmental protection and education through sailing.",
        fansNumber: 121023,
      },
    ],
    nftCard: [
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
    ],
  };

  const apiOpenSea = [
    {
      nftPriceEth: 8.44,
      nftPriceEur: 10481,
      nftBidEth: 6.44,
      nftBidEur: 8182,
    },
  ];
  return (
    <>
      <section className="nft-single-collection-page-container">
        <NftCollectionHeader
          collectionName={
            dataSinglePageNftCollection.headerData[0].collectionName
          }
          nftNumber={dataSinglePageNftCollection.headerData[0].nftNumber}
          creatorName={dataSinglePageNftCollection.headerData[0].creatorName}
          creatorProfilePic={
            dataSinglePageNftCollection.headerData[0].creatorProfilePic
          }
          ownerName={dataSinglePageNftCollection.headerData[0].ownerName}
          ownerProfilePic={
          dataSinglePageNftCollection.headerData[0].ownerProfilePic
          }
          //
          nftPriceEth={apiOpenSea[0].nftPriceEth}
          nftPriceEur={apiOpenSea[0].nftPriceEur}
          nftBidEth={apiOpenSea[0].nftBidEth}
          nftBifEur={apiOpenSea[0].nftBidEur}
          // Api Alchemy
          collectionNameApi={collectionNameApi}
          collectionDescriptionApi={collectionDescriptionApi}
          nftIdApi={nftIdApi}
          nftPicture={nftPicture}
          // Api CoinGecko
          ethPrice={ethPrice}
          //
          handleBuyNftButtonClick={handleBuyNftButtonClick}
          handleBidNftButtonClick={handleBidNftButtonClick}
        />
        <div className="nft-single-collection-page-left-container">
          {/* {isSubMenuClicked[0] ? <>
          
          </> :<>
        </> } */}
          <div
            style={
              isSubMenuClicked[0]
                ? { marginBottom: "50px" }
                : isSubMenuClicked[3]
                ? { marginBottom: "20px" }
                : {}
            }
            className="nft-single-collection-page-submenu-container"
          >
            <NftCollectionSubMenu
              handleClickSubMenuButton={handleClickSubMenuButton}
              isSubMenuClicked={isSubMenuClicked}
              nftsPropertiesCounter={dataSinglePageNftCollection.propertiesData[0].properties.length}
              //
              isNftPropertiesExist={isNftPropertiesExist}
              setIsNftPropertiesExist={setIsNftPropertiesExist}
            />
          </div>
          {isSubMenuClicked[0] && (
            <NftCollectionOverview
              utilitiesArray={
                dataSinglePageNftCollection.overviewData[0].utilities
              }
              moreAboutCollectionArray={
                dataSinglePageNftCollection.overviewData[0].moreAboutCollection
              }
              latestBidsArray={
                dataSinglePageNftCollection.overviewData[0].latestBids
              }
              ethPrice={ethPrice}
            />
          )}
          {isSubMenuClicked[1] && (
            <NftCollectionProperties
              properties={
                dataSinglePageNftCollection.propertiesData[0].properties
              }
              nftsFromOwner={nftsFromOwner}
              isNftPropertiesExist={isNftPropertiesExist}
            />
          )}
          {isSubMenuClicked[2] && (
            <NftCollectionLatestsBids
              latestBidsArray={
                dataSinglePageNftCollection.overviewData[0].latestBids
              }
              bidsSectionDeleteSpace={true}
              ethPrice={ethPrice}
            />
          )}
          {isSubMenuClicked[3] && (
            <>
              <div>
                <NftCollectionHistory
                  history={dataSinglePageNftCollection.history}
                  ethPrice={ethPrice}
                />
              </div>
            </>
          )}
          <div className="nft-single-collection-page-more-about-athlete-container">
            <NftCollectionMoreAboutAthlete
              moreAbout={dataSinglePageNftCollection.moreAbout}
            />
          </div>
          <NftCollectionMoreAboutNft
            nftCard={dataSinglePageNftCollection.nftCard}
            nftsFromOwner={nftsFromOwner}
            hidePrice={true}
          />
        </div>
      </section>
      {isBuyNftButtonClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          setState={setIsBuyNftButtonClicked}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ top: "30px", right: "26px" }}
        >
          <PopUpBuyNft />
        </Modal>
      )}
      {isBidNftButtonClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          setState={setIsBidNftButtonClicked}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ top: "30px", right: "26px" }}
        >
          <PopUpPlaceBid/>
        </Modal>
      )}
    </>
  );
};

export default NftSingle;

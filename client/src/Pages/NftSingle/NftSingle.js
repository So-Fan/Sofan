import React, { useState } from "react";
import NftCollectionHeader from "../../Components/NftCollectionHeader/NftCollectionHeader";
import NftCollectionHistory from "../../Components/NftCollectionHistory/NftCollectionHistory";
import NftCollectionLatestsBids from "../../Components/NftCollectionLatestsBids/NftCollectionLatestsBids";
import NftCollectionMoreAboutAthlete from "../../Components/NftCollectionMoreAboutAthlete/NftCollectionMoreAboutAthlete";
import NftCollectionMoreAboutNft from "../../Components/NftCollectionMoreAboutNft/NftCollectionMoreAboutNft";
import NftCollectionOverview from "../../Components/NftCollectionOverview/NftCollectionOverview";
import NftCollectionProperties from "../../Components/NftCollectionProperties/NftCollectionProperties";
import NftCollectionSubMenu from "../../Components/NftCollectionSubMenu/NftCollectionSubMenu";
import "./NftSingle.css";
const NftSingle = () => {
  const [isSubMenuClicked, setIsSubMenuClicked] = useState([
    true,
    false,
    false,
    false,
  ]);

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
          />
        )}
        {isSubMenuClicked[1] && (
          <NftCollectionProperties
            properties={
              dataSinglePageNftCollection.propertiesData[0].properties
            }
          />
        )}
        {isSubMenuClicked[2] && (
          <NftCollectionLatestsBids
            latestBidsArray={
              dataSinglePageNftCollection.overviewData[0].latestBids
            }
            bidsSectionDeleteSpace={true}
          />
        )}
        {isSubMenuClicked[3] && (
          <>
            <div>
              <NftCollectionHistory
                history={dataSinglePageNftCollection.history}
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
        />
      </div>
    </section>
  );
};

export default NftSingle;

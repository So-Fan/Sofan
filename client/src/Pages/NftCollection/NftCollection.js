import React, { useEffect, useState } from "react";
import NftCard from "../../Components/NftCard/NftCard";
import NftCollectionPageHeader from "../../Components/NftCollectionPageHeader/NftCollectionPageHeader";
import ProfileSubMenu from "../../Components/ProfileSubMenu/ProfileSubMenu";
import SortBySelector from "../../Components/SortBySelector/SortBySelector";
import UserActivity from "../../Components/UserProfileComponents/UserActivity/UserActivity";
import { Network, Alchemy, NftFilters } from "alchemy-sdk";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Configs/firebase";
// import { Alchemy, Network } from "alchemy-sdk";
import "./NftCollection.css";
const NftCollection = ({
  setIsUSerProfileSeortBySelectorClicked,
  isUSerProfileSeortBySelectorClicked,
}) => {
  const [dataConcat, setDataConcat] = useState();
  const [isProfileSubMenuButtonClicked, setIsProfileSubMenuButtonClicked] =
    useState([true, false, false, false]);
  const [nftsFromOwner, setNftsFromOwner] = useState([]);
  const [nftDataApi, setNftDataApi] = useState();
  const [collectionFloorPriceApiData, setCollectionFloorPriceApiData] =
    useState();
  const [transferNftDataApi, setTransferNftDataApi] = useState();
  const [nftsSalesDataApi, setNftsSalesDataApi] = useState();
  const [ethPrice, setEthPrice] = useState(""); // API CoinGecko
  const [totalOwnersForContract, setTotalOwnersForContract] = useState();
  const [nftsFromCollection, setNftsFromCollection] = useState();
  // Backend
  const [collectionBackendData, setCollectionBackendData] = useState([]);
  const [athleteDisplayName, setAthleteDisplayName] = useState([]);
  // Fetch url info
  const location = useLocation();
  const segments = location.pathname.split("/");
  const collectionAddress = segments[2];
  // Api Alchemy setup
  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };
  const alchemy = new Alchemy(settings);
  async function getNft() {
    const metadata = await alchemy.nft.getContractMetadata(
      "0x5180db8F5c931aaE63c74266b211F580155ecac8"
    );
    const dataCollection = await alchemy.nft.getNftsForContract(
      "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258"
    );
    const contractFromOwners = await alchemy.nft.getContractsForOwner(
      "0xaBA7161A7fb69c88e16ED9f455CE62B791EE4D03"
    ); // BoredApe creator adress (not the contract)
    const nfts = await alchemy.nft.getNftsForOwner("vitalik.eth");
    setNftDataApi(nfts);
    // console.log(nfts);
  }

  // getFloorprice for Bored Ape Yacht Club:
  async function getCollectionFloorPrice() {
    const alchemy = new Alchemy(settings);
    const collectionFloorPrice = await alchemy.nft.getFloorPrice(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    );
    // console.log(collectionFloorPrice.openSea.floorPrice)
    setCollectionFloorPriceApiData(collectionFloorPrice.openSea.floorPrice);
  }

  // get Nfts from Owner and Contracts
  async function getNftsForOwner() {
    // we select all the nfts hold by an address for a specific collection
    const nftsFromOwner = await alchemy.nft.getNftsForOwner(
      "0xf2018871debce291588B4034DBf6b08dfB0EE0DC",
      {
        contractAddresses: [
          "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258",
          "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        ],
      } // filter
    );
    const nftsSale = await alchemy.nft.getFloorPrice(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    );
    setNftsFromOwner(nftsFromOwner?.ownedNfts);
    // console.log(nftsFromOwner?.ownedNfts)
  }
  async function getTransferData() {
    const nftsTransferData = await alchemy.core.getAssetTransfers({
      toAddress: "0xf2018871debce291588B4034DBf6b08dfB0EE0DC",
      excludeZeroValue: true,
      category: ["erc721", "erc1155"],
      contractAddresses: [
        "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258",
        "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      ],
      withMetadata: true,
    });

    setTransferNftDataApi(nftsTransferData);
  }
  async function getNftMinted() {
    const nftsTransferData = await alchemy.core.getAssetTransfers({
      fromAddress: "0x0000000000000000000000000000000000000000",
      contractAddresses: [
        // "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258",

        "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      ],
      excludeZeroValue: true,
      category: ["erc721", "erc1155"],
      // pageKey:"31a37a38-7ff0-4094-9ab3-1fb744166171"
    });
    // console.log(nftsTransferData.pageKey )
  }
  async function getOwnersForContractFunction() {
    const address = collectionAddress;
    const response = await alchemy.nft.getOwnersForContract(address);
    console.log(response);
    setTotalOwnersForContract(response);
  }
  async function getNftsForContractFunction() {
    const response = await alchemy.nft.getNftsForContract(collectionAddress);

    //Logging the response to the console
    // console.log("response ---> ",response?.nfts);
    setNftsFromCollection(response?.nfts)
  }
  useEffect(() => {
    // getNft();
    // getCollectionFloorPrice();
    // getNftsForOwner();
    // getTransferData();
    // console.log(nftsFromOwner[0]?.contract?.totalSupply);
    // console.log(nftsFromOwner.length)
    // getNftMinted();
    getOwnersForContractFunction();
    getNftsForContractFunction();
  }, []);

  // API Coingecko --> Get ETH price
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []); // API Coingecko --> Get ETH price
  useEffect(() => {
    const data = {
      collected: [
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
        },
        {
          athleteName: "Alexia Barrier",
          nftTitle:
            "Explore the World with Alexia Barrier Explore the World with Alexia Barrier",
          nftId: "#393",
          img: "https://i.imgur.com/6UKdMup.png",
          nftPriceEth: "0.50009854",
          bid: "0.7592845864",
        },
      ],
      collections: [
        {
          athleteName: "Alexia Barrier",
          collectionName: "Explore the world with Alexia Barrier",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere tellus vehicula leo iaculis luctus. Ut vulputate elit risus, eget faucibus justo consectetur in.",
          banner: "https://i.imgur.com/6ozImSk.png",
          profilePicture: "https://i.imgur.com/grRujbB.png",
          socials: {
            discord: "https://discord.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
          },
          floorPrice: "0.3",
          AveragePrice: "0.91",
          Owners: "7291",
          Volume: "19234",
        },
      ],
      activities: [
        {
          function: "Buy",
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.500098484874",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          function: "Mint",
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.500098484874",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          function: "Transferts",
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.500098484874",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
      ],
    };
    function concatStringFromTo(
      string,
      maxLentgth,
      from0To_NUMBER_,
      isDotDotDot,
      isEnd
    ) {
      if (string.length > maxLentgth) {
        const stringBegin = string.slice(0, from0To_NUMBER_);
        const dotDotDot = "...";
        const stringEnd = string.slice(string.length - 3, string.length);
        if (!isDotDotDot && !isEnd) {
          return stringBegin;
        } else if (isDotDotDot && !isEnd) {
          return stringBegin + dotDotDot;
        } else if (isDotDotDot && isEnd) {
          return stringBegin + dotDotDot + stringEnd;
        } else {
          return string;
        }
      } else {
        return string;
      }
    }
    // Boucle pour Collected NFT
    for (let i = 0; i < data.collected.length; i++) {
      data.collected[i].nftTitle = concatStringFromTo(
        data?.collected[i]?.nftTitle,
        58,
        58,
        true,
        false
      );
      data.collected[i].nftPriceEth = concatStringFromTo(
        data?.collected[i]?.nftPriceEth,
        7,
        7,
        false,
        false
      );
      data.collected[i].bid = concatStringFromTo(
        data?.collected[i]?.bid,
        7,
        7,
        false,
        false
      );
      delete data.collected[i].athleteName;
    }
    // Boucle pour activities
    for (let i = 0; i < data.activities.length; i++) {
      data.activities[i].from = concatStringFromTo(
        data?.activities[i]?.from,
        9,
        4,
        true,
        true
      );
      data.activities[i].nftTitle = concatStringFromTo(
        data?.activities[i]?.nftTitle,
        25,
        25,
        true,
        false
      );
      data.activities[i].to = concatStringFromTo(
        data?.activities[i].to,
        9,
        4,
        true,
        true
      );
      data.activities[i].nftPriceEth = concatStringFromTo(
        data?.activities[i]?.nftPriceEth,
        7,
        7,
        false,
        false
      );
      data.activities[i].function = concatStringFromTo(
        data?.activities[i]?.function,
        7,
        7,
        false,
        false
      );
    }

    setDataConcat(data);
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const nftCollections = collection(db, "nft_collections");
  //     const q = query(
  //       nftCollections,
  //       where("collection_address", "==", collectionAddress)
  //     );

  //     const querySnapshot = await getDocs(q);

  //     const data = querySnapshot.docs.map((doc) => {
  //       return {
  //         collection_avatar: doc.data().collection_avatar,
  //         collection_banner: doc.data().collection_banner,
  //         athlete_id: doc.data().athlete_id,
  //       };
  //     });

  //     setCollectionBackendData(data);
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      // Première requête pour obtenir les données de nft_collections
      const nftCollections = collection(db, "nft_collections");
      const nftQuery = query(
        nftCollections,
        where("collection_address", "==", collectionAddress)
      );

      const nftQuerySnapshot = await getDocs(nftQuery);

      const nftData = nftQuerySnapshot.docs.map((doc) => {
        return {
          collection_avatar: doc.data().collection_avatar,
          collection_banner: doc.data().collection_banner,
          collection_title: doc.data().collection_title,
          collection_description: doc.data().collection_description,
          athlete_id: doc.data().athlete_id, // Supposons que chaque doc ait un champ athlete_id
        };
      });

      setCollectionBackendData(nftData);

      // Deuxième requête pour obtenir les données de users
      const usersCollection = collection(db, "users");
      const userQueries = nftData.map(({ athlete_id }) => {
        const userQuery = query(usersCollection, where("id", "==", athlete_id));
        return getDocs(userQuery);
      });

      const userQuerySnapshots = await Promise.all(userQueries);

      const userData = userQuerySnapshots.map((snapshot) => {
        return snapshot.docs.map((doc) => {
          return { display_name: doc.data().display_name };
        })[0]; // On prend le premier élément car id est unique
      });

      setAthleteDisplayName(userData);
    };

    fetchData();
  }, [collectionAddress]);
  const displayNftCollectionProfileSubMenu = () => {
    if (isProfileSubMenuButtonClicked[0] === true) {
      return (
        <div>
          {/* <SortBySelector
            setIsUSerProfileSeortBySelectorClicked={
              setIsUSerProfileSeortBySelectorClicked
            }
            isUSerProfileSeortBySelectorClicked={
              isUSerProfileSeortBySelectorClicked
            }
          /> */}
          <NftCard
            hidePrice={true}
            nftsFromOwner={nftsFromOwner}
            userFrom={dataConcat?.collected}
            isNftSpam={nftsFromOwner?.spamInfo?.isSpam}
            nftsFromCollection={nftsFromCollection}
            isNftCollectionPage={true}
          />
        </div>
      );
    } else if (isProfileSubMenuButtonClicked[1] === true) {
      return (
        <UserActivity
          userFrom={dataConcat?.activities}
          nftsFromOwner={nftsFromOwner}
          transferNftDataApi={transferNftDataApi}
          setTransferNftDataApi={setTransferNftDataApi}
          ethPrice={ethPrice}
        />
      );
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="nftcollection-page">
      <div>
        <NftCollectionPageHeader
          hidePrice={true}
          collectionInfo={dataConcat?.collections[0]}
          collectionFloorPriceApiData={collectionFloorPriceApiData}
          ethPrice={ethPrice}
          collectionBackendData={collectionBackendData}
          athleteDisplayName={athleteDisplayName}
          totalOwnersForContract={totalOwnersForContract}
        />
        <ProfileSubMenu
          isProfileSubMenuButtonClicked={isProfileSubMenuButtonClicked}
          setIsProfileSubMenuButtonClicked={setIsProfileSubMenuButtonClicked}
          isNftCollectionPage={true}
        />
        {displayNftCollectionProfileSubMenu()}
      </div>
    </div>
  );
};

export default NftCollection;

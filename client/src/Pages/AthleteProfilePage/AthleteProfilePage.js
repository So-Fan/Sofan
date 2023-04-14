import React, { useRef ,useState, useEffect } from "react";
import AthleteProfileEvent from "../../Components/AthleteProfileEvent/AthleteProfileEvent";
import AthleteProfileHeader from "../../Components/AthleteProfileHeader/AthleteProfileHeader";
import AthleteProfileNFTCollection from "../../Components/AthleteProfileNFTCollection/AthleteProfileNFTCollection";
import NftCard from "../../Components/NftCard/NftCard";
import ProfileSubMenu from "../../Components/ProfileSubMenu/ProfileSubMenu";
import SortBySelector from "../../Components/SortBySelector/SortBySelector";
import FormulatedOffers from "../../Components/UserProfileComponents/FormulatedOffers/FormulatedOffers";
import ReceivedOffers from "../../Components/UserProfileComponents/ReceivedOffers/ReceivedOffers";
import UserActivity from "../../Components/UserProfileComponents/UserActivity/UserActivity";
import AthleteProfileFeed from "../../Components/AthleteProfileFeed/AthleteProfileFeed";
import { Network, Alchemy } from "alchemy-sdk";
import "./AthleteProfilePage.css";
import Modal from "../../Components/Modal/Modal";
import AthleteFollowersFansPopUp from "../../Components/TemplatePopUp/AthleteFollowersFansPopUp/AthleteFollowersFansPopUp";
import AthleteProfileRanking from "../../Components/AthleteProfileRanking/AthleteProfileRanking";
const AthleteProfilePage = ({
  setIsUSerProfileSeortBySelectorClicked,
  isUSerProfileSeortBySelectorClicked,
  profileSubMenuOffresClicked,
  setProfileSubMenuOffresClicked,
}) => {
  // functionnal states
  const [isAthleteProfileSubMenuClicked, setIsAthleteProfileSubMenuClicked] =
    useState([false, false, false, false, true, false, false]);
  const [isAthleteFollowersClicked, setIsAthleteFollowersClicked] =
    useState(false);
  const [isAthleteSupportersClicked, setIsAthleteSupportersClicked] =
    useState(false);
    const [isPalmaresButtonClicked, setIsPalmaresButtonClicked] = useState(false);
  // Backend
  const [dataConcat, setDataConcat] = useState({ athletes: [{}] });
  // API Alchemy
  const [nftDataApi, setNftDataApi] = useState();
  const [collectionFloorPriceApiData, setCollectionFloorPriceApiData] =
    useState();
  const [nftsFromOwner, setNftsFromOwner] = useState([]);
  const [transferNftDataApi, setTransferNftDataApi] = useState();
  const [fansCounterApi, setFansCounterApi] = useState();
  // API CoinGecko
  const [ethPrice, setEthPrice] = useState("");

  // Api Alchemy setup
  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_MAINNET,
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
    const nfts = await alchemy.nft.getNftsForOwner("nic.eth");
    setNftDataApi(nfts);
  }

  // getFloorprice for Bored Ape Yacht Club:
  async function getCollectionFloorPrice() {
    const alchemy = new Alchemy(settings);
    const collectionFloorPrice = await alchemy.nft.getFloorPrice(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" // BAYC collection
    );
    setCollectionFloorPriceApiData(collectionFloorPrice.openSea.floorPrice);
  }

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
  async function getOwnersForContract() {
    // Mettre une boucle pour récupérer toutes les collections de l'athlete pour mettre le compteurs de fans à jour
    const owners = await alchemy.nft.getOwnersForContract(
      "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258"
    );
    setFansCounterApi(owners?.owners?.length);
  }
  useEffect(() => {
    getNft();
    getCollectionFloorPrice();
    getNftsForOwner();
    getTransferData();
    getOwnersForContract();
  }, []);
  // api NFT Scan YE9mfre8aVCBFPjA3Ia0JIXA
  // API Coingecko --> Get ETH price
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []);

  // -------------------------------------
  useEffect(() => {
    const data = {
      userPageInfo: {
        username: "Romain Attanasio",
        fan: "150",
        followers: "300",
        nftAvailable: "138",
        sport: "Skipper",
        socials: {
          discord: "https://discord.com",
          twitter: "https://twitter.com",
          instagram: "https://instagram.com",
        },
        banner: "https://i.imgur.com/6ozImSk.png",
        profilePicture: "https://i.imgur.com/StsunkC.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere tellus vehicula leo iaculis luctus. Ut vulputate elit risus, eget faucibus justo consectetur in.",
      },
      received: [
        {
          from: "DonOfSomething",
          nftTitle: "Explore the World with Alexia",
          nftId: "#393",
          nftPriceEth: "0.50009",
          date: "1 hours ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          from: "AlexiaBarrier",
          nftTitle: "Explore the World with Voile",
          nftId: "#394",
          nftPriceEth: "0.80",
          date: "4 years ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
      ],
      made: [
        {
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.50009",
          from: "you",
          to: "Alexia Barrier",
          status: "Pending",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
        {
          nftTitle: "Explore the World with Voile",
          nftId: "#394",
          nftPriceEth: "0.808447444",
          from: "you",
          to: "Alexia Barrier",
          status: "Pending",
          date: "4 years ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
      ],
      activities: [
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
          function: "Mint",
          nftTitle: "Explore the World with Alexia Barrier",
          nftId: "#393",
          nftPriceEth: "0.50009",
          from: "0x388C818CA8B9251b393131C08a736A67ccB19297",
          to: "Gr3goir3",
          date: "5 months ago",
          nftImg: "https://i.imgur.com/BrRKHpT.png",
        },
      ],
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
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
      ],
      events: [
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: "14 dec. 2022 - 9:00pm",
        },
      ],
      athletes: [
        {
          postName: "Romain Attanasio",
          postPicture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg/420px-Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg",
          postDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          postDate: 37,
          postDateType: "min",
          postType: "Free",
          postLikeNumber: 29,
          postCommentNumber: 10,
        },
        {
          postName: "Romain Attanasio",
          postDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          postPicture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg/420px-Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg",
          postDate: 2,
          postDateType: "h",
          postType: "Premium",
          postLikeNumber: 29,
          postCommentNumber: 10,
        },
        {
          postName: "Romain Attanasio",
          postDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          postPicture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg/420px-Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg",
          postDate: 2,
          postDateType: "h",
          postType: "Free",
          postLikeNumber: 29,
          postCommentNumber: 10,
        },
        {
          postName: "Romain Attanasio",
          postDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          postPicture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg/420px-Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg",
          postDate: 3,
          postDateType: "h",
          postType: "Free",
          postLikeNumber: 29,
          postCommentNumber: 10,
        },
        {
          postName: "Romain Attanasio",
          postDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          postPicture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg/420px-Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg",
          postDate: 4,
          postDateType: "h",
          postType: "Premium",
          postLikeNumber: 29,
          postCommentNumber: 10,
        },
        {
          postName: "Romain Attanasio",
          postDescription:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          postPicture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg/420px-Vend%C3%A9e_Globe_2016_-_Romain_Attanasio_(30880347105).jpg",
          postDate: 9,
          postDateType: "d",
          postType: "Premium",
          postLikeNumber: 29,
          postCommentNumber: 10,
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
    // Boucle pour received
    for (let i = 0; i < data.received.length; i++) {
      data.received[i].from = concatStringFromTo(
        data?.received[i]?.from,
        9,
        4,
        true,
        true
      );
      data.received[i].nftTitle = concatStringFromTo(
        data?.received[i]?.nftTitle,
        28,
        29,
        true,
        false
      );
      data.received[i].to = concatStringFromTo(
        data.userPageInfo.username,
        9,
        4,
        true,
        true
      );
      data.received[i].nftPriceEth = concatStringFromTo(
        data?.received[i]?.nftPriceEth,
        7,
        7,
        false,
        false
      );
    }
    // Boucle pour made
    for (let i = 0; i < data.made.length; i++) {
      data.made[i].from = concatStringFromTo(
        data?.made[i]?.from,
        9,
        4,
        true,
        true
      );
      data.made[i].nftTitle = concatStringFromTo(
        data?.made[i]?.nftTitle,
        28,
        29,
        true,
        false
      );
      data.made[i].to = concatStringFromTo(data?.made[i].to, 9, 4, true, true);
      data.made[i].nftPriceEth = concatStringFromTo(
        data?.made[i]?.nftPriceEth,
        7,
        7,
        false,
        false
      );
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
        5,
        5,
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
    }
    setDataConcat(data);
  }, []);
  function handleAthleteFollowersClick(e) {
    setIsAthleteFollowersClicked(true);
  }
  function handleAthleteSupportersClick(e) {
    setIsAthleteSupportersClicked(true);
  }
  function handlePalmaresButtonClick() {
    setIsPalmaresButtonClicked(true)
  }
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  }, []);
  // retirer le scroll lock lorsque le modal n'est plus la
  document.querySelector("body").classList.remove("scroll-lock");
  // ============================================================
  // Récupérer la valeur de pixel scrollé pour ensuite faire afficher le modal au bon endroit
  const [pixelScrolledAthleteProfilePage, setPixelScrolledAthleteProfilePage] =
    useState();
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
  // ============================================================
  // smooth redirection fonction
  const athletesNftsAvailable = useRef(null);
  function handleClickNftReceived(event) {
    event.preventDefault();
    athletesNftsAvailable.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  function handleClicNftsAvailable() {
    setIsAthleteProfileSubMenuClicked([
      false,
      false,
      false,
      false,
      false,
      true,
      false,
    ]);
  }
  // retirer le scroll lock lorsque le modal n'est plus la
  document.querySelector("body").classList.remove("scroll-lock");
  const displayAthleteProfileSubMenu = () => {
    if (isAthleteProfileSubMenuClicked[4] === true) {
      return (
        <AthleteProfileFeed
          athleteProfilePageStyling={true}
          dataPosts={dataConcat?.athletes}
        />
      );
    } else if (isAthleteProfileSubMenuClicked[5] === true) {
      return (
        <AthleteProfileNFTCollection
          nftsFromOwner={nftsFromOwner}
          nftDataApi={nftDataApi} // pas utilisé pour l'instant
          collectionFloorPriceApiData={collectionFloorPriceApiData}
          dataCollections={dataConcat?.collections}
          hidePrice={true}
        />
      );
    } else if (isAthleteProfileSubMenuClicked[6] === true) {
      return <AthleteProfileEvent dataEvents={dataConcat?.events} />;
    } else if (isAthleteProfileSubMenuClicked[0] === true) {
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
            athletesNftsAvailable={athletesNftsAvailable}
          />
        </div>
      );
    } else if (isAthleteProfileSubMenuClicked[1] === true) {
      return (
        <UserActivity
          isUserActivitySectionActive={true}
          userFrom={dataConcat?.activities}
          nftsFromOwner={nftsFromOwner}
          transferNftDataApi={transferNftDataApi}
          setTransferNftDataApi={setTransferNftDataApi}
          ethPrice={ethPrice}
        />
      );
    } else if (isAthleteProfileSubMenuClicked[2] === true) {
      return (
        <div className="athleteprofilepage-formulatedoffers-wrap">
          <FormulatedOffers
            userFrom={dataConcat?.made}
            nftsFromOwner={nftsFromOwner}
            transferNftDataApi={transferNftDataApi}
            ethPrice={ethPrice}
          />
        </div>
      );
    } else if (isAthleteProfileSubMenuClicked[3] === true) {
      return (
        <div className="athleteprofilepage-formulatedoffers-wrap">
          <ReceivedOffers
            userFrom={dataConcat?.received}
            nftsFromOwner={nftsFromOwner}
            transferNftDataApi={transferNftDataApi}
            ethPrice={ethPrice}
          />
        </div>
      );
    }
  };
  return (
    <>
      <div className="athleteprofilepage-component">
        <AthleteProfileHeader
          userInfo={dataConcat?.userPageInfo}
          fansCounterApi={fansCounterApi}
          setIsAthleteFollowersClicked={setIsAthleteFollowersClicked}
          handleAthleteFollowersClick={handleAthleteFollowersClick}
          handleAthleteSupportersClick={handleAthleteSupportersClick}
          handleClickNftReceived={handleClickNftReceived}
          handleClicNftsAvailable={handleClicNftsAvailable}
          handlePalmaresButtonClick={handlePalmaresButtonClick}
        />
        <div className="athleteprofilepage-profilesubmenu-wrap">
          <ProfileSubMenu
            isPageAthlete={true}
            isProfileSubMenuButtonClicked={isAthleteProfileSubMenuClicked}
            setIsProfileSubMenuButtonClicked={setIsAthleteProfileSubMenuClicked}
            profileSubMenuOffresClicked={profileSubMenuOffresClicked}
            setProfileSubMenuOffresClicked={setProfileSubMenuOffresClicked}
          />
        </div>
        {displayAthleteProfileSubMenu()}
      </div>
      {isAthleteFollowersClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          setState={setIsAthleteFollowersClicked}
          style={{ marginTop: pixelScrolledAthleteProfilePage }}
        >
          <AthleteFollowersFansPopUp
            isAthleteFollowersClicked={isAthleteFollowersClicked}
          />
        </Modal>
      )}
      {isAthleteSupportersClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          setState={setIsAthleteSupportersClicked}
          style={{marginTop: pixelScrolledAthleteProfilePage}}
        >
          <AthleteFollowersFansPopUp
            isAthleteSupportersClicked={isAthleteSupportersClicked}
          />
        </Modal>
      )}
      {isPalmaresButtonClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          setState={setIsPalmaresButtonClicked}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ display: "none"}}
        >
          <AthleteProfileRanking
          // isPalmaresButtonClicked={isPalmaresButtonClicked}

          />
        </Modal>
      )}
    </>
  );
};

export default AthleteProfilePage;

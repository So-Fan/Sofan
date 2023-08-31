import React, { useRef, useState, useEffect, memo } from "react";
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
import settingsLogo from "../../Assets/Image/settings-logo.svg";
import Modal from "../../Components/Modal/Modal";
import AthleteFollowersFansPopUp from "../../Components/TemplatePopUp/AthleteFollowersFansPopUp/AthleteFollowersFansPopUp";
import AthleteProfileRanking from "../../Components/AthleteProfileRanking/AthleteProfileRanking";
import PopUpConfirmationOffer from "../../Components/PopUpConfirmationOffer/PopUpConfirmationOffer";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Configs/firebase";
import { useParams } from "react-router-dom";
import { getStorage, ref, getMetadata } from "firebase/storage";
import EditProfilePopUp from "../../Components/EditProfilePopUp/EditProfilePopUp";
import PopUpEditProfile from "../../Components/PopUpEditProfile/PopUpEditProfile";
import useUserCollection from "../../contexts/UserContext/useUserCollection";
import useEth from "../../contexts/EthContext/useEth";
import PopUpValidate from "../../Components/PopUpValidate/PopUpValidate";

const MemoProfileSubMenu = memo(ProfileSubMenu);
const MemoAthleteProfileHeader = memo(AthleteProfileHeader);
const MemoAthleteProfileFeed = memo(
  AthleteProfileFeed,
  (prevProps, nextProps) => {
    if (prevProps === nextProps) {
      return true;
    }
    return false;
  }
);
const AthleteProfilePage = ({
  setIsUSerProfileSeortBySelectorClicked,
  isUSerProfileSeortBySelectorClicked,
  // profileSubMenuOffresClicked,
  // setProfileSubMenuOffresClicked,
}) => {
  // functionnal states
  const [isAthleteProfileSubMenuClicked, setIsAthleteProfileSubMenuClicked] =
    useState([false, false, false, false, true, false, false]);
  // const [isAthleteFollowersClicked, setIsAthleteFollowersClicked] =
  //   useState(false);
  // const [isAthleteSupportersClicked, setIsAthleteSupportersClicked] =
  //   useState(false);
  // const [isPalmaresButtonClicked, setIsPalmaresButtonClicked] = useState(false);
  const [isAcceptedOffersClicked, setIsAcceptedOffersClicked] = useState(false);
  const [isRejectedOffersClicked, setIsRejectedOffersClicked] = useState(false);
  const [isCanceledOffersClicked, setIsCanceledOffersClicked] = useState(false);
  // const [isSettingsAthletePageClicked, setSettingsAthletePageClicked] =
  //   useState(false);
  // popup states info
  const [dataPopupConfirmation, setDataPopupConfirmation] = useState([]);
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
  const [userInfo, setUserInfo] = useState(null);
  const { id } = useParams();

  // const setProfileSubMenuOffresClicked = () => {
  //   console.log("amagnacouuuuunia");
  // }
  // const profileSubMenuOffresClicked= true

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"), where("id", "==", id)); // Use the correct parameter name here
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userInfo = doc.data();
          const AllUserInfo = {
            ...userInfo,
          };
          // Do something with the user info
          setUserInfo(AllUserInfo);
        });
      } else {
        // Handle case when no user is found with the given ID
        console.log("No user found");
      }
    };

    fetchData();
  }, [id]);
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
    try {
      const alchemy = new Alchemy(settings);
      const collectionFloorPriceOne = await alchemy.nft.getFloorPrice(
        ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"]
        // BAYC collection
      );
      setCollectionFloorPriceApiData(
        collectionFloorPriceOne.openSea.floorPrice
      );
    } catch (err) {
      console.error(err);
    }
  }
  // console.log(collectionFloorPriceApiData);
  // get Nfts from Owner and Contracts
  async function getNftsForOwner() {
    // we select all the nfts hold by an address for a specific collection
    const nftsFromOwner = await alchemy.nft.getNftsForOwner(
      "0xf2018871debce291588B4034DBf6b08dfB0EE0DC",
      {
        contractAddresses: [
          "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e", // Doodles
          // "0x5CC5B05a8A13E3fBDB0BB9FcCd98D38e50F90c38", // Sandbox
          "0x60E4d786628Fea6478F785A6d7e704777c86a7c6", // MutantApe
          "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258",
          "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", // BoredApe
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
    try {
      getNft();
      getCollectionFloorPrice();
      getNftsForOwner();
      getTransferData();
      getOwnersForContract();
    } catch (err) {
      console.log(err);
    }
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
        banner:
          "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/feed_post_img%2FbannerUserProfile.png?alt=media&token=3d74cbd8-399c-4522-8757-b4c42f39937b",
        profilePicture:
          "/static/media/profilepicattanasio.2693ecb7f0a2a6aa2ade6dd93ae2eaae.svg",
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
          date: 1705807109000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1660582800000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1683256709000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1660582800000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1705807109000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1683256709000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1660582800000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1660582800000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1683256709000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1660582800000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1705807109000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1705807109000,
        },
        {
          background: "https://i.imgur.com/I66BDmh.png",
          title: "VIP MEETING WITH 1200 HOLDERS ",
          location: "Paris, France",
          date: 1895807109000,
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

  function handleAcceptOffersClick(
    nftsFromOwnerImage,
    nftsFromOwnerNameCollection,
    nftsFromOwnerIdNft,
    receivedFrom,
    nftTransferDate
  ) {
    setIsAcceptedOffersClicked(true);
    const newConfirmation = {
      nftsFromOwnerImage,
      nftsFromOwnerNameCollection,
      nftsFromOwnerIdNft,
      receivedFrom,
      nftTransferDate,
    };

    setDataPopupConfirmation((prevConfirmation) => [
      ...prevConfirmation,
      newConfirmation,
    ]);
  }
  // récupérer les données de l'élément cliqué
  function handleRejectedOffersClick(
    nftsFromOwnerImage,
    nftsFromOwnerNameCollection,
    nftsFromOwnerIdNft,
    receivedFrom,
    nftTransferDate
  ) {
    setIsRejectedOffersClicked(true);
    const newConfirmation = {
      nftsFromOwnerImage,
      nftsFromOwnerNameCollection,
      nftsFromOwnerIdNft,
      receivedFrom,
      nftTransferDate,
    };

    setDataPopupConfirmation((prevConfirmation) => [
      ...prevConfirmation,
      newConfirmation,
    ]);
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

  const athletesNftsAvailable = useRef(null);
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

  console.log("Triggered from athletePage");

  const {
    state: { web3, accounts },
    marketplaceAddress,
  } = useEth();
  const [mintPopUpProccesing, setMintPopUpProccesing] = useState(false);
  const [isBlockchainError, setIsBlockchainError] = useState(false);
  const [blockchainError, setBlockchainError] = useState(false);
  const [isAcceptedOffers, setIsAcceptedOffers] = useState(false);

  const handleAcceptedConfirmationOffer = async () => {
    // TODO: Si pas connecté alors le bouton affiche un popup pour demander de sign up ou sign in
    console.log("Bouton Accepté cliqué");

    const artifacts = require("../../contracts/Sofan.json");
    const { abi } = artifacts;
    const web3MarketplaceInstance = new web3.eth.Contract(
      abi,
      marketplaceAddress
    );
    console.log(web3MarketplaceInstance);
    // console.log(typeof contract._address);
    let contractAddress = "0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a";
    let currentNftTokenId = 0;
    let bidListing = 0;
    try {
      setMintPopUpProccesing(true);
      // param 1: address of nft contract 2: nft tokenId 3: bidListing
      const result = await web3MarketplaceInstance.methods
        .acceptBid(contractAddress, currentNftTokenId, bidListing)
        .send({ from: accounts[0] });
      if (result.status) {
        console.log("Successfully accepted offer");
        setMintPopUpProccesing(false);
        setIsAcceptedOffers(true); // c'est qui
      } else {
        console.log("An error has occured. Please try again. ", result);
        setMintPopUpProccesing(false);
        // setIsListed(false);
        setIsBlockchainError(true);
        setBlockchainError(result.message); // TODO: A vérifier si la clé est bien nommée message
      }
    } catch (error) {
      console.log(error);
      setBlockchainError(error.message);
      setMintPopUpProccesing(false);
      setIsBlockchainError(true);
      // setIsListed(false);
    }
  };
  const handleAcceptedOffersClosed = () => {
    setIsAcceptedOffers(false);
    setIsAcceptedOffersClicked(false);
  };

  // Debut Cancel --------------------------------------------------------------------------------------------------------------------------------

  const [isCanceledOffers, setIsCanceledOffers] = useState(false);

  const handleCanceledOffer = async () => {
    // TODO: Si pas connecté alors le bouton affiche un popup pour demander de sign up ou sign in
    console.log("Bouton cancel cliqué");

    const artifacts = require("../../contracts/Sofan.json");
    const { abi } = artifacts;
    const web3MarketplaceInstance = new web3.eth.Contract(
      abi,
      marketplaceAddress
    );
    console.log(web3MarketplaceInstance);
    // console.log(typeof contract._address);
    let contractAddress = "0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a";
    let currentNftTokenId = 0;
    let receiver = "0x6a60b9D963623AFf1E947D1f6c8a5eC6CF7EdC7B";
    let bidListing = 0;
    try {
      setMintPopUpProccesing(true);
      // param 1: address of nft contract 2: nft tokenId 3: bidListing
      const result = await web3MarketplaceInstance.methods
        .cancelBid(contractAddress, currentNftTokenId, receiver, bidListing)
        .send({ from: accounts[0] });
      if (result.status) {
        console.log("Successfully cancel offer");
        setMintPopUpProccesing(false);
        setIsCanceledOffers(true);
      } else {
        console.log("An error has occured. Please try again. ", result);
        setMintPopUpProccesing(false);
        setIsBlockchainError(true);
        setBlockchainError(result.message); // TODO: A vérifier si la clé est bien nommée message
      }
    } catch (error) {
      console.log(error);
      setBlockchainError(error.message);
      setMintPopUpProccesing(false);
      setIsBlockchainError(true);
    }
  };
  const handleCanceledOffersClosed = () => {
    setIsCanceledOffers(false);
    setIsCanceledOffersClicked(false);
  };
  // Fin Cancel --------------------------------------------------------------------------------------------------------------------------------
  // TODO: créer useEffect comme dans NftSingle
  const handleRejectedConfirmationOffer = async () => {
    // TODO: Ajouter les données de l'offre refusé au backend lié à l'utilisateur qui a rejeté l'offre.
  };
  return (
    <>
      <div className="athleteprofilepage-component">
        {/* <div className="athleteprofilepage-wrap"> */}
        <MemoAthleteProfileHeader
          userInfo={userInfo}
          fansCounterApi={fansCounterApi}
          // setIsAthleteFollowersClicked={setIsAthleteFollowersClicked}
          // handleAthleteFollowersClick={handleAthleteFollowersClick}
          // handleAthleteSupportersClick={handleAthleteSupportersClick}
          // handleClickNftReceived={handleClickNftReceived}
          handleClicNftsAvailable={handleClicNftsAvailable}
          // handlePalmaresButtonClick={handlePalmaresButtonClick}
          // setSettingsAthletePageClicked={setSettingsAthletePageClicked}
          // handleSettingsAthletePageClick={handleSettingsAthletePageClick}
          // pixelScrolledAthleteProfilePage={pixelScrolledAthleteProfilePage}
        />
        <div className="athleteprofilepage-profilesubmenu-wrap">
          <MemoProfileSubMenu
            isPageAthlete={true}
            isProfileSubMenuButtonClicked={isAthleteProfileSubMenuClicked}
            setIsProfileSubMenuButtonClicked={setIsAthleteProfileSubMenuClicked}
            // profileSubMenuOffresClicked={profileSubMenuOffresClicked}
            // setProfileSubMenuOffresClicked={setProfileSubMenuOffresClicked}
          />
        </div>
        {/* {displayAthleteProfileSubMenu()} */}
        {isAthleteProfileSubMenuClicked[4] === true ? (
          <MemoAthleteProfileFeed
            athleteProfilePageStyling={true}
            //dataPosts={dataConcat?.athletes}
            athleteUserId={id}
            athleteName={userInfo?.display_name}
            athleteAvatar={userInfo?.profile_avatar}
          />
        ) : isAthleteProfileSubMenuClicked[5] === true ? (
          <AthleteProfileNFTCollection
            nftsFromOwner={nftsFromOwner}
            nftDataApi={nftDataApi} // pas utilisé pour l'instant
            collectionFloorPriceApiData={collectionFloorPriceApiData}
            dataCollections={dataConcat?.collections}
            hidePrice={true}
            athleteId={id}
          />
        ) : isAthleteProfileSubMenuClicked[6] === true ? (
          <AthleteProfileEvent dataEvents={dataConcat?.events} />
        ) : isAthleteProfileSubMenuClicked[0] === true ? (
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
        ) : isAthleteProfileSubMenuClicked[1] === true ? (
          <UserActivity
            isUserActivitySectionActive={true}
            userFrom={dataConcat?.activities}
            nftsFromOwner={nftsFromOwner}
            transferNftDataApi={transferNftDataApi}
            setTransferNftDataApi={setTransferNftDataApi}
            ethPrice={ethPrice}
          />
        ) : isAthleteProfileSubMenuClicked[2] === true ? (
          <div className="athleteprofilepage-formulatedoffers-wrap">
            <FormulatedOffers
              userFrom={dataConcat?.made}
              nftsFromOwner={nftsFromOwner}
              transferNftDataApi={transferNftDataApi}
              ethPrice={ethPrice}
            />
          </div>
        ) : (
          isAthleteProfileSubMenuClicked[3] === true && (
            <div className="athleteprofilepage-formulatedoffers-wrap">
              <ReceivedOffers
                userFrom={dataConcat?.received}
                nftsFromOwner={nftsFromOwner}
                transferNftDataApi={transferNftDataApi}
                ethPrice={ethPrice}
                handleAcceptOffersClick={handleAcceptOffersClick}
                handleRejectedOffersClick={handleRejectedOffersClick}
                // handleOffersChoice={handleOffersChoice}
                // setDataPopupConfirmation={setDataPopupConfirmation}
              />
            </div>
          )
        )}
        {/* </div> */}
      </div>
      {isAcceptedOffersClicked && (
        <Modal
          dynamicPositionPopUpMargin={`${window.scrollY}px`}
          setState={setIsAcceptedOffersClicked}
          setState2={setIsBlockchainError}
          setState3={setIsAcceptedOffers}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ display: "none" }}
        >
          {isAcceptedOffers ? (
            <PopUpValidate
              text={"Félicitations ! L'offre a bien été accepté"}
              customWidth={"260px"}
              onClick={handleAcceptedOffersClosed}
            />
          ) : (
            <PopUpConfirmationOffer
              isAcceptedOffersClicked={isAcceptedOffersClicked}
              handleClick={handleAcceptedConfirmationOffer}
              mintPopUpProccesing={mintPopUpProccesing}
              isBlockchainError={isBlockchainError} // change l'affichage
              blockchainError={blockchainError} // message.error
              setIsBlockchainError={setIsBlockchainError}
              setIsStatusClicked={setIsAcceptedOffersClicked}
            />
          )}
        </Modal>
      )}
      {isCanceledOffersClicked && (
        <Modal
          dynamicPositionPopUpMargin={`${window.scrollY}px`}
          setState={setIsCanceledOffersClicked}
          setState2={setIsBlockchainError}
          setState3={setIsCanceledOffers}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ display: "none" }}
        >
          {isCanceledOffers ? (
            <PopUpValidate
              text={"Félicitations ! L'offre a bien été annulé"}
              customWidth={"260px"}
              onClick={handleCanceledOffersClosed}
            />
          ) : (
            <PopUpConfirmationOffer
              isCanceledOffersClicked={isCanceledOffersClicked}
              handleClick={handleCanceledOffer}
              mintPopUpProccesing={mintPopUpProccesing}
              isBlockchainError={isBlockchainError} // change l'affichage
              blockchainError={blockchainError} // message.error
              setIsBlockchainError={setIsBlockchainError}
              setIsStatusClicked={setIsCanceledOffersClicked}
            />
          )}
        </Modal>
      )}
      {isRejectedOffersClicked && (
        <Modal
          dynamicPositionPopUpMargin={`${window.scrollY}px`}
          setState={setIsRejectedOffersClicked}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ display: "none" }}
        >
          <PopUpConfirmationOffer
            handleClick={handleRejectedConfirmationOffer}
            // dataPopupConfirmation={dataPopupConfirmation}
            isRejectedOffersClicked={isRejectedOffersClicked}
          />
        </Modal>
      )}
      <button onClick={() => setIsAcceptedOffersClicked(true)}>
        Accept Offer
      </button>
      <button onClick={() => setIsCanceledOffersClicked(true)}>
        Cancel Offer
      </button>
      <button onClick={() => setIsRejectedOffersClicked(true)}>
        Refuse Offer
      </button>
    </>
  );
};

export default AthleteProfilePage;

import React, { useState, useEffect, useRef } from "react";
import BannerAndProfilePic from "../../Components/BannerAndProfilePic/BannerAndProfilePic";
import NftCard from "../../Components/NftCard/NftCard";
import ProfileSubMenu from "../../Components/ProfileSubMenu/ProfileSubMenu";
import SortBySelector from "../../Components/SortBySelector/SortBySelector";
import FormulatedOffers from "../../Components/UserProfileComponents/FormulatedOffers/FormulatedOffers";
import ReceivedOffers from "../../Components/UserProfileComponents/ReceivedOffers/ReceivedOffers";
import UserActivity from "../../Components/UserProfileComponents/UserActivity/UserActivity";
import UserNameAndStats from "../../Components/UserProfileComponents/UserNameAndStats/UserNameAndStats";
import UserProfileDescription from "../../Components/UserProfileComponents/UserProfileDescription/UserProfileDescription";
import { Network, Alchemy, NftFilters } from "alchemy-sdk";
import "./UserProfilePage.css";
import AthleteFollowingSupportingPopUp from "../../Components/TemplatePopUp/AthleteFollowingSupportingPopUp/AthleteFollowingSupportingPopUp";
import Modal from "../../Components/Modal/Modal";

function UserProfilePage({
  setIsUSerProfileSeortBySelectorClicked,
  isUSerProfileSeortBySelectorClicked,
  setProfileSubMenuOffresClicked,
  profileSubMenuOffresClicked,
}) {
  // fonctionnal states
  const [isProfileSubMenuButtonClicked, setIsProfileSubMenuButtonClicked] =
    useState([true, false, false, false]);
    const [isAthleteFollowingClicked, setIsAthleteFollowingClicked] =
    useState(false);
    const [isAthleteSupportingClicked, setIsAthleteSupportingClicked] =
    useState(false);
    const [pixelScrolledUserProfilePage, setPixelScrolledUserProfilePage] = useState();
  // backend states
  const [dataConcat, setDataConcat] = useState(); // objet de tableau d'objet
  // api states
  const [nftDataApi, setNftDataApi] = useState();
  const [collectionFloorPriceApiData, setCollectionFloorPriceApiData] =
    useState();
  const [nftsFromOwner, setNftsFromOwner] = useState([]);
  const [transferNftDataApi, setTransferNftDataApi] = useState();
  const [nftsSalesDataApi, setNftsSalesDataApi] = useState();
  const [ethPrice, setEthPrice] = useState(""); // API CoinGecko

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
  useEffect(() => {
    getNft();
    getCollectionFloorPrice();
    getNftsForOwner();
    getTransferData();
    getNftMinted();
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
      userPageInfo: {
        username: "Gr3goir3",
        followingAthletes: 145,
        athleteSupporting: 16,
        nftOwned: 159,
        banner: "https://i.imgur.com/sJTNEVk.png",
        avatar: "https://i.imgur.com/cCVIcNS.png",
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
    };
    // console.log(data.userPageInfo.description.length);
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
  
  //----------------------------
  const handlePixelScrolledUserProfilePage = () => {
    setPixelScrolledUserProfilePage(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handlePixelScrolledUserProfilePage, false);
  }, []);
  //----------------------------
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  }, []);

  // smooth redirection fonction
  const nftCardRef = useRef(null); 
  function handleClickNftReceived(event) {
    event.preventDefault();
    nftCardRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
// ----------------------------
  function handleAthleteFollowingClick(e) {
    setIsAthleteFollowingClicked(true);
  };
  function handleAthleteSupportingClick(e) {
    setIsAthleteSupportingClicked(true);
  };
  function handleSectionWheel(e) {
    if (isAthleteFollowingClicked) {
      e.preventDefault();
    }
  };
  // retirer le scroll lock lorsque le modal n'est plus la
  document.querySelector('body').classList.remove('scroll-lock');
  // redirection vers nftCard
  
  
  // retourne le composant selon le submenu cliqué
  function displayCategory() {
    if (isProfileSubMenuButtonClicked[0] === true) {
      return (
        <>
          <SortBySelector
            setIsUSerProfileSeortBySelectorClicked={
              setIsUSerProfileSeortBySelectorClicked
            }
            isUSerProfileSeortBySelectorClicked={
              isUSerProfileSeortBySelectorClicked
            }
          />
          <NftCard
          hidePrice
            nftsFromOwner={nftsFromOwner}
            userFrom={dataConcat?.collected}
            isNftSpam={nftsFromOwner?.spamInfo?.isSpam}
            nftCardRef={nftCardRef}
          />
        </>
      );
    } else if (isProfileSubMenuButtonClicked[1] === true) {
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
    } else if (isProfileSubMenuButtonClicked[2] === true) {
      return (
        <FormulatedOffers
          userFrom={dataConcat?.made}
          nftsFromOwner={nftsFromOwner}
          transferNftDataApi={transferNftDataApi}
          ethPrice={ethPrice}
        />
      );
    } else if (isProfileSubMenuButtonClicked[3] === true) {
      return (
        <ReceivedOffers
          userFrom={dataConcat?.received}
          nftsFromOwner={nftsFromOwner}
          transferNftDataApi={transferNftDataApi}
          ethPrice={ethPrice}
        />
      );
    }
  }
  return (
    <>
      <section onWheel={handleSectionWheel} style={isAthleteFollowingClicked ? {pointerEvents: 'none'} : {}} className="userprofilepage-container">
        <div className="userheader-container">
          <BannerAndProfilePic
            banner={dataConcat?.userPageInfo.banner}
            profilePicture={dataConcat?.userPageInfo.avatar}
          />
          <div className="user-content-activity-nft">
            <div className="username-and-stats-component">
              <UserNameAndStats
                userNameAndStatsObject={dataConcat?.userPageInfo}
                nftsCollectedCounter={nftsFromOwner.length}
                handleAthleteFollowingClick={handleAthleteFollowingClick}
                handleAthleteSupportingClick={handleAthleteSupportingClick}
                nftCardRef={nftCardRef}
                handleClickNftReceived={handleClickNftReceived}
              />
            </div>
            <div className="userprofile-description-component">
              <UserProfileDescription
                userDescription={dataConcat?.userPageInfo.description}
              />
            </div>
            <ProfileSubMenu
              isProfileSubMenuButtonClicked={isProfileSubMenuButtonClicked}
              setIsProfileSubMenuButtonClicked={
                setIsProfileSubMenuButtonClicked
              }
              profileSubMenuOffresClicked={profileSubMenuOffresClicked}
              setProfileSubMenuOffresClicked={setProfileSubMenuOffresClicked}
            />
            {displayCategory()}
          </div>
        </div>
      </section>
      {isAthleteFollowingClicked && (
        <Modal
          setState={setIsAthleteFollowingClicked}
          // style={{ top: "24px", right: "20px" }}
          style={{marginTop: pixelScrolledUserProfilePage}}
          dynamicPositionPopUpMargin={pixelScrolledUserProfilePage}
        >
          <AthleteFollowingSupportingPopUp />
        </Modal>
      )}
      {isAthleteSupportingClicked && (
        <Modal
          setState={setIsAthleteSupportingClicked}
          dynamicPositionPopUpMargin={pixelScrolledUserProfilePage}
          style={{marginTop: pixelScrolledUserProfilePage}}
        >
          <AthleteFollowingSupportingPopUp 
          isAthleteSupportingClicked={isAthleteSupportingClicked}
          />
        </Modal>
      )}
    </>
  );
}

export default UserProfilePage;

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
// import { Network, Alchemy } from "alchemy-sdk";

import "./AthleteProfilePage.css";
import settingsLogo from "../../Assets/Image/settings-logo.svg";
import Modal from "../../Components/Modal/Modal";
import AthleteFollowersFansPopUp from "../../Components/TemplatePopUp/AthleteFollowersFansPopUp/AthleteFollowersFansPopUp";
import AthleteProfileRanking from "../../Components/AthleteProfileRanking/AthleteProfileRanking";
import PopUpConfirmationOffer from "../../Components/PopUpConfirmationOffer/PopUpConfirmationOffer";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Configs/firebase";
import { useParams } from "react-router-dom";
import { getStorage, ref, getMetadata } from "firebase/storage";
// import EditProfilePopUp from "../../Components/EditProfilePopUp/EditProfilePopUp";
// import PopUpEditProfile from "../../Components/PopUpEditProfile/PopUpEditProfile";
// import useUserCollection from "../../contexts/UserContext/useUserCollection";
import useEth from "../../contexts/EthContext/useEth";
import PopUpValidate from "../../Components/PopUpValidate/PopUpValidate";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import { removeDuplicatesFromArray } from "../../Utils/removeDuplicatesFromArray";
import useUserCollection from "../../contexts/UserContext/useUserCollection";
import UserActivityTab from "../../Components/UserActivityTab/UserActivityTab";
import useToggleNetwork from "../../contexts/ToggleNetwork/useToggleNetwork";
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
  // loggedInUser,
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
  const [palmaresData, setPalmaresData] = useState();
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
  const [currentProfileUserWallet, setCurrentProfileUserWallet] = useState("");
  const [arrayAthleteCollection, setArrayAthleteCollection] = useState([]);
  const [availableNftCount, setAvailableNftCount] = useState(0);
  const [isUserFan, setIsUserFan] = useState(false);
  // const setProfileSubMenuOffresClicked = () => {
  //   console.log("");
  // }
  // const profileSubMenuOffresClicked= true
  const location = useLocation();
  const segments = location.pathname.split("/");
  const athleteId = segments[2];
  const [anchor, setAnchor] = useState();
  const { loggedInUser } = useUserCollection();
  const { alchemy } = useToggleNetwork();
  useEffect(() => {
    if (segments.length > 3) {
      setAnchor(location.hash);
    }
  }, []);

  useEffect(() => {
    if (anchor === "#nftcollections") {
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
  }, [anchor]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"), where("id", "==", athleteId)); // Use the correct parameter name here
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

  useEffect(() => {
    // Désactiver le scroll au chargement
      window.scrollTo(0, 0);
      // Réactiver le scroll
  }, []);
  async function getNftsFromOwner() {
    let arraySofanCollection = [];
    let nftCollectionInfo = [];
    const q = query(collection(db, "nft_collections"));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const nftcollectionInfo = doc.data();
        arraySofanCollection.push(nftcollectionInfo.collection_address);
        nftCollectionInfo.push(nftcollectionInfo);
      });
    } else {
      console.log("No collection found");
    }
    // console.log(nftCollectionInfo);
    // console.log(arraySofanCollection);
    // Collecting all unique user IDs
    const uniqueUserIds = [
      ...new Set(nftCollectionInfo.map((item) => item.athlete_id)),
    ];

    // Fetching all users in one go
    const qUsers = query(
      collection(db, "users"),
      where("id", "in", uniqueUserIds)
    );
    const usersQuerySnapshot = await getDocs(qUsers);
    const usersData = usersQuerySnapshot.docs.map((doc) => doc.data());
    // console.log(usersData);
    // Now you can use usersData to get display_name or any other info

    let currentProfileWalletAddresses;
    if (userInfo?.metamask) {
      currentProfileWalletAddresses = userInfo.metamask;
      setCurrentProfileUserWallet(userInfo.metamask);
    } else if (userInfo?.web3auth) {
      currentProfileWalletAddresses = userInfo.web3auth;
      setCurrentProfileUserWallet(userInfo.web3auth);
    }
    // console.log(currentProfileWalletAddresses);

    try {
      const nftsFromOwner = await alchemy.nft.getNftsForOwner(
        currentProfileWalletAddresses,
        {
          contractAddresses: arraySofanCollection,
        }
      );
      // console.log(nftsFromOwner);
      for (let i = 0; i < nftsFromOwner.ownedNfts.length; i++) {
        const elementFromAlchemy = nftsFromOwner.ownedNfts[i];
        for (let a = 0; a < nftCollectionInfo.length; a++) {
          const elementFromNftCollectionInfo = nftCollectionInfo[a];
          for (let b = 0; b < usersData.length; b++) {
            const elementFromUserData = usersData[b];
            if (
              elementFromAlchemy.contract.address.toLowerCase() ===
                elementFromNftCollectionInfo.collection_address.toLowerCase() &&
              elementFromUserData.id === elementFromNftCollectionInfo.athlete_id
            ) {
              // console.log("enter");
              nftsFromOwner.ownedNfts[i] = {
                ...nftsFromOwner.ownedNfts[i],
                athleteName: elementFromUserData.display_name,
                contract: {
                  ...nftsFromOwner.ownedNfts[i]?.contract,
                  address: Web3.utils.toChecksumAddress(
                    nftsFromOwner.ownedNfts[i]?.contract?.address
                  ),
                },
              };
            }
          }
        }
      }
      setNftsFromOwner(nftsFromOwner?.ownedNfts);
      // console.log("yess", nftsFromOwner);
    } catch (error) {
      console.error(error);
    }
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

  const getFansData = async () => {
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
      const allAthleteCollectionOwners = await alchemy.nft.getOwnersForContract(
        element.collection_address
      );
      // console.log(allAthleteCollectionOwners.owners);
      for (let i = 0; i < allAthleteCollectionOwners.owners.length; i++) {
        const elementFromAlchemy = allAthleteCollectionOwners.owners[i];
        tempAthleteFans.push(elementFromAlchemy);
      }
    }
    // console.log(tempAllAthleteCollection);
    const athletefans = removeDuplicatesFromArray(tempAthleteFans);
    // console.log(allAthleteCollection);
    setFansCounterApi(athletefans);
  };

  const availableNft = async () => {
    // Get all collection from this athlete
    const launchpadCollectionLive = collection(db, "nft_collections");
    try {
      const q = query(
        launchpadCollectionLive,
        where("athlete_id", "==", `${id}`)
      );
      getDocs(q)
        .then((querySnapshot) => {
          let data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          // console.log(data);
          setArrayAthleteCollection(data);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (fansCounterApi && loggedInUser) {
      if (loggedInUser?.metamask) {
        const temp = loggedInUser.metamask?.toLowerCase();
        fansCounterApi.includes(temp) === true
          ? setIsUserFan(true)
          : setIsUserFan(false);
      } else if (loggedInUser?.web3auth) {
        const temp = loggedInUser?.web3auth?.toLowerCase();
        fansCounterApi.includes(temp) === true
          ? setIsUserFan(true)
          : setIsUserFan(false);
      }
    }
  }, [fansCounterApi, loggedInUser]);

  useEffect(() => {
    const getAvailableNft = async () => {
      // API Infura
      const web3Instance = new Web3(
        new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
      );
      const { abi } = require("../../contracts/SofanNft.json");
      let tempAvailableNftCount = 0;
      for (let i = 0; i < arrayAthleteCollection.length; i++) {
        const element = arrayAthleteCollection[i];
        const contractInfura = new web3Instance.eth.Contract(
          abi,
          `${element.collection_address}`
        );
        try {
          const tempCollectionLimit = await contractInfura.methods
            .collectionLimit()
            .call();
          const tempTotalSupply = await contractInfura.methods
            .totalSupply()
            .call();
          // console.log(tempCollectionLimit, tempTotalSupply);
          tempAvailableNftCount += tempCollectionLimit - tempTotalSupply;
        } catch (error) {
          console.error(error);
        }
      }

      setAvailableNftCount(tempAvailableNftCount);
    };
    if (arrayAthleteCollection.length != 0) {
      getAvailableNft();
    }
  }, [arrayAthleteCollection]);

  useEffect(() => {
    if (userInfo && alchemy) {
      getNftsFromOwner();
    }
  }, [userInfo, alchemy]);
  useEffect(() => {
    if (alchemy) {
      try {
        // getNft();
        // getCollectionFloorPrice();
        getFansData();
        availableNft();
        getTransferData();
      } catch (err) {
        console.log(err);
      }
    }
  }, [alchemy]);
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
    const palmaresCollectionAthlete = collection(db, "athlete_records");
    const q = query(
      palmaresCollectionAthlete,
      where("athlete_id", "==", `${athleteId}`)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((doc) => {
          const docData = doc.data();
          fetchedData.push({
            palmares_date: docData.palmares_date,
            palmares_description: docData.palmares_description,
            palmares_title: docData.palmares_title,
          });
        });
        setPalmaresData(fetchedData);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des infos athlète:",
          error
        );
      }
    );
    // Cleanup function to unsubscribe from the listener
    return () => {
      unsubscribe();
    };
  }, [athleteId]);
  // console.log(palmaresData, "fekzfopekzfopk");
  // retirer le scroll lock lorsque le modal n'est plus la
  document.querySelector("body").classList.remove("scroll-lock");
  // ============================================================
  // Récupérer la valeur de pixel scrollé pour ensuite faire afficher le modal au bon endroit
  const [pixelScrolledAthleteProfilePage, setPixelScrolledAthleteProfilePage] =
    useState();
  const handlePixelScrolledAthleteProfilePage = () => {
    setPixelScrolledAthleteProfilePage(window.scrollY);
  };
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

  // console.log("Triggered from athletePage");

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

  // useEffect(() => {
  //   window.addEventListener(
  //     "scroll",
  //     handlePixelScrolledAthleteProfilePage,
  //     false
  //   );
  //   return () => {
  //     window.removeEventListener(
  //       "scroll",
  //       handlePixelScrolledAthleteProfilePage,
  //       false
  //     );
  //   };
  // }, []);
  return (
    <>
      <div className="athleteprofilepage-component">
        {/* <div className="athleteprofilepage-wrap"> */}
        <MemoAthleteProfileHeader
          userInfo={userInfo}
          fansCounterApi={fansCounterApi?.length}
          handleClicNftsAvailable={handleClicNftsAvailable}
          setIsProfileSubMenuButtonClicked={setIsAthleteProfileSubMenuClicked}
          palmaresData={palmaresData}
          availableNftCount={availableNftCount}
        />
        <div className="athleteprofilepage-profilesubmenu-wrap">
          <MemoProfileSubMenu
            isPageAthlete={true}
            isProfileSubMenuButtonClicked={isAthleteProfileSubMenuClicked}
            setIsProfileSubMenuButtonClicked={setIsAthleteProfileSubMenuClicked}
          />
        </div>
        {isAthleteProfileSubMenuClicked[4] === true ? (
          <MemoAthleteProfileFeed
            athleteProfilePageStyling={true}
            //dataPosts={dataConcat?.athletes}
            athleteUserId={id}
            athleteName={userInfo?.display_name}
            athleteAvatar={userInfo?.profile_avatar}
            pixelScrolledAthleteProfilePage={pixelScrolledAthleteProfilePage}
            isUserFan={isUserFan}
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
          <>
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
              // nftCardRef={nftCardRef}
            />
          </>
        ) : isAthleteProfileSubMenuClicked[1] === true ? (
          <UserActivityTab
            currentProfileUserWallet={currentProfileUserWallet}
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
      {/* <button onClick={() => setIsAcceptedOffersClicked(true)}>
        Accept Offer
      </button>
      <button onClick={() => setIsCanceledOffersClicked(true)}>
        Cancel Offer
      </button>
      <button onClick={() => setIsRejectedOffersClicked(true)}>
        Refuse Offer
      </button> */}
    </>
  );
};

export default AthleteProfilePage;

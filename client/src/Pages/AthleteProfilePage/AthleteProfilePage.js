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
  loggedInUser,
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
  // const setProfileSubMenuOffresClicked = () => {
  //   console.log("amagnacouuuuunia");
  // }
  // const profileSubMenuOffresClicked= true
  const location = useLocation();
  const segments = location.pathname.split("/");
  const athleteId = segments[2];
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
      for (let i = 0; i < nftsFromOwner.ownedNfts.length; i++) {
        const elementFromAlchemy = nftsFromOwner.ownedNfts[i];
        for (let a = 0; a < nftCollectionInfo.length; a++) {
          const elementFromNftCollectionInfo = nftCollectionInfo[a];
          for (let b = 0; b < usersData.length; b++) {
            const elementFromUserData = usersData[b];
            if (
              elementFromAlchemy.contract.address ===
                elementFromNftCollectionInfo.collection_address.toLowerCase() &&
              elementFromUserData.id === elementFromNftCollectionInfo.athlete_id
            ) {
              nftsFromOwner.ownedNfts[i] = {
                ...nftsFromOwner.ownedNfts[i],
                athleteName: elementFromUserData.display_name,
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
  useEffect(() => {
    window.addEventListener(
      "scroll",
      handlePixelScrolledAthleteProfilePage,
      false
    );
    return () => {
      window.removeEventListener(
        "scroll",
        handlePixelScrolledAthleteProfilePage,
        false
      );
    };
  }, []);
  return (
    <>
      <div className="athleteprofilepage-component">
        {/* <div className="athleteprofilepage-wrap"> */}
        <MemoAthleteProfileHeader
          userInfo={userInfo}
          fansCounterApi={fansCounterApi}
          handleClicNftsAvailable={handleClicNftsAvailable}
          setIsProfileSubMenuButtonClicked={setIsAthleteProfileSubMenuClicked}
          palmaresData={palmaresData}
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
              // nftCardRef={nftCardRef}
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

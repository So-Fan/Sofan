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
import settingsLogo from "../../Assets/Image/settings-logo.svg";
import AthleteFollowingSupportingPopUp from "../../Components/TemplatePopUp/AthleteFollowingSupportingPopUp/AthleteFollowingSupportingPopUp";
import Modal from "../../Components/Modal/Modal";
import PopUpConfirmationOffer from "../../Components/PopUpConfirmationOffer/PopUpConfirmationOffer";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Configs/firebase";
import EditProfilePopUp from "../../Components/EditProfilePopUp/EditProfilePopUp";
import PopUpEditProfile from "../../Components/PopUpEditProfile/PopUpEditProfile";
import useUserCollection from "../../contexts/UserContext/useUserCollection";
import UserActivityTab from "../../Components/UserActivityTab/UserActivityTab";
import UserOffersReceived from "../../Components/UserOffersReceived/UserOffersReceived";
import UserOffersMade from "../../Components/UserOffersMade/UserOffersMade";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
import { concatStringFromTo } from "../../Utils/concatString";
function UserProfilePage({
  setIsUSerProfileSeortBySelectorClicked,
  isUSerProfileSeortBySelectorClicked,
  setProfileSubMenuOffresClicked,
  profileSubMenuOffresClicked,
  userProfileLogged,
}) {
  // fonctionnal states
  const [isProfileSubMenuButtonClicked, setIsProfileSubMenuButtonClicked] =
    useState([true, false, false, false]);
  const [isAthleteFollowingClicked, setIsAthleteFollowingClicked] =
    useState(false);
  const [isAthleteSupportingClicked, setIsAthleteSupportingClicked] =
    useState(false);
  const [isAcceptedOffersClicked, setIsAcceptedOffersClicked] = useState(false);
  const [isRejectedOffersClicked, setIsRejectedOffersClicked] = useState(false);
  const [pixelScrolledUserProfilePage, setPixelScrolledUserProfilePage] =
    useState();
  const [isSettingsUserPageClicked, setSettingsUserPageClicked] =
    useState(false);
  // popup states info
  const [dataPopupConfirmation, setDataPopupConfirmation] = useState([]);
  // backend states
  const [dataConcat, setDataConcat] = useState(); // objet de tableau d'objet
  // api states
  const [nftsFromOwner, setNftsFromOwner] = useState([]);
  const [transferNftDataApi, setTransferNftDataApi] = useState();
  const [nftsSalesDataApi, setNftsSalesDataApi] = useState();
  const [ethPrice, setEthPrice] = useState(""); // API CoinGecko
  const [allUserInfo, setAllUserInfo] = useState(null);
  const { id } = useParams();
  const { loggedInUser } = useUserCollection();
  const { marketplaceAddress } = useEth();
  const [currentProfileUserWallet, setCurrentProfileUserWallet] = useState("");
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
          setAllUserInfo(AllUserInfo);
          console.log(AllUserInfo);
        });
      } else {
        // Handle case when no user is found with the given ID
        console.log("No user found");
      }
    };

    fetchData();
  }, [id]);
  // console.log(allUserInfo);
  // Api Alchemy setup
  const settings = {
    apiKey: "34lcNFh-vbBqL9ignec_nN40qLHVOfSo",
    network: Network.ETH_GOERLI,
    maxRetries: 10,
  };
  const alchemy = new Alchemy(settings);

  useEffect(() => {
    // get Nfts from Owner and Contracts
    async function getNftsForOwner() {
      // we select all the nfts hold by an address for a specific collection
      const web3Instance = new Web3(
        new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
      );
      const { abi } = require("../../contracts/Sofan.json");
      const contract = new web3Instance.eth.Contract(
        abi,
        // Replace this with the address of your deployed contract
        marketplaceAddress
      );
      const arraySofanCollection = await contract.methods
        .getAllCollection()
        .call();
      console.log("array sofan", arraySofanCollection);
      let curentProfileWalletAddresses;
      if (allUserInfo?.metamask) {
        curentProfileWalletAddresses = allUserInfo.metamask;
        setCurrentProfileUserWallet(allUserInfo.metamask);
      } else if (allUserInfo?.web3auth) {
        curentProfileWalletAddresses = allUserInfo.web3auth;
        setCurrentProfileUserWallet(allUserInfo.web3auth);
      }
      console.log(curentProfileWalletAddresses);
      try {
        const nftsFromOwner = await alchemy.nft.getNftsForOwner(
          // TODO: Comes from backend
          curentProfileWalletAddresses,
          {
            contractAddresses: arraySofanCollection,
          } // filter
        );
        setNftsFromOwner(nftsFromOwner?.ownedNfts);
        console.log("yess", nftsFromOwner);
      } catch (error) {
        console.error(error);
      }
    }
    getNftsForOwner();
  }, [allUserInfo]);

  // API Coingecko --> Get ETH price
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []); // API Coingecko --> Get ETH price

  //----------------------------
  // const handlePixelScrolledUserProfilePage = () => {
  //   setPixelScrolledUserProfilePage(window.scrollY);
  // };
  // useEffect(() => {
  //   window.addEventListener(
  //     "scroll",
  //     handlePixelScrolledUserProfilePage,
  //     false
  //   );
  // }, []);
  //----------------------------
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
  }
  function handleAthleteSupportingClick(e) {
    setIsAthleteSupportingClicked(true);
  }
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
  function handleSettingsUserPageClick() {
    setSettingsUserPageClicked(true);
  }
  function handleSectionWheel(e) {
    if (isAthleteFollowingClicked) {
      e.preventDefault();
    }
  }
  // retirer le scroll lock lorsque le modal n'est plus la
  document.querySelector("body").classList.remove("scroll-lock");
  // redirection vers nftCard

  // retourne le composant selon le submenu cliqué
  function displayCategory() {
    if (isProfileSubMenuButtonClicked[0] === true) {
      return (
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
        // <UserActivity
        //   isUserActivitySectionActive={true} // not required
        //   userFrom={dataConcat?.activities} // not required
        //   nftsFromOwner={nftsFromOwner} // required
        //   transferNftDataApi={transferNftDataApi} // required
        //   setTransferNftDataApi={setTransferNftDataApi} // not required
        //   ethPrice={ethPrice} // required
        // />
        <UserActivityTab
          ethPrice={ethPrice}
          currentProfileUserWallet={currentProfileUserWallet}
        />
      );
    } else if (isProfileSubMenuButtonClicked[2] === true) {
      return (
        // <FormulatedOffers
        //   userFrom={dataConcat?.made}
        //   nftsFromOwner={nftsFromOwner}
        //   transferNftDataApi={transferNftDataApi}
        //   ethPrice={ethPrice}
        // />
        <UserOffersMade />
      );
    } else if (isProfileSubMenuButtonClicked[3] === true) {
      return (
        // <ReceivedOffers
        //   userFrom={dataConcat?.received}
        //   nftsFromOwner={nftsFromOwner}
        //   transferNftDataApi={transferNftDataApi}
        //   ethPrice={ethPrice}
        //   handleAcceptOffersClick={handleAcceptOffersClick}
        //   handleRejectedOffersClick={handleRejectedOffersClick}
        // />
        <UserOffersReceived />
      );
    }
  }
  return (
    <>
      <section
        onWheel={handleSectionWheel}
        style={isAthleteFollowingClicked ? { pointerEvents: "none" } : {}}
        className="userprofilepage-container"
      >
        <div className="userheader-container">
          <BannerAndProfilePic
            banner={allUserInfo?.profile_banner}
            profilePicture={allUserInfo?.profile_avatar}
          />
          <div className="user-content-activity-nft">
            <div className="user-content-username-and-stats-and-settings">
              <div className="username-and-stats-component">
                <UserNameAndStats
                  userNameAndStatsObject={dataConcat?.userPageInfo}
                  nftsCollectedCounter={nftsFromOwner.length}
                  handleAthleteFollowingClick={handleAthleteFollowingClick}
                  handleAthleteSupportingClick={handleAthleteSupportingClick}
                  nftCardRef={nftCardRef}
                  handleClickNftReceived={handleClickNftReceived}
                  allUserInfo={allUserInfo}
                />
              </div>
              {loggedInUser?.id == id && (
                <div
                  onClick={handleSettingsUserPageClick}
                  className="user-content-settings-button"
                >
                  <img src={settingsLogo} alt="" />
                </div>
              )}
            </div>
            <div className="userprofile-description-component">
              <UserProfileDescription userDescription={allUserInfo?.bio} />
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
          style={{ marginTop: pixelScrolledUserProfilePage, display: "none" }}
          dynamicPositionPopUpMargin={pixelScrolledUserProfilePage}
        >
          <AthleteFollowingSupportingPopUp />
        </Modal>
      )}
      {isAthleteSupportingClicked && (
        <Modal
          setState={setIsAthleteSupportingClicked}
          dynamicPositionPopUpMargin={pixelScrolledUserProfilePage}
          style={{ marginTop: pixelScrolledUserProfilePage, display: "none" }}
        >
          <AthleteFollowingSupportingPopUp
            isAthleteSupportingClicked={isAthleteSupportingClicked}
          />
        </Modal>
      )}

      {isAcceptedOffersClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledUserProfilePage}
          setState={setIsAcceptedOffersClicked}
          // style={{marginTop: pixelScrolledUserProfilePage}}
          style={{ display: "none" }}
        >
          <PopUpConfirmationOffer
            isAcceptedOffersClicked={isAcceptedOffersClicked}
          />
        </Modal>
      )}
      {isRejectedOffersClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledUserProfilePage}
          setState={setIsRejectedOffersClicked}
          // style={{marginTop: pixelScrolledUserProfilePage}}
          style={{ display: "none" }}
        >
          <PopUpConfirmationOffer
            // dataPopupConfirmation={dataPopupConfirmation}
            isRejectedOffersClicked={isRejectedOffersClicked}
          />
        </Modal>
      )}
      {isSettingsUserPageClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledUserProfilePage}
          setState={setSettingsUserPageClicked}
          style={{ marginTop: pixelScrolledUserProfilePage, display: "none" }}
        >
          <PopUpEditProfile
            allUserInfo={allUserInfo} // c'est mathéo qui a set ça à toi de vérifier Saajeed
          />
        </Modal>
      )}
    </>
  );
}

export default UserProfilePage;

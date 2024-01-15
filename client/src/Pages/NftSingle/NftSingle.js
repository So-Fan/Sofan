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
import PopupListNFT from "../../Components/PopupListNFT/PopupListNFT";
import PopUpValidate from "../../Components/PopUpValidate/PopUpValidate";
import PopUpUnlistNFT from "../../Components/PopUpUnlistNFT/PopUpUnlistNFT";
import useEth from "../../contexts/EthContext/useEth";
import PopUpAddFundToWallet from "../../Components/PopUpAddFundToWallet/PopUpAddFundToWallet";
import { formatCurrentBalance } from "../../Utils/formatCurrentBalance";
import { useLocation } from "react-router-dom";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../Configs/firebase";
import Web3 from "web3";
import { concatStringFromTo } from "../../Utils/concatString";
import { removeDuplicatesFromArray } from "../../Utils/removeDuplicatesFromArray";
import useToggleNetwork from "../../contexts/ToggleNetwork/useToggleNetwork";
const NftSingle = ({ isLogged }) => {
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
  const [nftsFromContract, setNftsFromContract] = useState([]); // API Alchemy
  const [nftPicture, setNftPicture] = useState();
  const [collectionNameApi, setCollectionNameApi] = useState();
  const [nftIdApi, setNftIdApi] = useState();
  const [mintPopUpProccesing, setMintPopUpProccesing] = useState(false);
  const [blockchainError, setBlockchainError] = useState();
  const [listingPrice, setListingPrice] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const [isNFTListed, setIsNFTListed] = useState(false);
  const [isNFTOwner, setIsNFTOwner] = useState(false);
  const [isBuyListingButtonDisabled, setIsBuyListingButtonDisabled] =
    useState(true);
  const [currentNftTokenId, setCurrentNftTokenId] = useState();
  const [
    currentNftListingFromMarketplace,
    setCurrentNftListingFromMarketplace,
  ] = useState();
  const [currentNftOwnerFromBlockchain, setcurrentNftOwnerFromBlockchain] =
    useState();
  const [isUnlist, setisUnlist] = useState();
  const [isUnlistClicked, setIsUnlistClicked] = useState();
  const [isListed, setIsListed] = useState();
  const [isListClicked, setIsListClicked] = useState();
  const [isListingBuyed, setIsListingBuyed] = useState();
  const [isBidPlaced, setIsBidPlaced] = useState();
  const [listingBlockchainError, setListingBlockchainError] = useState();
  const [listingPriceOnChange, setIsListingPriceOnChange] = useState();
  const [displayPopUpAddFundToWallet, setDisplayPopUpAddFundToWallet] =
    useState();
  const [currentBalance, setCurrentBalance] = useState(null);

  // --------------- Shajeed -----------------------

  const [utilities, setUtilities] = useState([]);

  // -----------------------------------------------

  const [
    currentNftCollectionInfoFromBackend,
    setCurrentNftCollectionInfoFromBackend,
  ] = useState();
  const [currentAthleteCollectionCreator, setCurrentAthleteCollectionCreator] =
    useState();
  const [currentTokenIdOwner, setCurrentTokenIdOwner] = useState();
  const [currentNFTCollectionInfo, setCurrentNFTCollectionInfo] = useState();
  const [athleteFanNumber, setAthleteFanNumber] = useState(null);
  const location = useLocation();
  const segments = location.pathname.split("/");
  const collectionAddress = segments[2];
  const tokenId = segments[3];
  const { alchemy } = useToggleNetwork();
  // console.log(typeof collectionAddress);
  const {
    setContractAddress,
    state: { contract, accounts, web3 },
    marketplaceAddress,
  } = useEth();

  useEffect(() => {
    // Désactiver le scroll au chargement
      window.scrollTo(0, 0);
      // Réactiver le scroll
  }, []);

  async function getNftsFromContract() {
    const nftsFromContract = await alchemy?.nft.getNftsForContract(
      collectionAddress
    );
    // console.log(nftsFromContract);
    setNftsFromContract(nftsFromContract?.nfts);
  }

  async function getNftMetadata() {
    const currentNftMetadata = await alchemy?.nft.getNftMetadata(
      collectionAddress,
      tokenId
    );
    // console.log(currentNftMetadata);
    setCurrentNFTCollectionInfo(currentNftMetadata);
  }

  async function getCurrentOwnerInfo() {
    // API Infura
    const web3Instance = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ID)
    );
    const { abi } = require("../../contracts/SofanNft.json");
    const contractInfura = new web3Instance.eth.Contract(
      abi,
      `${collectionAddress}`
    );
    const currentOwnerAddress = await contractInfura.methods
      .ownerOf(tokenId)
      .call();
    // console.log(currentOwnerAddress);
    const q = query(
      collection(db, "users"),
      where("metamask", "==", currentOwnerAddress)
    );
    const q2 = query(
      collection(db, "users"),
      where("web3auth", "==", currentOwnerAddress)
    );
    let currentOwnerOfToken;
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const currentOwnerOfTokenData = doc.data();
        currentOwnerOfToken = currentOwnerOfTokenData;
      });
    } else {
      const querySnapshot = await getDocs(q2);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const currentOwnerOfTokenData = doc.data();
          currentOwnerOfToken = currentOwnerOfTokenData;
        });
      } else {
        currentOwnerOfToken = {
          externalWallet: currentOwnerAddress,
          profile_avatar:
            "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/user_profile%2Fdefault_avatar%2FEllipse%2045.png?alt=media&token=bde0f1b1-7d06-4eea-877c-d8916e1f9032",
        };
        console.log("user not found");
      }
    }
    // console.log(currentOwnerOfToken);
    setCurrentTokenIdOwner(currentOwnerOfToken);
  }

  // useless ?
  async function getNftPicture() {
    const nftsFromContract = await alchemy?.nft.getNftMetadata(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      "15"
    );
    setNftPicture(nftsFromContract?.media[0]?.gateway);
    setNftIdApi(nftsFromContract?.tokenId);
  }


 // ----------------------- Shajeed -------------------------

 useEffect(() => {
  const q = query(
    collection(db, "nft_collections"),
    where("collection_address", "==", collectionAddress)
  );

  getDocs(q).then((querySnapshot) => {
    const docData = querySnapshot.docs[0];
    if (docData) {
      const docId = docData.id;
      const unsub = onSnapshot(
        collection(db, "nft_collections", docId, "utilities"),
        (snapshot) => {
          const utilitiesData = snapshot.docs.map((doc) => ({
            id: doc.id, // include the id here
            ...doc.data(),
          }));
          setUtilities(utilitiesData);
        }
      );

      return () => {
        unsub();
      };
    }
  });
}, [collectionAddress]);

// ---------------------------------------------------------



  useEffect(() => {
    if (alchemy) {
      getCurrentOwnerInfo();
      getNftMetadata();
      getNftsFromContract();
      getNftPicture();
    }
  }, [alchemy]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    const getAthleteInfo = async () => {
      try {
        let nftCollectionInfo = [];
        const q = query(collection(db, "nft_collections"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const tempNftcollectionInfo = doc.data();
            nftCollectionInfo.push(tempNftcollectionInfo);
          });
        } else {
          console.log("No collection found");
        }
        // console.log(nftCollectionInfo);
        let currentNftCollectionInfo;
        for (let i = 0; i < nftCollectionInfo.length; i++) {
          const element = nftCollectionInfo[i];
          if (
            element.collection_address.toLowerCase() ===
            collectionAddress.toLowerCase()
          ) {
            currentNftCollectionInfo = element;
            // break car une adresse n'est censé n'être liée qu'à un seul document firebase ie une seule table de collection
            break;
          }
        }
        setCurrentNftCollectionInfoFromBackend(currentNftCollectionInfo);
        // console.log(currentNftCollectionInfo);
        const q2 = query(
          collection(db, "users"),
          where("id", "==", currentNftCollectionInfo?.athlete_id)
        );
        const querySnapshot2 = await getDocs(q2);

        if (!querySnapshot2.empty) {
          querySnapshot2.forEach((doc) => {
            const userInfo = doc.data();
            const AllUserInfo = {
              ...userInfo,
            };
            setCurrentAthleteCollectionCreator(AllUserInfo);
            // console.log(AllUserInfo);
          });
        } else {
          console.log("No user found");
        }

        // Get all collection for the owner => get the fan amount
        let tempAllAthleteCollection = [];
        for (let i = 0; i < nftCollectionInfo.length; i++) {
          const element = nftCollectionInfo[i];
          // console.log(element);
          if (element.athlete_id === currentNftCollectionInfo.athlete_id) {
            // console.log("i'm in");
            const allAthleteCollectionOwners =
              await alchemy.nft.getOwnersForContract(
                element.collection_address
              );
            // console.log(allAthleteCollectionOwners.owners);
            for (let i = 0; i < allAthleteCollectionOwners.owners.length; i++) {
              const elementFromAlchemy = allAthleteCollectionOwners.owners[i];
              tempAllAthleteCollection.push(elementFromAlchemy);
            }
          }
        }
        // console.log(tempAllAthleteCollection);
        const allAthleteCollection = removeDuplicatesFromArray(
          tempAllAthleteCollection
        );
        // console.log(allAthleteCollection);
        setAthleteFanNumber(allAthleteCollection.length);
      } catch (error) {
        console.error(error);
      }
    };
    if (alchemy) {
      getAthleteInfo();
    }
  }, [alchemy]);
  // Faire afficher le pop up dynamiquement en récupérent le nb de pixel scrollé
  // const handlePixelScrolledAthleteProfilePage = () => {
  //   setPixelScrolledAthleteProfilePage(window.scrollY);
  // };
  // useEffect(() => {
  //   window.addEventListener(
  //     "scroll",
  //     handlePixelScrolledAthleteProfilePage,
  //     false
  //   );
  // }, []);

  // retirer le scroll lock lorsque le modal n'est plus la
  //document.querySelector("body").classList.remove("scroll-lock");

  //
  function handleClickSubMenuButton(e) {
    if (e.target.innerHTML === "Vu d'ensemble") {
      setIsSubMenuClicked([true, false, false, false]);
      return <NftCollectionOverview />;
    } else if (e.target.innerHTML === "Properties") {
      setIsSubMenuClicked([false, true, false, false]);
      return;
    } else if (e.target.innerHTML === "Offres") {
      setIsSubMenuClicked([false, false, true, false]);
      return;
    } else if (e.target.innerHTML === "Activité") {
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
            date: "il y a 3 semaines",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "il y a 3 semaines",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "il y a 3 semaines",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "il y a 3 semaines",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "il y a 3 semaines",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "il y a 3 semaines",
            priceEth: 0.91,
            priceEur: 1267.53,
          },
          {
            profilePicture: "https://i.imgur.com/cCVIcNS.png",
            userName: "DonOfSomething",
            date: "il y a 3 semaines",
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
        date: "il y a 3 semaines",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "il y a 3 semaines",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "il y a 3 semaines",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "il y a 3 semaines",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "il y a 3 semaines",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "il y a 3 semaines",
        priceEth: 0.91,
        priceEur: 1267.53,
      },
      {
        profilePicture: "https://i.imgur.com/cCVIcNS.png",
        userName: "DonOfSomething",
        date: "il y a 3 semaines",
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

  //
  function handleBuyNftButtonClick() {
    // Autoriser le click uniquement listingPricequand nft listé
    if (!isBuyListingButtonDisabled) {
      // handleBidNftButtonClick = { handleBidNftButtonClick };
      setIsBuyNftButtonClicked(true);
    }
  }

  const handleBuyListingPopup = async () => {
    console.log("proceed to payment clicked");

    const artifact = require("../../Pages/Test/USDC.json");
    const { abi: usdcAbi } = artifact;
    // TODO: Call Sofan marketplace to get the addressUSDC
    let addressUSDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    let contractUSDCInstance = new web3.eth.Contract(usdcAbi, addressUSDC);

    try {
      const result = await contractUSDCInstance.methods
        .balanceOf(accounts[0])
        .call({ from: accounts[0] });
      // console.log("Je suis result", result);
      formatCurrentBalance(result, setCurrentBalance);
      if (result > 0 && result < parseInt(currentNftListingFromMarketplace)) {
        // setIsBidNftButtonClicked(false);
        setDisplayPopUpAddFundToWallet(true);
        return;
      }
    } catch (error) {
      console.error(error);
      setListingBlockchainError(error.message);
      setBlockchainError(true);
    }

    try {
      setMintPopUpProccesing(true);
      const result = await contractUSDCInstance.methods
        .approve(marketplaceAddress, parseInt(listingPrice))
        .send({ from: accounts[0] });

      if (result.status) {
        console.log("Approve successfuly");
      } else {
        console.log("failed to approve", result);
        setMintPopUpProccesing(false);
        // setIsListed(false);
        setBlockchainError(true);
        setListingBlockchainError(result.message); // TODO: A vérifier si la clé est bien nommée message
        return;
      }
    } catch (error) {
      console.error(error);
      setListingBlockchainError(error.message);
      setMintPopUpProccesing(false);
      setBlockchainError(true);
      return;
    }

    console.log("after approve");

    const artifacts = require("../../contracts/Sofan.json");
    const { abi } = artifacts;
    const web3MarketplaceInstance = new web3.eth.Contract(
      abi,
      marketplaceAddress
    );
    try {
      // param 1: address of nft seller 2: index of listing
      // load seller when pop up loading
      const result = await web3MarketplaceInstance.methods
        .buyListing(
          currentNftOwnerFromBlockchain,
          currentNftListingFromMarketplace
        )
        .send({ from: accounts[0] });
      if (result.status) {
        // console.log("buy listing success");
        setMintPopUpProccesing(false);
        setIsListingBuyed(true);
        setIsNFTListed(false);
        setIsNFTOwner(true);
      } else {
        console.log("buy listing error", result);
        setMintPopUpProccesing(false);
        // setIsListed(false);
        setBlockchainError(true);
        setListingBlockchainError(result.message); // TODO: A vérifier si la clé est bien nommée message
      }
    } catch (error) {
      console.error(error);
      setListingBlockchainError(error.message);
      setMintPopUpProccesing(false);
      setBlockchainError(true);
    }
  };

  const handleBuyListingClosed = () => {
    setIsBuyNftButtonClicked(false);
    setIsListingBuyed(false);
  };

  // START BID ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  function handleBidNftButtonClick() {
    setIsBidNftButtonClicked(true);
  }

  // permet de n'accepter que les chiffres, les virgules et les points et le limiter à 6 décimales
  const handleBidPriceChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^[0-9]*(,|\.?[0-9]{0,6})?$/;

    var tempBidPrice;
    if (regex.test(inputValue)) {
      tempBidPrice = inputValue.replace(",", ".");
      // console.log("replace , by .", tempBidPrice);
      setBidPrice(tempBidPrice); // remplace la virgule par un point
    } else if (
      inputValue.slice(-1) === "." &&
      inputValue.indexOf(".") === inputValue.length - 1
    ) {
      tempBidPrice = inputValue;
      // console.log("replace by exact inputValue", tempBidPrice);
      setBidPrice(tempBidPrice); // permet l'ajout d'un seul point
    }
  };

  // Possibilité de factoriser avec handleBidPriceChange
  const handleListingPriceChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^[0-9]*(,|\.?[0-9]{0,6})?$/;

    var tempListingPrice;
    if (regex.test(inputValue)) {
      tempListingPrice = inputValue.replace(",", ".");
      // console.log("replace , by .", tempListingPrice);
      setIsListingPriceOnChange(tempListingPrice); // remplace la virgule par un point
    } else if (
      inputValue.slice(-1) === "." &&
      inputValue.indexOf(".") === inputValue.length - 1
    ) {
      tempListingPrice = inputValue;
      // console.log("replace by exact inputValue", tempListingPrice);
      setIsListingPriceOnChange(tempListingPrice); // permet l'ajout d'un seul point
    }
  };

  const handlePlaceBidPopup = async () => {
    // console.log("proceed to place a BID clicked");

    var tempBidPrice;
    let tempDecimalUDC = "000000";
    if (!bidPrice) {
      // console.log("Invalid price.");
      return;
    } else if (bidPrice.indexOf(".") === -1) {
      tempBidPrice = `${bidPrice}${tempDecimalUDC}`;
      // console.log(tempBidPrice);
    } else if (bidPrice.indexOf(".") === 0) {
      tempBidPrice = `${bidPrice.slice(
        1,
        bidPrice.length
      )}${tempDecimalUDC.slice(bidPrice.length - 1, tempDecimalUDC.length)}`;
      console.log(tempBidPrice);
    } else if (bidPrice.indexOf(".") > 0) {
      let temp1 = bidPrice.split(".");
      tempBidPrice = temp1[0]
        .concat(temp1[1])
        .concat(tempDecimalUDC.slice(temp1[1].length, tempDecimalUDC.length));
      // console.log(tempBidPrice);
    }
    // console.log(contract._address, " ", parseInt(tempBidPrice));
    const artifact = require("../../Pages/Test/USDC.json");
    const { abi: usdcAbi } = artifact;
    // TODO: Call Sofan marketplace to get the addressUSDC
    let addressUSDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    let contractUSDCInstance;
    try {
      contractUSDCInstance = new web3.eth.Contract(usdcAbi, addressUSDC);
    } catch (error) {
      console.error(error);
      setListingBlockchainError(error.message);
      setBlockchainError(true);
      return;
    }

    try {
      const result = await contractUSDCInstance.methods
        .balanceOf(accounts[0])
        .call({ from: accounts[0] });
      // console.log("Je suis result", result);
      formatCurrentBalance(result, setCurrentBalance);
      if (result > 0 && result < parseInt(tempBidPrice)) {
        // setIsBidNftButtonClicked(false);
        setDisplayPopUpAddFundToWallet(true);
        return;
      }
    } catch (error) {
      console.error(error);
      setListingBlockchainError(error.message);
      setBlockchainError(true);
    }

    try {
      setMintPopUpProccesing(true);
      const result = await contractUSDCInstance.methods
        .approve(marketplaceAddress, parseInt(tempBidPrice))
        .send({ from: accounts[0] });

      if (result.status) {
        // console.log("Approve successfuly");
      } else {
        console.log("failed to approve", result);
        setMintPopUpProccesing(false);
        // setIsListed(false);
        setBlockchainError(true);
        setListingBlockchainError(result.message); // TODO: A vérifier si la clé est bien nommée message
        return;
      }
    } catch (error) {
      console.error(error);
      setListingBlockchainError(error.message);
      setMintPopUpProccesing(false);
      setBlockchainError(true);
      return;
    }
    // console.log("after approve");

    const artifacts = require("../../contracts/Sofan.json");
    const { abi } = artifacts;
    const web3MarketplaceInstance = new web3.eth.Contract(
      abi,
      marketplaceAddress
    );
    try {
      // load seller when pop up loading
      const result = await web3MarketplaceInstance.methods
        .placeBid(
          contract._address,
          currentNftTokenId,
          parseInt(tempBidPrice),
          currentNftOwnerFromBlockchain
        )
        .send({ from: accounts[0] });
      if (result.status) {
        // console.log("Bid placed successfully");
        setMintPopUpProccesing(false);
        setIsBidPlaced(true);
        setIsSubMenuClicked([false, false, true, false]); // Open Offers
      } else {
        console.log("Place bid error", result);
        setMintPopUpProccesing(false);
        // setIsListed(false);
        setBlockchainError(true);
        setListingBlockchainError(result.message); // TODO: A vérifier si la clé est bien nommée message
      }
    } catch (error) {
      console.log(error);
      setListingBlockchainError(error.message);
      setMintPopUpProccesing(false);
      setBlockchainError(true);
    }
  };

  const handlePlaceBidClosed = () => {
    setIsBidNftButtonClicked(false);
    setIsBidPlaced(false);
  };

  // END BID ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const handleListNftButton = () => {
    setIsListClicked(true);
  };

  const handleListingPopup = async () => {
    // TODO: Si pas connecté alors le bouton affiche un popup pour demander de sign up ou sign in
    // console.log("Bouton Vendre cliqué");
    // console.log(listingPriceOnChange);
    var tempListingPrice;
    let tempDecimalUDC = "000000";
    if (!listingPriceOnChange) {
      // console.log("Invalid price.");
      return;
    } else if (listingPriceOnChange.indexOf(".") === -1) {
      tempListingPrice = `${listingPriceOnChange}${tempDecimalUDC}`;
      // console.log(tempListingPrice);
    } else if (listingPriceOnChange.indexOf(".") === 0) {
      tempListingPrice = `${listingPriceOnChange.slice(
        1,
        listingPriceOnChange.length
      )}${tempDecimalUDC.slice(
        listingPriceOnChange.length - 1,
        tempDecimalUDC.length
      )}`;
      // console.log(tempListingPrice);
    } else if (listingPriceOnChange.indexOf(".") > 0) {
      let temp1 = listingPriceOnChange.split(".");
      tempListingPrice = temp1[0]
        .concat(temp1[1])
        .concat(tempDecimalUDC.slice(temp1[1].length, tempDecimalUDC.length));
      // console.log(tempListingPrice);
    }

    const artifacts = require("../../contracts/Sofan.json");
    const { abi } = artifacts;
    const web3MarketplaceInstance = new web3.eth.Contract(
      abi,
      marketplaceAddress
    );
    // console.log(web3MarketplaceInstance);
    // console.log(typeof contract._address);
    try {
      setMintPopUpProccesing(true);
      // param 1: address of nft contract 2: nft tokenId 3: price
      const result = await web3MarketplaceInstance.methods
        .listToSell(contract._address, currentNftTokenId, tempListingPrice)
        .send({ from: accounts[0] });
      if (result.status) {
        // console.log("Successfully list token");
        setMintPopUpProccesing(false);
        setIsListed(true);
        setIsNFTListed(true);
      } else {
        console.log("An error has occured. Please try again. ", result);
        setMintPopUpProccesing(false);
        // setIsListed(false);
        setBlockchainError(true);
        setListingBlockchainError(result.message); // TODO: A vérifier si la clé est bien nommée message
      }
    } catch (error) {
      console.log(error);
      setListingBlockchainError(error.message);
      setMintPopUpProccesing(false);
      setBlockchainError(true);
      // setIsListed(false);
    }

    // Call blockchain si c'est bon alors setIsListed(true) sinon false
  };

  const handleListClosed = () => {
    setIsListed(false);
    setIsListClicked(false);
  };

  const handleListingErrorPreviousStepClick = () => {
    setBlockchainError(false);
    // setIsListed(false);
    // setIsListClicked(false);
  };

  const handleUnlistButton = () => {
    setIsUnlistClicked(true);
  };

  const handleUnlistPopup = async () => {
    // console.log("Bouton Annuler cliqué");
    const artifacts = require("../../contracts/Sofan.json");
    const { abi } = artifacts;
    const web3MarketplaceInstance = new web3.eth.Contract(
      abi,
      marketplaceAddress
    );
    // console.log(web3MarketplaceInstance);
    // console.log(typeof contract._address);
    try {
      setMintPopUpProccesing(true);
      // param 1: index
      // console.log(currentNftListingFromMarketplace);
      const result = await web3MarketplaceInstance.methods
        .cancelListing(parseInt(currentNftListingFromMarketplace))
        .send({ from: accounts[0] });
      if (result.status) {
        // console.log("Successfully unlist token");
        setMintPopUpProccesing(false);
        setisUnlist(true);
        setIsNFTListed(false);
      } else {
        console.log("An error has occured. Please try again. ", result);
        setMintPopUpProccesing(false);
        // setIsListed(false);
        setBlockchainError(true);
        setListingBlockchainError(result.message); // TODO: A vérifier si la clé est bien nommée message
      }
    } catch (error) {
      console.error(error);
      setListingBlockchainError(error.message);
      setMintPopUpProccesing(false);
      setBlockchainError(true);
    }
    // setisUnlist(true);
  };

  const handleUnlistClosed = () => {
    setisUnlist(false);
    setIsUnlistClicked(false);
  };

  // useEffect(() => {
  //   console.log(
  //     "USEEFFECTUSEEFFECTUSEEFFECTUSEEFFECTUSEEFFECTUSEEFFECTUSEEFFECTUSEEFFECTUSEEFFECTUSEEFFECT"
  //   );
  //   const init = async () => {
  //     // TODO: Ce useEffect est trigger quand la personne recharge la page car accounts se reset mais sera-t il trigger sans arrivé depuis un bouton?
  //     // TODO: Remplacer 0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a par la string de l'adresse du contrat depuis le backend
  //     // TODO: Remplacer "0" par la string du tokenId du contrat depuis le backend
  //     const collectionAddress = "0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a";
  //     const tokenId = "0";
  //     setCurrentNftTokenId(parseInt(tokenId));
  //     if (accounts) {
  //       let nftContractArtifact = require("../../contracts/SofanNftTemplate.json");
  //       // const nftContractAbi = nftContractArtifact.abi;
  //       const { abi: nftContractAbi } = nftContractArtifact;
  //       const nftContractInstance = new web3.eth.Contract(
  //         nftContractAbi,
  //         collectionAddress
  //       );
  //       let tempCurrentNftOwnerFromBlockchain;
  //       try {
  //         const result = await nftContractInstance.methods
  //           .ownerOf(parseInt(tokenId))
  //           .call({ from: accounts[0] });
  //         tempCurrentNftOwnerFromBlockchain = result;
  //         setcurrentNftOwnerFromBlockchain(tempCurrentNftOwnerFromBlockchain);
  //         console.log("je suis le resultat", result);
  //         console.log(tempCurrentNftOwnerFromBlockchain);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       if (accounts[0] === tempCurrentNftOwnerFromBlockchain) {
  //         console.log("je suis rentré");
  //         setIsNFTOwner(true);
  //         const artifacts = require("../../contracts/Sofan.json");
  //         const { abi } = artifacts;
  //         const web3MarketplaceInstance = new web3.eth.Contract(
  //           abi,
  //           marketplaceAddress
  //         );
  //         try {
  //           // handleListings(web3MarketplaceInstance, collectionAddress, tokenId);
  //           const result = await web3MarketplaceInstance.methods
  //             .getListing(accounts[0])
  //             .call({ from: accounts[0] });
  //           console.log("je suis getListing Result", result);
  //           for (let i = 0; i < result.length; i++) {
  //             const element = result[i];
  //             console.log("Je suis element", element);
  //             if (
  //               element.listingStauts === "1" &&
  //               element.contractAddress === collectionAddress &&
  //               element.tokenId === tokenId
  //             ) {
  //               setIsNFTListed(true);
  //               setListingPrice(element.price);
  //               setCurrentNftListingFromMarketplace(i);
  //               console.log("change state");
  //               break;
  //             }
  //             if (i === result.length - 1) {
  //               setListingPrice();
  //             }
  //           }
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       } else {
  //         // setIsNFTOwner(false);
  //         const artifacts = require("../../contracts/Sofan.json");
  //         const { abi } = artifacts;
  //         const web3MarketplaceInstance = new web3.eth.Contract(
  //           abi,
  //           marketplaceAddress
  //         );
  //         try {
  //           const result = await web3MarketplaceInstance.methods
  //             .getListing(tempCurrentNftOwnerFromBlockchain)
  //             .call({ from: accounts[0] });
  //           console.log("je suis getListing Result", result);
  //           if (result.length === 0) {
  //             setIsBuyListingButtonDisabled(true);
  //           } else {
  //             for (let i = 0; i < result.length; i++) {
  //               const element = result[i];
  //               console.log("Je suis element", element);

  //               if (
  //                 element.listingStauts === "1" &&
  //                 element.contractAddress === collectionAddress &&
  //                 element.tokenId === tokenId
  //               ) {
  //                 setListingPrice(element.price);
  //                 setIsBuyListingButtonDisabled(false);
  //                 setCurrentNftListingFromMarketplace(i);
  //                 console.log("change state");
  //                 break;
  //               }
  //             }
  //           }
  //         } catch (error) {
  //           console.error(error);
  //         }
  //         console.log("je suis ici");
  //       }
  //       setContractAddress(collectionAddress);
  //       console.log("Change Contract Address");
  //     }
  //   };

  //   init();
  // }, [accounts, isNFTOwner, isNFTListed]);
  return (
    <>
      <section className="nft-single-collection-page-container">
        <NftCollectionHeader
          athleteId={currentAthleteCollectionCreator?.id}
          currentOwnerInfo={currentTokenIdOwner}
          creatorName={currentAthleteCollectionCreator?.display_name}
          creatorProfilePic={currentAthleteCollectionCreator?.profile_avatar}
          ownerName={
            currentTokenIdOwner?.display_name
              ? currentTokenIdOwner?.display_name
              : concatStringFromTo(
                  currentTokenIdOwner?.externalWallet,
                  0,
                  4,
                  true,
                  true,
                  4
                )
          }
          ownerProfilePic={currentTokenIdOwner?.profile_avatar}
          knowMoreAboutCollection={
            currentNftCollectionInfoFromBackend?.know_more_collection
          }
          collectionAddress={collectionAddress}
          //
          // nftPriceEth={apiOpenSea[0].nftPriceEth}
          // nftPriceEur={apiOpenSea[0].nftPriceEur}
          // nftBidEth={apiOpenSea[0].nftBidEth}
          // nftBifEur={apiOpenSea[0].nftBidEur}
          // Api Alchemy
          collectionNameApi={
            currentNftCollectionInfoFromBackend?.collection_title
          }
          nftIdApi={currentNFTCollectionInfo?.tokenId}
          nftPicture={currentNFTCollectionInfo?.media[0]?.raw}
          // Api CoinGecko
          ethPrice={ethPrice}
          //
          // handleBuyNftButtonClick={handleBuyNftButtonClick} // Buy Now
          // handleBidNftButtonClick={handleBidNftButtonClick} // place a bid
          // handleListNftButton={handleListNftButton} // list
          // isNFTOwner={isNFTOwner} // comparer wallet de la session utilisateur et propriétaire du nft
          // isNFTListed={isNFTListed} // check listing status on contract
          // handleUnlistButton={handleUnlistButton} // unlist
          // // Change CSS
          // isBuyListingButtonDisabled={isBuyListingButtonDisabled}
          // // Pass Blockchain Data
          // listingPrice={listingPrice}
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
            // handleClickSubMenuButton={handleClickSubMenuButton}
            // isSubMenuClicked={isSubMenuClicked}
            // nftsPropertiesCounter={
            //   dataSinglePageNftCollection.propertiesData[0].properties.length
            // }
            //
            // isNftPropertiesExist={isNftPropertiesExist}
            // setIsNftPropertiesExist={setIsNftPropertiesExist}
            />
          </div>
          {isSubMenuClicked[0] && (
            <NftCollectionOverview
              // utilitiesArray={
              //   dataSinglePageNftCollection.overviewData[0].utilities
              // }
              utilitiesArray={utilities}
              loggedInUser={isLogged}
              knowMoreAboutCollection={
                currentNftCollectionInfoFromBackend?.know_more_collection
              }
              // latestBidsArray={
              //   dataSinglePageNftCollection.overviewData[0].latestBids
              // }
              ethPrice={ethPrice}
              currentAthleteCollectionCreator={currentAthleteCollectionCreator}
              collectionNameApi={
                currentNftCollectionInfoFromBackend?.collection_title
              }
              currentTokenIdOwner={currentTokenIdOwner}
            />
          )}
          {/* {isSubMenuClicked[1] && (
            <NftCollectionProperties
              properties={
                dataSinglePageNftCollection.propertiesData[0].properties
              }
              isNftPropertiesExist={isNftPropertiesExist}
            />
          )} */}
          {/* {isSubMenuClicked[2] && (
            <NftCollectionLatestsBids
              latestBidsArray={
                dataSinglePageNftCollection.overviewData[0].latestBids
              }
              bidsSectionDeleteSpace={true}
              ethPrice={ethPrice}
            />
          )} */}
          {/* {isSubMenuClicked[3] && (
            <>
              <div>
                <NftCollectionHistory
                  history={dataSinglePageNftCollection.history}
                  ethPrice={ethPrice}
                  handleBuyNftButtonClick={handleBuyNftButtonClick}
                />
              </div>
            </>
          )} */}
          <div className="nft-single-collection-page-more-about-athlete-container">
            <NftCollectionMoreAboutAthlete
              // moreAbout={dataSinglePageNftCollection.moreAbout}
              knowMoreAboutAthleteDisplayName={
                currentAthleteCollectionCreator?.display_name
              }
              knowMoreAboutAthleteProfileAvatar={
                currentAthleteCollectionCreator?.profile_avatar
              }
              knowMoreAboutAthleteSport={currentAthleteCollectionCreator?.sport}
              knowMoreAboutAthleteDescription={
                currentNftCollectionInfoFromBackend?.know_more_athlete_description
              }
              athleteId={currentAthleteCollectionCreator?.id}
              knowMoreAboutAthleteFanNumber={athleteFanNumber}
            />
          </div>
          <NftCollectionMoreAboutNft
            nftsFromContract={nftsFromContract}
            hidePrice={true}
            currentAthleteCollectionCreator={
              currentAthleteCollectionCreator?.display_name
            }
          />
        </div>
      </section>
      {isBuyNftButtonClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          setState={setIsBuyNftButtonClicked}
          setState2={setBlockchainError}
          setState3={setIsListingBuyed}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ top: "30px", right: "26px" }}
        >
          {isListingBuyed ? (
            <PopUpValidate
              text={"Félicitations ! Votre NFT a été acheté"}
              customWidth={"260px"}
              onClick={handleBuyListingClosed}
            />
          ) : (
            <PopUpBuyNft
              handleBuyListingPopup={handleBuyListingPopup}
              mintPopUpProccesing={mintPopUpProccesing}
              blockchainError={blockchainError}
              listingBlockchainError={listingBlockchainError}
              handleBlockchainListingErrorPreviousStepButtonClicked={
                handleListingErrorPreviousStepClick
              }
            />
          )}
        </Modal>
      )}
      {isBidNftButtonClicked && (
        <Modal
          dynamicPositionPopUpMargin={pixelScrolledAthleteProfilePage}
          setState={setIsBidNftButtonClicked}
          setState2={setBlockchainError}
          setState3={setIsBidPlaced}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ top: "30px", right: "26px" }}
        >
          {isBidPlaced ? (
            <PopUpValidate
              text={"Félicitations ! Votre offre a bien été prise en compte"}
              customWidth={"340px"}
              onClick={handlePlaceBidClosed}
            />
          ) : (
            <PopUpPlaceBid
              handlePlaceBidPopup={handlePlaceBidPopup}
              mintPopUpProccesing={mintPopUpProccesing}
              blockchainError={blockchainError}
              listingBlockchainError={listingBlockchainError}
              handleBlockchainListingErrorPreviousStepButtonClicked={
                handleListingErrorPreviousStepClick
              }
              bidPrice={bidPrice}
              handleBidPriceChange={handleBidPriceChange}
            />
          )}
        </Modal>
      )}
      {isListClicked && (
        <>
          <Modal
            style={{ top: "20px", right: "20px" }}
            setState={setIsListClicked}
            setState2={setBlockchainError}
            setState3={setIsListed}
            // setState4={setMintPopUpProccesing}
          >
            {isListed ? (
              <PopUpValidate
                text={"Félicitations ! Votre NFT a été mis en vente"}
                customWidth={"260px"}
                onClick={handleListClosed}
              />
            ) : (
              <PopupListNFT
                handlePopupListNFT={handleListingPopup}
                mintPopUpProccesing={mintPopUpProccesing}
                blockchainError={blockchainError}
                listingBlockchainError={listingBlockchainError}
                handleBlockchainListingErrorPreviousStepButtonClicked={
                  handleListingErrorPreviousStepClick
                }
                listingPrice={listingPrice}
                handleListingPriceChange={handleListingPriceChange}
              />
            )}
          </Modal>
        </>
      )}
      {isUnlistClicked && (
        <>
          <Modal
            style={{ top: "20px", right: "20px" }}
            setState={setIsUnlistClicked}
            setState2={setBlockchainError}
            setState3={setisUnlist}
            // setState4={setMintPopUpProccesing}
          >
            {isUnlist ? (
              <PopUpValidate
                text={"Votre NFT a été retiré de la vente"}
                onClick={handleUnlistClosed}
              />
            ) : (
              <PopUpUnlistNFT
                handlePopupUnlistNFT={handleUnlistPopup}
                mintPopUpProccesing={mintPopUpProccesing}
                blockchainError={blockchainError}
                listingBlockchainError={listingBlockchainError}
                handlePopupUnlistNFTClosed={handleUnlistClosed}
                handleBlockchainListingErrorPreviousStepButtonClicked={
                  handleListingErrorPreviousStepClick
                }
              />
            )}
          </Modal>
        </>
      )}
      {displayPopUpAddFundToWallet && (
        <>
          <Modal
            style={{ top: "20px", right: "20px" }}
            setState={() => setDisplayPopUpAddFundToWallet(false)}
          >
            <PopUpAddFundToWallet currentBalance={currentBalance} />
          </Modal>
        </>
      )}
    </>
  );
};

export default NftSingle;

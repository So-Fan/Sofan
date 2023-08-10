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
  const [mintPopUpProccesing, setMintPopUpProccesing] = useState(false);
  const [blockchainError, setBlockchainError] = useState();
  const [listingPrice, setListingPrice] = useState();
  const [bidPrice, setBidPrice] = useState("");
  const {
    setContractAddress,
    state: { contract, accounts, web3 },
    marketplaceAddress,
  } = useEth();

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
    // Autoriser le click uniquement quand nft listé
    if (!isBuyListingButtonDisabled) {
      // handleBidNftButtonClick = { handleBidNftButtonClick };
      setIsBuyNftButtonClicked(true);
    }
  }
  const [isListingBuyed, setIsListingBuyed] = useState();

  const handleBuyListingPopup = async () => {
    console.log("proceed to payment clicked");

    const artifact = require("../../Pages/Test/USDC.json");
    const { abi: usdcAbi } = artifact;
    // TODO: Call Sofan marketplace to get the addressUSDC
    let addressUSDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    let contractUSDCInstance = new web3.eth.Contract(usdcAbi, addressUSDC);
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
        .buyListing("0xd423DCBd697164e282717009044312fDBC6C04f0", 0)
        .send({ from: accounts[0] });
      if (result.status) {
        console.log("buy listing success");
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
      console.log(error);
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

  const [isBidPlaced, setIsBidPlaced] = useState();

  function handleBidNftButtonClick() {
    setIsBidNftButtonClicked(true);
  }

  // permet de n'accepter que les chiffres, les virgules et les points et le limiter à 18 décimales
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
    console.log(
      "tempBidPrice",
      tempBidPrice?.indexOf("."),
      " tempBidPrice",
      tempBidPrice,
      " slice ",
      tempBidPrice.slice(1, tempBidPrice.length).concat("0")
    );
  };

  const handlePlaceBidPopup = async () => {
    console.log("proceed to place a BID clicked");

    // Quand USDC
    var tempBidPrice;
    let tempDecimal = "000000000000000000";
    if (!bidPrice) {
      return; // afficher message veuillez mettre un prix > 0
    } else if (bidPrice.indexOf(".") === -1) {
      tempBidPrice = `${bidPrice}${tempDecimal}`;
    } else if (bidPrice.indexOf(".") === 0) {
      tempBidPrice = bidPrice.slice(1, bidPrice.length); // ajouter le bon nombre de 0
      // tempBidPrice = tempBidPrice.le
    }
    // if (tempBidPrice?.indexOf(".") == -1) {
    //   setBidPrice(tempBidPrice);
    // } else if (tempBidPrice?.indexOf(".") == 0) {
    //   setBidPrice("0.");
    // }

    const artifact = require("../../Pages/Test/USDC.json");
    const { abi: usdcAbi } = artifact;
    // TODO: Call Sofan marketplace to get the addressUSDC
    let addressUSDC = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    let contractUSDCInstance = new web3.eth.Contract(usdcAbi, addressUSDC);
    // let tempBidPrice;

    try {
      setMintPopUpProccesing(true);
      const result = await contractUSDCInstance.methods
        .approve(marketplaceAddress, parseInt(bidPrice))
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
  };

  const handlePlaceBidClosed = () => {
    setIsBidNftButtonClicked(false);
    setIsBidPlaced(false);
  };

  // END BID ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [isListClicked, setIsListClicked] = useState();
  const handleListNftButton = () => {
    setIsListClicked(true);
  };

  const [isListed, setIsListed] = useState();
  const [listingBlockchainError, setListingBlockchainError] = useState();

  const handleListingPopup = async () => {
    // TODO: Si pas connecté alors le bouton affiche un popup pour demander de sign up ou sign in
    console.log("Bouton Vendre cliqué");
    const artifacts = require("../../contracts/Sofan.json");
    const { abi } = artifacts;
    const web3MarketplaceInstance = new web3.eth.Contract(
      abi,
      marketplaceAddress
    );
    console.log(web3MarketplaceInstance);
    console.log(typeof contract._address);
    try {
      setMintPopUpProccesing(true);
      // param 1: address of nft contract 2: nft tokenId 3: price
      const result = await web3MarketplaceInstance.methods
        .listToSell(contract._address, 1, 1000000)
        .send({ from: accounts[0] });
      if (result.status) {
        console.log("Successfully list token");
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

  const [isUnlistClicked, setIsUnlistClicked] = useState();

  const handleUnlistButton = () => {
    setIsUnlistClicked(true);
  };

  const [isUnlist, setisUnlist] = useState();

  const handleUnlistPopup = async () => {
    console.log("Bouton Annuler cliqué");
    const artifacts = require("../../contracts/Sofan.json");
    const { abi } = artifacts;
    const web3MarketplaceInstance = new web3.eth.Contract(
      abi,
      marketplaceAddress
    );
    console.log(web3MarketplaceInstance);
    console.log(typeof contract._address);
    try {
      setMintPopUpProccesing(true);
      // param 1: index
      const result = await web3MarketplaceInstance.methods
        .cancelListing(0)
        .send({ from: accounts[0] });
      if (result.status) {
        console.log("Successfully list token");
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
      console.log(error);
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
  const [isNFTListed, setIsNFTListed] = useState(false);
  const [isNFTOwner, setIsNFTOwner] = useState(false);
  const [isBuyListingButtonDisabled, setIsBuyListingButtonDisabled] =
    useState(true);

  useEffect(() => {
    const init = async () => {
      // TODO: Ce useEffect est trigger quand la personne recharge la page car accounts se reset mais sera-t il trigger ?
      // TODO: Remplacer 0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a par la string de l'adresse du contrat depuis le backend
      // TODO: Remplacer "0" par la string du tokenId du contrat depuis le backend
      const collectionAddress = "0x3EdA1072dC656c1272f4442F43DF06d1DDC75a5a";
      const tokenId = "0";
      if (accounts) {
        let nftContractArtifact = require("../../contracts/SofanNftTemplate.json");
        // const nftContractAbi = nftContractArtifact.abi;
        const { abi: nftContractAbi } = nftContractArtifact;
        const nftContractInstance = new web3.eth.Contract(
          nftContractAbi,
          collectionAddress
        );
        let currentNftOwnerFromBlockchain;
        try {
          const result = await nftContractInstance.methods
            .ownerOf(parseInt(tokenId))
            .call({ from: accounts[0] });
          currentNftOwnerFromBlockchain = result;
          console.log("je suis le resultat", result);
          console.log(currentNftOwnerFromBlockchain);
        } catch (error) {
          console.log(error);
        }
        if (accounts[0] === currentNftOwnerFromBlockchain) {
          console.log("je suis rentré");
          setIsNFTOwner(true);
          const artifacts = require("../../contracts/Sofan.json");
          const { abi } = artifacts;
          const web3MarketplaceInstance = new web3.eth.Contract(
            abi,
            marketplaceAddress
          );
          try {
            // handleListings(web3MarketplaceInstance, collectionAddress, tokenId);
            const result = await web3MarketplaceInstance.methods
              .getListing(accounts[0])
              .call({ from: accounts[0] });
            console.log("je suis getListing Result", result);
            for (let i = 0; i < result.length; i++) {
              const element = result[i];
              console.log("Je suis element", element);

              if (
                element.listingStauts === "1" &&
                element.contractAddress === collectionAddress &&
                element.tokenId === tokenId
              ) {
                setIsNFTListed(true);
                console.log("change state");
                break;
              }
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          setIsNFTOwner(false);
          const artifacts = require("../../contracts/Sofan.json");
          const { abi } = artifacts;
          const web3MarketplaceInstance = new web3.eth.Contract(
            abi,
            marketplaceAddress
          );
          try {
            const result = await web3MarketplaceInstance.methods
              .getListing(currentNftOwnerFromBlockchain)
              .call({ from: accounts[0] });
            console.log("je suis getListing Result", result);
            if (result.length === 0) {
              setIsBuyListingButtonDisabled(true);
            } else {
              for (let i = 0; i < result.length; i++) {
                const element = result[i];
                console.log("Je suis element", element);

                if (
                  element.listingStauts === "1" &&
                  element.contractAddress === collectionAddress &&
                  element.tokenId === tokenId
                ) {
                  setListingPrice(element.price);
                  setIsBuyListingButtonDisabled(false);
                  console.log("change state");
                  break;
                }
              }
            }
          } catch (error) {
            console.error(error);
          }
          console.log("je suis ici");
        }
        setContractAddress(collectionAddress);
        console.log("Change Contract Address");
      }
    };

    init();
  }, [accounts]);

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
          handleBuyNftButtonClick={handleBuyNftButtonClick} // Buy Now
          handleBidNftButtonClick={handleBidNftButtonClick} // place a bid
          handleListNftButton={handleListNftButton} // list
          isNFTOwner={isNFTOwner} // comparer wallet de la session utilisateur et propriétaire du nft
          isNFTListed={isNFTListed} // check listing status on contract
          handleUnlistButton={handleUnlistButton} // unlist
          // Change CSS
          isBuyListingButtonDisabled={isBuyListingButtonDisabled}
          // Pass Blockchain Data
          listingPrice={listingPrice}
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
              nftsPropertiesCounter={
                dataSinglePageNftCollection.propertiesData[0].properties.length
              }
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
                  handleBuyNftButtonClick={handleBuyNftButtonClick}
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
          setState2={setBlockchainError}
          setState3={setIsListingBuyed}
          // style={{marginTop: pixelScrolledAthleteProfilePage}}
          style={{ top: "30px", right: "26px" }}
        >
          {isListingBuyed ? (
            <PopUpValidate
              text={"Félicitations ! Votre NFT a été acheté"}
              customWidth={"251px"}
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
              customWidth={"251px"}
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
                customWidth={"251px"}
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
    </>
  );
};

export default NftSingle;

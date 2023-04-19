// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./SofanFactory.sol";
import "./SofanNftTemplate.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Sofan is Ownable, ReentrancyGuard {
    address payable public sofan = payable(address(this)); // a delete + tard
    address sofanFactory = 0x0fC5025C764cE34df352757e82f7B5c4Df39A836;
    enum BidStatus {waiting, accepted, refused}
    enum ListingStatus {selled, Listed}
    struct Bid {
        uint256 price;
        address contractAddress;
        uint256 tokenId;
        address sender;
        BidStatus bidStatus;
    }
    struct Listing{
        address contractAddress;
        uint256 tokenId;
        uint256 price;
        address seller;
        ListingStatus listingStauts;
    }
    mapping(address => address[]) public CollectionCreatedByWallet;
    mapping(address => mapping(uint256 => Bid[])) public BidMapping;
    mapping(address => Listing[]) public ListingMapping;
   

    function setFactoryAddress(address _newAddress) external onlyOwner {
        sofanFactory = _newAddress;
    }

    function placeBid(
        address _contract,
        uint256 _tokenId,
        uint256 _offerPrice
    ) public payable{
        require(_offerPrice > 0, "Cannot place a bid at 0 ETH !");
        require(msg.value >= _offerPrice, "Please transfer the right amount of ETH !");
        Bid memory temp = Bid(_offerPrice, _contract, _tokenId, msg.sender, BidStatus.waiting);
        BidMapping[_contract][_tokenId].push(temp);
    }


    // ajouter addresse du detenteur dans struc Bid et checker que le détenteur est toujours cette addresse. Afin d'éviter : si je place une offre le gars transfere a quelq'un d'autre et ce quelqu'un d'autre accepte mon offre. De plus accepter la bid doit changer le status de tout les autres bid concerant ce NFT => potentiel rework du mapping en commencant par l'addresse du détenteur.
    function acceptBid(
        address _contract,
        uint256 _tokenId,
        uint256 _indexOfBid
    ) external payable nonReentrant {
        require(BidMapping[_contract][_tokenId][_indexOfBid].price > 0, "Bid doesn't exist");
        require(msg.sender == SofanNftTemplate(_contract).ownerOf(_tokenId), "You're not the owner !");
        SofanNftTemplate(_contract).approveCustom(address(this), _tokenId, msg.sender); 
        address temp = msg.sender;
        SofanNftTemplate(_contract).transferFrom(temp, BidMapping[_contract][_tokenId][_indexOfBid].sender, _tokenId);
        BidMapping[_contract][_tokenId][_indexOfBid].bidStatus = BidStatus.accepted;
        (bool success, ) = msg.sender.call{
            value: BidMapping[_contract][_tokenId][_indexOfBid].price
        }("");
        require(success, "Transfer failed.");
    }

    function refuseBid(
        address _contract,
        uint256 _tokenId,
        uint256 _indexOfBid
    ) external nonReentrant {
        require(msg.sender == SofanNftTemplate(_contract).ownerOf(_tokenId), "You're not the owner !");
        BidMapping[_contract][_tokenId][_indexOfBid].bidStatus = BidStatus.refused;
        (bool success, ) = payable(address(BidMapping[_contract][_tokenId][_indexOfBid].sender)).call{value: BidMapping[_contract][_tokenId][_indexOfBid].price}("");
        require(success, "Transfer failed.");
    }

    function listToSell(
        address _contract,
        uint256 _tokenId,
        uint256 _price
    ) external payable  nonReentrant {
        require(msg.sender == SofanNftTemplate(_contract).ownerOf(_tokenId), "You're not the owner !");
        require(_price > 0, "Cannot list for 0 !");
        Listing memory listing = Listing(_contract, _tokenId, _price, msg.sender, ListingStatus.Listed);
        ListingMapping[msg.sender].push(listing);
        SofanNftTemplate(_contract).approveCustom(address(this), _tokenId, msg.sender);
        address temp = msg.sender;
        SofanNftTemplate(_contract).transferFrom(temp, address(this), _tokenId);
    }

    function buyListing(
        address _sellerAddress,
        uint _indexLinsting
    ) external payable nonReentrant{
        // require(ListingMapping[_sellerAddress][_indexLinsting].seller == SofanNftTemplate(ListingMapping[_sellerAddress][_indexLinsting].contractAddress).ownerOf(ListingMapping[_sellerAddress][_indexLinsting].tokenId), "Seller is not the owner");
        require(msg.value >= ListingMapping[_sellerAddress][_indexLinsting].price, "Not enough ETH send !");
        ListingMapping[_sellerAddress][_indexLinsting].listingStauts = ListingStatus.selled;
        SofanNftTemplate(ListingMapping[_sellerAddress][_indexLinsting].contractAddress).transferFrom(address(this), msg.sender, ListingMapping[_sellerAddress][_indexLinsting].tokenId);
        (bool success, ) = payable(address(ListingMapping[_sellerAddress][_indexLinsting].seller)).call{value: ListingMapping[_sellerAddress][_indexLinsting].price}("");
        require(success, "Transfer failed.");
    }

    function deployCollection(
        string memory _collectionName,
        string memory _collectionSymbol,
        string memory _collectionBaserURI,
        uint8 _limitByWallet,
        uint256 _collectionLimit,
        uint256 _launchpadTime,
        bool _isAbleChangeMaxLimitCollection,
        uint256 _price
    ) public payable {
        require(sofanFactory != address(0), "Please set a factory address !");
        address collectionAddress = SofanFactory(sofanFactory).deploy(
            _collectionName,
            _collectionSymbol,
            _collectionBaserURI,
            _limitByWallet,
            _collectionLimit,
            _launchpadTime,
            _isAbleChangeMaxLimitCollection,
            _price
        );
        CollectionCreatedByWallet[msg.sender].push(collectionAddress);
        // test only, will be delete
        SofanNftTemplate(collectionAddress).mint{value: msg.value}(msg.sender, 1);
    }

     // delete after test
    constructor() {
        string memory _t = "a"; string memory _r = "a"; string memory _e = "a";
        deployCollection(_t, _r, _e, 0, 10, 0, true, 0);
    }
}

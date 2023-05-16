// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./SofanFactory.sol";
import "./SofanNftTemplate.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Sofan is Ownable, ReentrancyGuard {
    address payable public sofan = payable(address(this)); // a delete + tard
    address sofanMultiSig = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address sofanFactory = 0xf8e81D47203A594245E36C48e151709F0C19fBe8;
    address[] sofanCollection;
    // address[] atheleteAddress;
    enum BidStatus {waiting, accepted, refused}
    enum ListingStatus {selled, Listed}
    struct Bid {
        uint256 price;
        address contractAddress;
        uint256 tokenId;
        address sender;
        BidStatus bidStatus;
        address receiver;
    }
    struct Listing{
        address contractAddress;
        uint256 tokenId;
        uint256 price;
        address seller;
        ListingStatus listingStauts;
    }
    mapping(address => address[]) public CollectionCreatedByWallet;
    // Détenteur => contrat => tokenId
    mapping(address => mapping(address => mapping(uint256 => Bid[]))) public BidMapping;
    mapping(address => Listing[]) public ListingMapping;
    mapping(address => bool) isAthlete;
    

    function setFactoryAddress(address _newAddress) external onlyOwner {
        sofanFactory = _newAddress;
    }

    function placeBid(
        address _contract,
        uint256 _tokenId,
        uint256 _offerPrice,
        address _receiver
    ) public payable{
        require(_offerPrice > 0, "Cannot place a bid at 0 ETH !");
        require(msg.value >= _offerPrice, "Please transfer the right amount of ETH !");
        require(_receiver == SofanNftTemplate(_contract).ownerOf(_tokenId), "Receiver is not the owner !");
        Bid memory temp = Bid(_offerPrice, _contract, _tokenId, msg.sender, BidStatus.waiting, _receiver);
        BidMapping[_receiver][_contract][_tokenId].push(temp);
    }

    function acceptBid(
        address _contract,
        uint256 _tokenId,
        uint256 _indexOfBid
    ) external payable nonReentrant {
        require(BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].price > 0, "Bid doesn't exist");
        require(msg.sender == SofanNftTemplate(_contract).ownerOf(_tokenId), "You're not the owner !");
        require(msg.sender == BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].receiver, "You're not the receiver !");
        
        // Change bid status of '_tokenId' to 'accepted' and other to 'refused' 
        for (uint32 i = 0; i < BidMapping[msg.sender][_contract][_tokenId].length; i++) 
        {
            if (i == _indexOfBid) {
                BidMapping[msg.sender][_contract][_tokenId][i].bidStatus = BidStatus.accepted;
            } else {
                BidMapping[msg.sender][_contract][_tokenId][i].bidStatus = BidStatus.refused;
            }
        }

        SofanNftTemplate(_contract).approveCustom(address(this), _tokenId, msg.sender); 
        address temp = msg.sender;
        SofanNftTemplate(_contract).transferFrom(temp, BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].sender, _tokenId);
        (bool success, ) = msg.sender.call{
            value: BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].price
        }("");
        require(success, "Transfer failed.");
    }

    function refuseBid(
        address _contract,
        uint256 _tokenId,
        uint256 _indexOfBid
    ) external nonReentrant {
        require(msg.sender == SofanNftTemplate(_contract).ownerOf(_tokenId), "You're not the owner !");
        BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].bidStatus = BidStatus.refused;
        (bool success, ) = payable(address(BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].sender)).call{value: BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].price}("");
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

    function addCollectionManually(address _collection) external onlyOwner{
        sofanCollection.push(_collection);
    }

    function deployCollection(
        string memory _collectionName,
        string memory _collectionSymbol,
        string memory _collectionBaserURI,
        uint8 _limitByWallet,
        uint256 _collectionLimit,
        uint256 _launchpadTime,
        bool _isAbleChangeMaxLimitCollection,
        uint256 _price,
        address _splitterAddress,
        uint96 _percentInBips // 2.5% = 250
    ) public payable {
        require(sofanFactory != address(0), "Please set a factory address !");
        require(isAthlete[msg.sender] == true || msg.sender == sofanMultiSig, "Deploy is allowed for athlete or Sofan, please reach our team !");
        address collectionAddress = SofanFactory(sofanFactory).deploy(
            _collectionName,
            _collectionSymbol,
            _collectionBaserURI,
            _limitByWallet,
            _collectionLimit,
            _launchpadTime,
            _isAbleChangeMaxLimitCollection,
            _price,
            _splitterAddress,
            _percentInBips // 2.5% = 250
        );
        CollectionCreatedByWallet[msg.sender].push(collectionAddress);
        sofanCollection.push(collectionAddress);
        // test only, will be delete
        SofanNftTemplate(collectionAddress).mint{value: msg.value}(msg.sender, 1);
    }

     // delete after test
    constructor() payable {
        string memory _t = "a"; string memory _r = "a"; string memory _e = "a";
        deployCollection(_t, _r, _e, 0, 10, 0, true, 1000000000000000000, address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4), 250);
    }
}

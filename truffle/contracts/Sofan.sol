// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./SofanFactory.sol";
import "./SofanNftTemplate.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Sofan is Ownable, ReentrancyGuard {
    address payable public sofan = payable(address(this)); // a delete + tard
    address sofanFactory = 0x9bF88fAe8CF8BaB76041c1db6467E7b37b977dD7;
    enum BidStatus {waiting, accepted, refused}
    enum ListingStatus {nonList, Listed}
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


    function acceptBid(
        address _contract,
        uint256 _tokenId,
        uint256 _indexOfBid
    ) external payable nonReentrant {
        require(BidMapping[_contract][_tokenId][_indexOfBid].price > 0, "Bid doesn't exist");
        require(msg.sender == SofanNftTemplate(_contract).ownerOf(_tokenId), "You're not the owner !");
        // SofanNftTemplate(_contract).approve(BidMapping[_contract][_tokenId][_indexOfBid].sender, _tokenId);
        SofanNftTemplate(_contract).transferFrom(msg.sender, BidMapping[_contract][_tokenId][_indexOfBid].sender, _tokenId);
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
        SofanNftTemplate(_contract).approveCustom(address(this), _tokenId, msg.sender);
        address temp = msg.sender;
        SofanNftTemplate(_contract).transferFrom(temp, address(this), _tokenId);
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
    constructor(string memory _t, string memory _r, string memory _e) {
        
        deployCollection(_t, _r, _e, 0, 10, 0, true, 0);
    }
}

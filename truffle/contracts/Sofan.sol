// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./SofanFactory.sol";
import "./SofanNftTemplate.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "./Proxy.sol";
contract Sofan is Ownable, ReentrancyGuard {
    address sofanMultiSig = 0xd423DCBd697164e282717009044312fDBC6C04f0;
    address sofanFactory = 0x752B58Fc75A746470AE398beD781A4A7825dd3b0;
    // 0x07865c6E87B9F70255377e024ace6630C1Eaa37F 0x98339D8C260052B7ad81c28c16C0b98420f2B46a
    address usdcAddress = 0x07865c6E87B9F70255377e024ace6630C1Eaa37F;
    IERC20 public usdc = IERC20(usdcAddress);
    address[] public sofanCollection;
    // address[] atheleteAddress;
    enum BidStatus {waiting, accepted, refused}
    enum ListingStatus {selled, Listed, canceled}
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
    mapping(address => bool) public isAthlete;
    
    //    // delete after test
    // constructor() payable {
    //     string memory _t = "a"; string memory _r = "a"; string memory _e = "a"; address[] memory _p = new address[](1); uint256[] memory _s = new uint256[](1);
    //     _p[0] = 0xd423DCBd697164e282717009044312fDBC6C04f0; _s[0] = 1;
    //     deployCollection(_t, _r, _e, 0, 10, 0, true, 1000000, _p, _s, 250);
    // }

    
    function getCollectionCreatedByWallet(address _walletAddress) external view returns(address[] memory){
        address[] memory temp = new address[](CollectionCreatedByWallet[_walletAddress].length);
        for (uint32 i = 0; i < CollectionCreatedByWallet[_walletAddress].length; i++) 
        {
            temp[i] = CollectionCreatedByWallet[_walletAddress][i];
        }
        return temp;
    }

    function getBid(address _receiver, address _contract, uint _tokenId) external view returns(Bid[] memory){
        Bid[] memory temp = new Bid[](BidMapping[_receiver][_contract][_tokenId].length);
        for (uint32 i = 0; i < BidMapping[_receiver][_contract][_tokenId].length; i++) 
        {
            temp[i] = BidMapping[_receiver][_contract][_tokenId][i];
        }
        return temp;
    }

    function getListing(address _seller) external view returns(Listing[] memory){
        Listing[] memory temp = new Listing[](ListingMapping[_seller].length);
        for (uint32 i = 0; i < ListingMapping[_seller].length; i++) 
        {
            temp[i] = ListingMapping[_seller][i];
        }
        return temp;
    }

    function setAthlete(address _athleteAddress, bool _permission) external onlyOwner {
        isAthlete[_athleteAddress] = _permission;
    }

    function setFactoryAddress(address _newAddress) external onlyOwner {
        sofanFactory = _newAddress;
    }

    function setSofanWallet(address _newSofanWallet) external onlyOwner {
        sofanMultiSig = _newSofanWallet;
    }

    function SetUSDCAddress(address _newUSDCAddress) external onlyOwner {
        usdcAddress = _newUSDCAddress;
    }

     function placeBid(
        address _contract,
        uint256 _tokenId,
        uint256 _offerPrice,
        address _receiver
    ) public{
        require(_offerPrice > 0, "Cannot place a bid at 0 USDC !");
        require(usdc.allowance(msg.sender, address(this)) >= _offerPrice, "Please transfer the right amount of USDC !");
        require(_receiver == SofanNftTemplate(_contract).ownerOf(_tokenId), "Receiver is not the owner !");

        Bid memory temp = Bid(_offerPrice, _contract, _tokenId, msg.sender, BidStatus.waiting, _receiver);
        BidMapping[_receiver][_contract][_tokenId].push(temp);
    }

     function acceptBid(
        address _contract,
        uint256 _tokenId,
        uint256 _indexOfBid
    ) external nonReentrant {
        require(msg.sender == SofanNftTemplate(_contract).ownerOf(_tokenId), "You're not the owner !");
        require(msg.sender == BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].receiver, "You're not the receiver !");
        require(BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].bidStatus == BidStatus.waiting, "Bid is already accepted or refused");
        require(usdc.allowance(BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].sender, address(this)) >= BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].price, "The sender canceled the allowance of USDC !");
        require(usdc.balanceOf(BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].sender) >= BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].price, "The sender doesn't have enought USDC");

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
        SofanNftTemplate(_contract).transferFrom(msg.sender, BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].sender, _tokenId);
        (address splitter, uint256 royaltiesAmount) = SofanNftTemplate(_contract).royaltyInfo(_tokenId, BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].price);
        bool success3 = usdc.transferFrom(BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].sender, splitter, royaltiesAmount);
        require(success3, "Transaction was not successful");
        bool success2 = usdc.transferFrom(BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].sender, msg.sender, (BidMapping[msg.sender][_contract][_tokenId][_indexOfBid].price - royaltiesAmount));
        require(success2, "Transaction was not successful");
    }

    function cancelBid(
        address _contract,
        uint256 _tokenId,
        address _receiver,
        uint _index
        ) public {
        require(BidMapping[_receiver][_contract][_tokenId][_index].bidStatus == BidStatus.waiting, "Bid is already accepted or refused");
        BidMapping[_receiver][_contract][_tokenId][_index].bidStatus = BidStatus.refused;
    }

    function listToSell(
        address _contract,
        uint256 _tokenId,
        uint256 _price
    ) external  nonReentrant {
        require(msg.sender == SofanNftTemplate(_contract).ownerOf(_tokenId), "You're not the owner !");
        require(_price > 0, "Cannot list for 0 !");
        Listing memory listing = Listing(_contract, _tokenId, _price, msg.sender, ListingStatus.Listed);
        ListingMapping[msg.sender].push(listing);
        SofanNftTemplate(_contract).approveCustom(address(this), _tokenId, msg.sender);
    }

    function buyListing(
        address _sellerAddress,
        uint _indexLinsting
    ) external nonReentrant{
        require(SofanNftTemplate(ListingMapping[_sellerAddress][_indexLinsting].contractAddress).getApproved(ListingMapping[_sellerAddress][_indexLinsting].tokenId) == address(this), "The seller need to approve the marketplace !");
        require(SofanNftTemplate(ListingMapping[_sellerAddress][_indexLinsting].contractAddress).ownerOf(ListingMapping[_sellerAddress][_indexLinsting].tokenId) == ListingMapping[_sellerAddress][_indexLinsting].seller, "The seller is not the token owner !");
        require(ListingMapping[_sellerAddress][_indexLinsting].listingStauts == ListingStatus.Listed, "Listing is already canceled or selled");
        require(usdc.allowance(msg.sender, address(this)) >= ListingMapping[_sellerAddress][_indexLinsting].price, "You don't allow enought USDC !");
        require(usdc.balanceOf(msg.sender) >= ListingMapping[_sellerAddress][_indexLinsting].price, "You don't have enought USDC in your balance !");
        ListingMapping[_sellerAddress][_indexLinsting].listingStauts = ListingStatus.selled;
        SofanNftTemplate(ListingMapping[_sellerAddress][_indexLinsting].contractAddress).transferFrom(ListingMapping[_sellerAddress][_indexLinsting].seller, msg.sender, ListingMapping[_sellerAddress][_indexLinsting].tokenId);

        (address splitter, uint256 royaltiesAmount) = SofanNftTemplate(ListingMapping[_sellerAddress][_indexLinsting].contractAddress).royaltyInfo(ListingMapping[_sellerAddress][_indexLinsting].tokenId, ListingMapping[_sellerAddress][_indexLinsting].price);
        bool success3 = usdc.transferFrom(msg.sender, splitter, royaltiesAmount);
        require(success3, "Transaction was not successful");
        bool success2 = usdc.transferFrom(msg.sender, ListingMapping[_sellerAddress][_indexLinsting].seller, (ListingMapping[_sellerAddress][_indexLinsting].price - royaltiesAmount));
        require(success2, "Transction was not successful");
    }

    function cancelListing(uint _index) external {
        require(ListingMapping[msg.sender][_index].listingStauts == ListingStatus.Listed, "Listing is already canceled or selled");
        ListingMapping[msg.sender][_index].listingStauts = ListingStatus.canceled;
    }

    function addCollectionManually(address _collection) external onlyOwner{
        sofanCollection.push(_collection);
    }
    
    function deployCollection(
        string memory _collectionName,
        string memory _collectionSymbol,
        string memory _collectionBaseURI,
        uint8 _limitByWallet,
        uint256 _collectionLimit,
        uint256 _launchpadTime,
        bool _isAbleChangeMaxLimitCollection,
        uint256 _price,
        address[] memory _payees,
        uint256[] memory _shares_,
        uint96 _percentInBips // 2.5% = 250
    ) public payable {
        require(sofanFactory != address(0), "Please set a factory address !");
        require(isAthlete[msg.sender] == true || msg.sender == sofanMultiSig, "Deploy is allowed for athlete or Sofan, please reach our team !");

        string[3] memory collectionData2 = [_collectionName, _collectionSymbol, _collectionBaseURI];
        uint[4] memory collectionData = [_limitByWallet, _collectionLimit, _launchpadTime, _price];
        bool isAbleChangeMaxLimitCollection = _isAbleChangeMaxLimitCollection;
        uint96 percentInBips = _percentInBips;
        address splitterAddress =  SofanFactory(sofanFactory).deploySplitter(
            _payees,
            _shares_
        );

        address collectionAddress = SofanFactory(sofanFactory).deploy(
            collectionData2,
            collectionData,
            isAbleChangeMaxLimitCollection,
            percentInBips,
            splitterAddress
        );
        CollectionCreatedByWallet[msg.sender].push(collectionAddress);
        sofanCollection.push(collectionAddress);
    }

  
    
}
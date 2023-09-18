// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "erc721a/contracts/ERC721A.sol";
import "erc721a/contracts/IERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DefaultOperatorFilterer.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// ["CollectionName", "CollectionSymbol", "https://url.com/"]
// [0,100,0,1000000]
// true
// 0xd9145CCE52D386f254917e481eB44e9943F39138
// 100
contract SofanNft is
    ERC721A,
    ERC2981,
    Ownable,
    ReentrancyGuard,
    DefaultOperatorFilterer
{
    string public uri; // not pub
    bool public isLimitByWallet; 
    uint256 public limitByWallet;
    //TODO: Add bool for collection Limit or if == 0 then can mint + add a func to change Collection Limit
    uint256 public collectionLimit;
    // bool isLaunchpad;
    // TODO: DONE delete deployDate and set launchpadTime to a futur timestamp instead of adding time to deployDate in order to optimize gas fee
    uint256 public launchpadTime;
    // uint256 public deployDate; // not pub
    bool public isAbleChangeMaxLimitCollection;
    // mapping(address => uint256) public NftOwned;
    address public SofanWallet;
    address public AthleteWallet;
    uint256 public price;
    // address public SofanSplitter;
    // 0x07865c6E87B9F70255377e024ace6630C1Eaa37F 0x98339D8C260052B7ad81c28c16C0b98420f2B46a
    IERC20 public usdc;
    // Check if can put 0x07865c6E87B9F70255377e024ace6630C1Eaa37F into an address var and try to change var
    constructor(
        string[3] memory _collectionData2,
        // string memory _collectionName,
        // string memory _collectionSymbol,
        // string memory _collectionBaserURI,
        uint256[4] memory _collectionData,
        // uint256 _limitByWallet,
        // uint256 _collectionLimit,
        // uint256 _launchpadTime,
        bool _isAbleChangeMaxLimitCollection,
        // uint256 _price,
        address _splitterAddress,
        uint96 _percentInBips // 2.5% = 250
    ) ERC721A(_collectionData2[0], _collectionData2[1]) {
        uri = _collectionData2[2];
        if (_collectionData[0] != 0) {
            limitByWallet = _collectionData[0];
            isLimitByWallet = true;
        }
        collectionLimit = _collectionData[1];
        if (_collectionData[2] != 0) {
            launchpadTime = _collectionData[2];
            // isLaunchpad = true;
        }

        // deployDate = block.timestamp;
        isAbleChangeMaxLimitCollection = _isAbleChangeMaxLimitCollection;
        price = _collectionData[3];
        // SofanSplitter = _splitterAddress;
        setRoyaltyInfo(_splitterAddress, _percentInBips);
    }
    function setUsdcAddress(address _newUSDCAddress) external onlyOwner{
        usdc = IERC20(_newUSDCAddress);
    }
    function setAthleteWallet(address _newAthleteWallet) external onlyOwner{
        AthleteWallet = _newAthleteWallet;
    }
    function setSofanWallet(address _newSofanWallet) external onlyOwner{
        SofanWallet = _newSofanWallet;
    }
    // _amount is a useless parameter but a helper for our front end as no event
    function mint(
        address _to,
        uint256 _quantity,
        uint256 _amount
    ) external payable nonReentrant {
        require(
            ERC721A._nextTokenId() + _quantity <= collectionLimit,
            "Limit of collection NFT reached or too much NFTs asked"
        );
        if (isLimitByWallet == true) // Optimize this for fees
        {
            require(
                (ERC721A.balanceOf(_to) + _quantity) <= limitByWallet,
                "Limit of owned NFT reached or too much NFTs asked"
            );
        }
        // if(isLaunchpad == true){
        require(
            // block.timestamp >= deployDate + launchpadTime,
            block.timestamp >= launchpadTime,
            "Cannot mint. Check Launchpad date !"
        );
        // }
        require(
            usdc.allowance(msg.sender, address(this)) >= _amount,
            "Please make sure you have approve enough USDC !"
        );
        require(
            _amount >= price * _quantity,
            "Not enough USDC sent; check price!"
        );
        // transfer only if price > 0. What if price = 1
        if(price !=0){
        bool success = usdc.transferFrom(msg.sender, address(this), _amount);
        require(success, "Transction was not successful");

        uint256 toAthleteTemp = SafeMath.mul(_amount, 80);
        uint256 toAthlete = SafeMath.div(toAthleteTemp, 100);
        bool success2 = usdc.transfer(AthleteWallet, toAthlete);
        require(success2, "Transaction was not successful");

        uint256 toSofanTemp = SafeMath.mul(_amount, 20);
        uint256 toSofan = SafeMath.div(toSofanTemp, 100);
        bool success3 = usdc.transfer(SofanWallet, toSofan);
        require(success3, "Transaction was not successful");
        // NftOwned[_to] = NftOwned[_to] + _quantity;
        _mint(_to, _quantity);
        }
    }

    function withdrawUSDC() public onlyOwner {
        require(usdc.balanceOf(address(this)) > 0, "No USDC in the contract");
        uint256 balance = usdc.balanceOf(address(this));
        usdc.approve(msg.sender, balance);
        usdc.transfer(msg.sender, balance);
    }

    function activeMintManually() external onlyOwner {
        launchpadTime = 0 seconds;
    }

    function setLimitWallet(uint256 _newLimit) external onlyOwner {
        if (_newLimit > 0) {
            isLimitByWallet = true; // Optimize this for fees
            limitByWallet = _newLimit;
        } else {
            isLimitByWallet = false;
        }
    }

    function changeLimitOfMaxCollection(uint32 _newLimit) external onlyOwner {
        require(isAbleChangeMaxLimitCollection, "Cannot Change Limit");
        collectionLimit = _newLimit;
    }

    /**
     * @dev set a new base uri.
     * example : https://website.com/ipfs/CID/
     */
    function setBaseURI(string memory _uri) external {
        require(
            keccak256(abi.encodePacked(_uri)) !=
                keccak256(abi.encodePacked(uri)),
            "The URI is already set to the exact same URI !"
        );
        uri = _uri;
    }

    /**
     * @dev see chiru-labs ERC721A documentation
     */
    function _baseURI() internal view override returns (string memory) {
        return uri;
    }

    /**
     * @dev return the tokenURI of a NFT
     *
     * Requirements:
     *
     * - Cannot get the URI of unexistent tokenID.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length != 0
                ? string(abi.encodePacked(baseURI, _toString(tokenId), ".json"))
                : "";
    }

    event temp(address msgSender);

    // function approveCustom(
    //     address to,
    //     uint256 tokenId,
    //     address _msgSender
    // ) public payable onlyAllowedOperatorApproval(to) {
    //     address owner = ERC721A.ownerOf(tokenId);

    //     if (_msgSender != owner) {
    //         if (!isApprovedForAll(owner, _msgSender)) {
    //             revert ApprovalCallerNotOwnerNorApproved();
    //         }
    //     }

    //     ERC721A._tokenApprovals[tokenId].value = to;
    //     emit IERC721A.Approval(owner, to, tokenId);
    // }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC2981, ERC721A) returns (bool) {
        return
            interfaceId == type(IERC2981).interfaceId ||
            interfaceId == 0x01ffc9a7 ||
            interfaceId == 0x80ac58cd ||
            interfaceId == 0x5b5e139f ||
            super.supportsInterface(interfaceId);
    }

    //ERC2981
    function setRoyaltyInfo(
        address _receiver,
        uint96 _royaltyFeesInBips
    ) public onlyOwner {
        _setDefaultRoyalty(_receiver, _royaltyFeesInBips);
    }

    // Opensea
    function setApprovalForAll(
        address operator,
        bool approved
    ) public override onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function approve(
        address operator,
        uint256 tokenId
    ) public payable override onlyAllowedOperatorApproval(operator) {
        super.approve(operator, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable override onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public payable override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId, data);
    }
}

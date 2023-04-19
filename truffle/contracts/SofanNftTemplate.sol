// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "../node_modules/erc721a/contracts/ERC721A.sol";
import "../node_modules/erc721a/contracts/IERC721A.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./DefaultOperatorFilterer.sol";
contract SofanNftTemplate is ERC721A, Ownable, ReentrancyGuard, DefaultOperatorFilterer {
    string uri;
    bool isLimitByWallet;
    uint8 limitByWallet;
    uint256 public collectionLimit;
    // bool isLaunchpad;
    uint256 launchpadTime;
    uint256 deployDate;
    bool isAbleChangeMaxLimitCollection;
    mapping(address => uint256) public NftOwned;
    address SofanWallet = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address AthleteWallet = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    uint256 price;

    constructor(
        string memory _collectionName,
        string memory _collectionSymbol,
        string memory _collectionBaserURI,
        uint8 _limitByWallet,
        uint256 _collectionLimit,
        uint256 _launchpadTime,
        bool _isAbleChangeMaxLimitCollection,
        uint256 _price
    ) ERC721A(_collectionName, _collectionSymbol) {
        uri = _collectionBaserURI;
        if (_limitByWallet != 0) {
            limitByWallet = _limitByWallet;
            isLimitByWallet = true;
        }
        collectionLimit = _collectionLimit;
        if (_launchpadTime != 0) {
            launchpadTime = _launchpadTime;
            // isLaunchpad = true;
        }

        deployDate = block.timestamp;
        isAbleChangeMaxLimitCollection = _isAbleChangeMaxLimitCollection;
        price = _price;
    }

    function mint(address _to, uint256 _quantity)
        external
        payable
        nonReentrant
    {
        require(
            ERC721A._currentIndex + _quantity <= collectionLimit,
            "Limit of collection NFT reached or too much NFTs asked"
        );
        if (isLimitByWallet == true) // Optimize this for fees
        {
            require(
                (NftOwned[_to] + _quantity) <= limitByWallet,
                "Limit of owned NFT reached or too much NFTs asked"
            );
        }
        // if(isLaunchpad == true){
        require(
            block.timestamp >= deployDate + launchpadTime,
            "Cannot mint. Check Launchpad date !"
        );
        // }
        require(
            msg.value >= price * _quantity,
            "Not enough ETH sent; check price!"
        );
        (bool success2, ) = payable(AthleteWallet).call{
            value: ((address(this).balance * 80) / 100)
        }("");
        require(success2, "Transfer failed.");
        (bool success, ) = payable(SofanWallet).call{
            value: ((address(this).balance * 100) / 100)
        }("");
        require(success, "Transfer failed.");
        NftOwned[_to] = NftOwned[_to] + _quantity;
        _mint(_to, _quantity);
    }

    function activeMintManually() external onlyOwner {
        launchpadTime = 0 seconds;
    }

    function setLimitWallet(uint8 _newLimit) external onlyOwner {
        if (_newLimit > 0) {
            isLimitByWallet = true; // Optimize this for fees
            limitByWallet = _newLimit;
        } else {
            isLimitByWallet = false;
        }
    }

    function changeLimitOfMaxCollection(uint256 _newLimit) external onlyOwner {
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
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length != 0
                ? string(abi.encodePacked(baseURI, _toString(tokenId), ".json"))
                : "";
    }
    event temp (
        address msgSender
    );

    function approveCustom(address to, uint256 tokenId, address _msgSender) public payable {
        address owner = ERC721A.ownerOf(tokenId);

        if (_msgSender != owner){
            if (!isApprovedForAll(owner, _msgSender)) {
                revert ApprovalCallerNotOwnerNorApproved();
            }
        }

        ERC721A._tokenApprovals[tokenId].value = to;
        emit IERC721A.Approval(owner, to, tokenId);
    }



    // besoin de revoir les approve de Sofan avec ça
    // function setApprovalForAll(address operator, bool approved) public override onlyAllowedOperatorApproval(operator) {
    //     super.setApprovalForAll(operator, approved);
    // }

    // function approve(address operator, uint256 tokenId) public payable override onlyAllowedOperatorApproval(operator) {
    //     super.approve(operator, tokenId);
    // }

    // function transferFrom(address from, address to, uint256 tokenId) public payable override onlyAllowedOperator(from) {
    //     super.transferFrom(from, to, tokenId);
    // }

    // function safeTransferFrom(address from, address to, uint256 tokenId) public payable override onlyAllowedOperator(from) {
    //     super.safeTransferFrom(from, to, tokenId);
    // }

    // function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)
    //     public
    //     payable
    //     override
    //     onlyAllowedOperator(from)
    // {
    //     super.safeTransferFrom(from, to, tokenId, data);
    // }
}

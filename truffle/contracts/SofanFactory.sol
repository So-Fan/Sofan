// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SofanNftTemplate.sol";
import "./SofanSplitter.sol";
/// @title A NFT Factory example
/// @author JWMatheo
/// @notice You can use this contract in order to create other contract !
/// @dev Create new contract 'MonNFT' instance
contract SofanFactory {
    event Deploy(address _address);
    /**
     * @notice Deploy your NFT Collection.
     * @dev Deploy a new NFT contract and return his address.
     *
     * Emits a {Deploy} event.
     */
    // function deploy(
    //     // uint _salt,
    //     string calldata _collectionName,
    //     string calldata _collectionSymbol,
    //     string calldata _collectionBaserURI,
    //     uint8 _limitByWallet,
    //     uint256 _collectionLimit,
    //     uint256 _launchpadTime,
    //     bool _isAbleChangeMaxLimitCollection,
    //     uint256 _price,
    //     address _splitterAddress,
    //     uint96 _percentInBips // 2.5% = 250

    // ) external returns (address) {
    //     // address[2] memory payees = [_sofanMultSig, _athleteWallet];
    //     // SofanSplitter _splitter = new SofanSplitter(

    //     // );
    //     SofanNftTemplate _contract = new SofanNftTemplate(
    //         // {
    //         //     salt: bytes32(_salt)
    //         // }
    //         _collectionName,
    //         _collectionSymbol,
    //         _collectionBaserURI,
    //         _limitByWallet,
    //         _collectionLimit,
    //         _launchpadTime,
    //         _isAbleChangeMaxLimitCollection,
    //         _price,
    //         _splitterAddress,
    //         _percentInBips
    //     );
    //     emit Deploy(address(_contract));
    //     return address(_contract);
    // }
    // function deploy(
    //     string calldata _collectionName,
    //     string calldata _collectionSymbol,
    //     string calldata _collectionBaserURI,
    //     uint32 _limitByWallet,
    //     uint32 _collectionLimit,
    //     uint32 _launchpadTime,
    //     bool _isAbleChangeMaxLimitCollection,
    //     uint256 _price,
    //     address _splitterAddress,
    //     uint32 _percentInBips
    // ) external returns(address){
        
    // }

    function deploy(
        // 0 : collectionName, 1 : collectionLimit, 2 : launchpadTime
        string[3] calldata _collectionData2,
        // 0 : limitByWallet, 1 : collectionLimit, 2 : launchpadTime, 3 : price
        uint[4] calldata _collectionData,
        bool _isAbleChangeMaxLimitCollection,
        uint96 _percentInBips,
        address _splitterAddress
    ) external returns(address) {
        SofanNftTemplate _contract = new SofanNftTemplate(
            _collectionData2,
            _collectionData,
            _isAbleChangeMaxLimitCollection,
            _splitterAddress,
            _percentInBips
        );
        emit Deploy(address(_contract));
        return address(_contract);
    }

    event DeploySplitter(address _address);
    function deploySplitter( address[] memory _payees, uint256[] memory _shares_) external returns(address) {
        SofanSplitter _contract = new SofanSplitter(
            _payees,
            _shares_
        );
        emit DeploySplitter(address(_contract));
        return address(_contract);
    }
}

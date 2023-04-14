// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SofanNftTemplate.sol";

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
    function deploy(
        // uint _salt,
        string calldata _collectionName,
        string calldata _collectionSymbol,
        string calldata _collectionBaserURI,
        uint8 _limitByWallet,
        uint256 _collectionLimit,
        uint256 _launchpadTime,
        bool _isAbleChangeMaxLimitCollection,
        uint256 _price
    ) external returns (address) {
        SofanNftTemplate _contract = new SofanNftTemplate(
            // {
            //     salt: bytes32(_salt)
            // }
            _collectionName,
            _collectionSymbol,
            _collectionBaserURI,
            _limitByWallet,
            _collectionLimit,
            _launchpadTime,
            _isAbleChangeMaxLimitCollection,
            _price
        );
        emit Deploy(address(_contract));
        return address(_contract);
    }
}

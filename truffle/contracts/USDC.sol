// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract USDC {
     bool public paused = false;
     mapping(address => bool) internal minters;
     mapping(address => bool) internal blacklisted;
    modifier whenNotPaused() {
        require(!paused, "Pausable: paused");
        _;
    }
       modifier onlyMinters() {
        require(minters[msg.sender], "FiatToken: caller is not a minter");
        _;
    }
    modifier notBlacklisted(address _account) {
        require(
            !blacklisted[_account],
            "Blacklistable: account is blacklisted"
        );
        _;
    }

    function mint(address _to, uint256 _amount)
        external
        whenNotPaused
        onlyMinters
        notBlacklisted(msg.sender)
        notBlacklisted(_to)
        returns (bool)
    {}
    function approve(address spender, uint256 amount) external returns (bool){

    }
}
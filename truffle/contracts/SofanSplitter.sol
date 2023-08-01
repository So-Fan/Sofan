// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract SofanSplitter is PaymentSplitter{
    constructor(
        address[] memory payees,
        uint256[] memory shares_
    ) payable PaymentSplitter(payees, shares_){

    }
    
}
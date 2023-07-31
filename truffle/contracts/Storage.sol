// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Storage{
    uint number;

    function setNumber(uint _number) public {
        number = _number;
    }
    function read() public view returns(uint) {
        return number;
    }
}
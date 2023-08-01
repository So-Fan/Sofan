// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract TEST {

    // mapping(address => address[]) mapAddress;

    // function addAddress(address _wallet) external {
    //     mapAddress[msg.sender].push(_wallet);
    // }

    // function getAddress() external view returns(address[] memory) {
    //     address[] memory temp = new address[](mapAddress[msg.sender].length);
    //      for (uint32 i = 0; i < mapAddress[msg.sender].length; i++) 
    //     {
    //         temp[i] = mapAddress[msg.sender][i];
    //     }
    //     // temp[0] = mapAddress[msg.sender][0];
    //     return temp;
    // }
mapping(address => address[]) public mapToArrayOfAddress;

function addAddress(address _wallet) external {
        mapToArrayOfAddress[msg.sender].push(_wallet);
    }
function getArrayFromMapping(address _address) external view returns(address[] memory){
        address[] memory temp = new address[](mapToArrayOfAddress[_address].length);
        for (uint32 i = 0; i < mapToArrayOfAddress[_address].length; i++) 
        {
            temp[i] = mapToArrayOfAddress[_address][i];
        }
        return temp;
    }
}
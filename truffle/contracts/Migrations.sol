// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;


  function setCompleted(uint completed) public {
    last_completed_migration = completed;
  }

  function read() public view returns (uint256) {
    return last_completed_migration;
  }
}
